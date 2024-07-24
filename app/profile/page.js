import LoginHome from "@/components/Login Page/LoginHome";
import ProfileHome from "@/components/Profile/Profile";
import Header from "@/components/UI/Header/Header";
import MainHeader from "@/components/UI/Header/MainHeader";
import { getCookie } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import 'react-image-crop/dist/ReactCrop.css'

export default function Profile() {

    return (
        <div>
            <Head>
                <title>Profile - Pumpkin</title>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <script
                    src="https://widget.Cloudinary.com/v2.0/global/all.js"
                    type="text/javascript"
                ></script>
            </Head>
            <main className=" flex  h-screen w-screen overflow-auto
    bg-gradient-to-l justify-center from-[#EFEFEF]   to-[#EFEFEF]
     z-[-1]">
                <div className="items-center flex flex-col">
                    <span className='flex z-50 w-screen'>
                        <MainHeader />
                    </span>
                    <div className='max-w-[1280px] w-full '>
                        <ProfileHome />
                    </div>
                </div>
            </main>
        </div>
    );
}
