import SearchBar from "@/components/Discover/SearchBar";
import Slider from "@/components/Feed/Slider";
import LoginHome from "@/components/Login Page/LoginHome";
import DiscoverBanner from "@/components/UI/Banners/Discover";
import Header from "@/components/UI/Header/Header";
import MainHeader from "@/components/UI/Header/MainHeader";
import WithSomeIntrest from "@/components/WithSameIntrest/WithSomeIntrest";
import YouMayKnowHome from "@/components/YouMayKnow/YouMayKnowHome";
import Head from "next/head";
import Image from "next/image";
import Script from 'next/script'; // Import the Script component
import { BiCopyright } from 'react-icons/bi'

export default function Discover() {
  return (
    <div>
      <Head>
        <title>Discover - Pumpkin</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
      </Head>
      <main className="flex h-screen w-screen overflow-auto bg-gradient-to-l justify-center from-[#EFEFEF] to-[#EFEFEF] z-[-1]">
        <div className="items-center flex flex-col">
          <span className='flex z-50 w-screen'>
            <MainHeader />
          </span>
          <div className='max-w-[1280px] w-full '>
            <SearchBar />
            <YouMayKnowHome />
          </div>
        </div>
      </main>
    </div>
  );
}
