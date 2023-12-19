import { useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Week } from "@/components/week";
import { Month } from "@/components/month";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [select, setSelect] = useState("Month");
  const handleClick = (param) => {
    setSelect(param);
  };

  return (
    <>
      {select === "Month" && <Month onButtonClick={handleClick} selectProps={select} />}
      {select === "Week" && <Week onButtonClick={handleClick} selectProps={select} />}
      {/* {select === "Month" ? <Month onButtonClick={handleClick} selectProps={select} />: <Week onButtonClick={handleClick} selectProps={select} />} */}
    </>
  );
}
