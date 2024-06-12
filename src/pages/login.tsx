import { useUser } from '@/contexts/UserProvider';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

function login() {
  const {user, isLoading} = useUser();
  const router = useRouter()
  
  React.useEffect(() => {
    if (isLoading) return;

    if (user.profile) {
      router.push("/")
    } else {
      router.push("/user/create-profile")
    }
  }, [isLoading])

  return (
    <div>
        {/* background */}
         <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 z-0 object-cover w-full h-full"
          >
            <source src="/black.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="relative flex flex-col items-center h-screen justify-center flex-1 w-[300px] mx-auto">
            {/* logo */}
            <img src="/assets/images/gif-logo.gif" className="w-40 mb-2" />

            <div className="space-y-4 flex flex-col items-center justify-center">
                {/* connect wallet */}
                {/* <div className="home-b w-full">
                </div> */}
                

                {/* login with google */}
                <button onClick={() => signIn("google")} className="bg-red-400 text-white px-4 py-3 uppercase flex items-center justify-center gap-3 hover:opacity-70 duration-200"><span className="">Continue with Google</span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128"><path fill="#fff" d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"/><path fill="#e33629" d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"/><path fill="#f8bd00" d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"/><path fill="#587dbd" d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"/><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"/></svg></button>

                {/* login with twitter */}
                <button onClick={() => signIn("twitter")} className="bg-white text-black px-4 py-3 uppercase flex items-center justify-center gap-3 hover:opacity-70 duration-200"><span className="">Continue with Twitter</span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#000000" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg></button>

            </div>

          </div>
    </div>
  )
}

export default login