"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { testimonials } from "@/datas/testi";

/**
 * Related to the React Slick
 */
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

/**
 * Related to the React Icons
 */
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

/**
 * Custom Components
 */
import CenterAligner from "./CenterAligner";

export default function Testimonial() {
  const sliderRef = useRef<any>();
  /**
   * Settings Related to the React Slick
   */
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <CenterAligner className="bg-gray-100 px-5 py-10">
      <h1 className="text-center text-2xl font-bold sm:text-4xl pb-8">
        Our Customer Testimonials
      </h1>
      {/* Container for the Slider */}
      <section className="max-w-[1100px] mx-auto w-full rounded-xl relative overflow-hidden">
        {/* Main Section */}
        <Slider {...settings} ref={sliderRef}>
          {testimonials.map((single, index) => {
            return (
              <div key={index} className="h-full">
                <section className="mx-auto bg-white p-5 sm:p-12 grid grid-cols-1 sm:grid-cols-[1fr_3fr] md:grid-cols-[1fr_4fr] items-center gap-5 md:gap-8 rounded-xl overflow-hidden">
                  {/* Left Section */}
                  <div className="space-y-5 text-center">
                    {/* Image */}
                    <div className="border-8 inline-block rounded-full border-purple-400 p-2.5">
                      <div className=" mx-auto w-[100px] h-[100px] rounded-full bg-gray-200 overflow-hidden">
                        <Image
                          src={single.img}
                          alt="Boy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Other */}
                    <div>
                      <h2 className="text-xl font-medium">{single.name}</h2>
                      <p className="text-gray-600">{single.profession}</p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="text-[16px] sm:text-[18px] space-y-3">
                    {/* Testimonial */}
                    <div className="text-yellow-500 text-[40px]">
                      <FaQuoteLeft />
                    </div>
                    <p className="leading-[30px] font-bold">
                      {single.testimonial}
                    </p>
                    <div className="text-yellow-500 text-[40px]">
                      <FaQuoteRight className="ml-auto" />
                    </div>
                  </div>
                </section>
              </div>
            );
          })}
        </Slider>

        {/* Custom Buttons */}
        <button
          className="absolute top-[50%] left-[10px] z-10 text-2xl text-gray-600"
          onClick={() => sliderRef?.current?.slickPrev()}
        >
          <MdOutlineArrowBackIos />
        </button>
        <button
          className="absolute top-[50%] right-[10px] z-10 text-2xl text-gray-600"
          onClick={() => sliderRef?.current?.slickNext()}
        >
          <MdOutlineArrowForwardIos />
        </button>
      </section>
    </CenterAligner>
  );
}