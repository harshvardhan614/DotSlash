import React from "react";
import CenterAligner from "./CenterAligner";
import { allCardsInfo } from "@/datas/testimonial";
import SingleCard from "./SingleCard";

type Props = {};

export default function CardContainer({}: Props) {
  return (
    <CenterAligner className="px-5 py-10 md:py-20">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allCardsInfo.map((single, index) => {
          return (
            <React.Fragment key={index}>
              <SingleCard cardInfo={single} />
            </React.Fragment>
          );
        })}
      </div>
    </CenterAligner>
  );
}