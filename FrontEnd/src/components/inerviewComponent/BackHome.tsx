/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.jpg";

export default function BackHome() {

return (
    <div className="flex items-center w-full max-w-6xl justify-between px-4 py-5 text-sm mx-auto ">
        <Image src={logo} alt=" logo" className="w-[120px]"/>

        <Link href="#" className="h-fit rounded border-2 border-black px-4 py-2 text-black transition-all hover:bg-black hover:text-white ">
          Back To Home
        </Link>

    </div>

)
}