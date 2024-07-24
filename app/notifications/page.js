import NotificationsHome from "@/components/Notifications/NotificationsHome"
import MainHeader from "@/components/UI/Header/MainHeader"
import UserProfileHome from "@/components/UserProfile/UserProfileHome"
import Head from "next/head"

const Notifications = () => {
  return (
    <div>
      <Head>
        <title>Notifications - Pumpkin</title>
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
          <NotificationsHome />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Notifications