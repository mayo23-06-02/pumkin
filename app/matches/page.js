import LandingPage from "@/components/LandingPage/LandingPage";
import MatchesHome from "@/components/Matches/MatchesHome";
import Header from "@/components/UI/Header/Header";
import MainHeader from "@/components/UI/Header/MainHeader";
import Image from "next/image";

export default function Matches() {
  return (
    <main className=" flex justify-center h-screen w-full overflow-auto
   bg-gradient-to-b from-[#C3530A]  to-[#191222]
     z-[-1]">
      <span className='absolute z-50 w-full'>
      </span>
      <div className='max-w-[1280px] w-full flex-col flex lg:space-y-24 items-center'>
        <MainHeader />
        <MatchesHome />
      </div>
      
    </main>
  );
}
