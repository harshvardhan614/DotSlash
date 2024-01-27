import React from "react";
// import { CardType } from "@/types";

type Props = {
  cardInfo: CardType;
};

interface CardType {
    level: string;
    applyGradient: string;
    para1: string;
    para2: string;
    btnDark: boolean;
    tick: boolean;
  }

export default function SingleCard({ cardInfo }: Props) {
  return (
    <div className="bg-white rounded-md p-5 border border-gray-100 custom-shadow space-y-6 flex flex-col w-full">
      {/* Title */}
      <h1
        className={`${cardInfo.applyGradient} p-5 rounded-md text-center font-black`}
      >
        {cardInfo.level}
      </h1>

      <div className="space-y-1 text-center p-5 grow">
        <h2 className="text-3xl">
          <span className="text-5xl font-semibold py-2">Free</span>
        </h2>
        <p className="uppercase font-bold">{cardInfo.para1}</p>
        <p>{cardInfo.para2}</p>
      </div>

      <div>
        <button
          className={`border-gray-300 text-gray-900 hover:bg-gray-900 hover:text-gray-300 px-5 py-4 w-full rounded-md border hover:scale-105 transition-all`}
        >
          Get Started
        </button>
      </div>

      <ul className="space-y-3">
        <li>{cardInfo.tick ? "✔️" : "❌"} Test your Resume</li>
        <li>{cardInfo.tick ? "✔️" : "❌"} Test your Skills</li>
        <li>✔️ Check Your Confidence</li>
        <li>✔️ Learn to Give Interview</li>
      </ul>
    </div>
  );
}