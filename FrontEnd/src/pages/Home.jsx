import React from 'react';

// Import your images here
import databiz from '../assets/images/client-databiz.svg';
import audiophile from '../assets/images/client-audiophile.svg';
import meet from '../assets/images/client-meet.svg';
import maker from '../assets/images/client-maker.svg';

import hremoImagedesktop from '../assets/images/image-hero-desktop.png';
import hremoImageMobile from '../assets/images/image-hero-mobile.png';

const Home = () => {
  const bannerImages = [databiz, audiophile, meet, maker];

  return (
    <div className="min-h-screen w-full my-10 mx-auto">
      
      <section className="mx-auto flex max-w-6xl  flex-col-reverse gap-2  px-4  pb-12 transition-all md:flex-row md:gap-4">
        {/* left div */}
        <div className=" flex flex-col items-center  gap-6  text-center pt-4 md:w-1/2 md:items-start md:gap-10 md:pt-10 md:text-left">
          <h1 className="text-4xl font-semibold md:text-6xl">
            Give AI Mock Interview
          </h1>
          <p className=" text-neutral-400 md:max-w-[400px]">
          Practise Pressure-Handling and Gain Confidence through appearing for Online AI Mock Interviews and Mentorship Sessions, and Get Real Time Feedback!
          </p>
          <button className="border-black  w-fit rounded-xl border-2 bg-black px-4 py-2  text-white transition-all hover:border-black hover:bg-black hover:bg-transparent  hover:text-black/90">
            Select Interview
          </button>
          <div className="flex gap-2 md:gap-10 flex-wrap">
            {bannerImages.map((img, i) => (
              <img
                className=" h-6 w-auto mx-auto my-2"
                key={i}
                src={img}
                alt="client-image"
              />
            ))}
          </div>
        </div>

        {/* right div */}
        <section className="md:w-1/2 mx-auto">
          <img
            className="hidden h-auto max-w-[350px] mx-auto md:block"
            src={hremoImagedesktop}
            alt="hreo-image"
          />
          <img
            className="h-auto w-[80%] mx-auto md:hidden"
            src={hremoImageMobile}
            alt="hreo-image"
          />
        </section>
      </section>
    </div>
  );
};

export default Home;
