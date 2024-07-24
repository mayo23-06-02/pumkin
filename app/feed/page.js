import FeedPosts from "@/components/Feed/FeedPosts";
import Slider from "@/components/Feed/Slider";
import LoginHome from "@/components/Login Page/LoginHome";
import DiscoverBanner from "@/components/UI/Banners/Discover";
import Header from "@/components/UI/Header/Header";
import MainHeader from "@/components/UI/Header/MainHeader";
import WithSomeIntrest from "@/components/WithSameIntrest/WithSomeIntrest";
import YouMayKnowHome from "@/components/YouMayKnow/YouMayKnowHome";
import Image from "next/image";
import { BiCopyright } from 'react-icons/bi'

export default function Feed() {
  return (
    <main className=" flex justify-center h-screen w-full overflow-auto
    bg-gradient-to-l from-[#EFEFEF]  to-[#EFEFEF]
     z-[-1]">
      <span className='absolute z-50 w-full'>
        <MainHeader />
      </span>
      <div className='max-w-[1280px] w-full space-y-6 py-16 lg:pt-0'>
        <Slider />
        <YouMayKnowHome />
        <DiscoverBanner />
        <FeedPosts />
        <WithSomeIntrest />
        <footer className="flex w-full justify-center items-center font-bold text-lg py-12">
          <BiCopyright />
          <p>Pumpkin 2024</p>
        </footer>
      </div>

    </main>
  );
}
