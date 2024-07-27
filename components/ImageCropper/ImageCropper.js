'use client'
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useCookies } from 'next-client-cookies';
import { db, storage } from '@/firebase'; // Adjust the import based on your project structure
import { collection, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { BiImageAdd } from "react-icons/bi";
import { useRouter } from "next/navigation";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 200;

const ImageCropper = () => {
    const router = useRouter()
    const cookies = useCookies();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);

    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState({
        unit: '%', // Can be 'px' or '%'
        width: 50,
        aspect: ASPECT_RATIO,
    });
    const [croppedImage, setCroppedImage] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [savedImageUrl, setSavedImageUrl] = useState('');
    const imageRef = useRef(null);

    useEffect(() => {
        const userData = cookies.get('userData')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [cookies])

    const onSelectFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || "";
            setImgSrc(imageUrl);
            setIsSaved(false); // Reset save state when a new file is selected
        });
        reader.readAsDataURL(file);
    };

    const onCropComplete = (crop) => {
        if (imageRef.current && crop.width && crop.height) {
            const canvas = document.createElement('canvas');
            const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
            const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(
                imageRef.current,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            canvas.toBlob(blob => {
                if (blob) {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        setCroppedImage(reader.result);
                    };
                }
            }, 'image/jpeg');
        }
    };

    const handleSave = () => {
        uploadPost();
        setIsSaved(true);

    };
    const uploadPost = async () => {
        const userData = cookies.userData;
        if (userData) {
            setUser(JSON.parse(userData));
        }
        if (loading) return;
        setLoading(true);

        try {
            const docRef = await addDoc(collection(db, 'profilePicture'), {
                username: 'makabongwe',
                profileImg: croppedImage,
                timestamp: serverTimestamp()
            });

            console.log("Post added with ID:", docRef.id);

            const imageRef = ref(storage, `posts/${docRef.id}/image`);

            await uploadString(imageRef, croppedImage, 'data_url').then(async snapshot => {
                const downloadURL = await getDownloadURL(imageRef);
                console.log("Download URL:", downloadURL); // Log the download URL
                setSavedImageUrl(downloadURL); // Store the image URL in the state variable
                await setDoc(doc(db, 'posts', docRef.id), {
                    image: downloadURL
                }, { merge: true }); // Use setDoc with merge: true
            });

            console.log("Saved Image URL after upload:", savedImageUrl); // This might still be empty due to async state update
            setImgSrc('');
        } catch (error) {
            console.error("Error uploading post:", error);
        } finally {
            setLoading(false);
        }
    };

    // Use useEffect to log savedImageUrl after it has been updated
    useEffect(() => {
        if (savedImageUrl) {
            handleSubmit();
            router.refresh();


        }
    }, [savedImageUrl]);

    async function handleSubmit() {
        try {
            // Log the values to check if they are correct
            console.log("User email:", user.email);
            console.log("Saved image URL:", savedImageUrl);

            const response = await fetch("/api/profile-picture", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    profilePicture: savedImageUrl,
                }),
            });

            if (response.ok) {
                // Update the UI optimistically
                alert("Profile updated successfully!");
                router.refresh()
            } else {
                const error = await response.json();
                alert(`Error updating profile: ${error.message}`);
            }
        } catch (error) {
            alert(`Network error: ${error.message}`);
        }
        router.refresh();

    }

    return (
        <div className=" fixed flex flex-col py-8 px-6 l space-y-16  items-center lg:w-[50vw] w-[90vw]  bg-white rounded-3xl ">
            <div className='bg-gray-300 flex items-center justify-center  h-[150px] w-[150px] rounded-full p-6'>
                <BiImageAdd className='text-5xl cursor-pointer active:scale-105' />
            </div>
            <div className="flex items-center justify-between space-x-16">
                <div className=" flex flex-col items-center space-y-12 pr-12  ">
                    <div>
                        <p className="text-2xl font-bold">Add Profile Picture</p>
                    </div>
                    <div className=" rounded-3xl flex items-start flex-col shadow-mds lg:border-l">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onSelectFile}
                            className="block w-full text-sm text-slate-500 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {imgSrc && !isSaved && (
                            <div>
                                <ReactCrop
                                    src={imgSrc}
                                    crop={crop}
                                    onChange={(newCrop) => setCrop(newCrop)}
                                    onComplete={onCropComplete}
                                    circularCrop
                                    keepSelection
                                    aspect={ASPECT_RATIO}
                                    minWidth={MIN_DIMENSION}
                                >
                                    <Image ref={imageRef} src={imgSrc} width={200} height={200} alt="image" />
                                </ReactCrop>
                                <button
                                    onClick={() => {
                                        router.refresh();
                                        handleSave()
                                    }}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Save
                                </button>
                            </div>
                        )}
                        {isSaved && savedImageUrl && (
                            <div>
                                <h3>Saved Image:</h3>
                                <Image src={savedImageUrl} width={200} height={200} alt="Saved image" className="rounded-full" />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ImageCropper;
