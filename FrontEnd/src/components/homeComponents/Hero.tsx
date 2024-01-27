/** @format */

import Image from "next/image";
import Balancer from "react-wrap-balancer";

// images
import databiz from "@/assets/images/instagram.svg";
import audiophile from "@/assets/images/spotify.svg";
import meet from "@/assets/images/intrax.svg";
import maker from "@/assets/images/windows.svg";

import hremoImagedesktop from "@/assets/images/image-hero-desktop.png";
import hremoImageMobile from "@/assets/images/image-hero-mobile.png";

export default function Hero() {
  const bannerImages = [databiz, audiophile, meet, maker];

  return (
    <>     
      {/* hero */}
      <section className="mx-auto flex items-center max-w-6xl  flex-col-reverse gap-2  px-4  p-4 transition-all md:flex-row md:gap-4">
        {/* left div */}
        <div className=" flex flex-col items-center  gap-6 pt-8 text-center md:w-1/2 md:items-start md:gap-10 md:pt-20 md:text-left">
            <h1 className="text-3xl font-bold md:text-5xl">
          <Balancer>
            Practice and Hire Through Interview Practice
          </Balancer>
            </h1>
          <Balancer>
            <p className=" text-neutral-400 md:max-w-[400px]">
            Practise Pressure-Handling and Gain Confidence through appearing for Online AI Mock Interviews and Mentorship Sessions, and Get Real Time Feedback!
            </p>
          </Balancer>
          <button className="border-balck  w-fit rounded-xl border-2 bg-black px-4 py-2  text-white transition-all hover:border-black hover:bg-black hover:bg-transparent  hover:text-black/90">
            Select Interview
          </button>
          <div className="flex flex-wrap justify-evenly gap-2 md:gap-6">
            {bannerImages.map((img, i) => (
              <Image
                className="w-[100px] md:w-[120px] h-auto"
                key={i}
                src={img}
                alt="client-image"
              />
            ))}
          </div>
        </div>

        {/* right div */}
        <section className="md:w-1/2 ">
          <Image
            className="hidden h-auto mx-auto max-w-[400px]  md:block"
            src={hremoImagedesktop}
            alt="hreo-image"
          />
          <Image
            className="h-auto w-full mx-auto md:hidden mt-10"
            src={hremoImageMobile}
            alt="hreo-image"
          />
        </section>
      </section>
    </>
  );
}