import { Fragment, useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { formatedUITime, updateId } from "./utility";
import { handlePost } from "@/API/Fetchapi";
import { CalenderAPI } from "@/API/api";
import { updateHeight } from "./utility";
import { handleGet } from "@/API/Fetchapi";
// import { Description } from "@headlessui/react/dist/components/description/description";
let arrayValue = []

export const PopupData = (data) => {

  const value = {
    title_name: data.title.title,
    description: data.description.description,
    start_time: data.timeValue[0].startingTime,
    end_time: data.timeValue[0].endingTime,
    Week_Day: data.dateValue[0].toLocaleString("en-us", { weekday: "long" }),
    date: data.dateValue[0].toLocaleDateString("en-ca"),
  }

  useEffect(() => {
    console.log("data@@", data)

    console.log("data", data.dateValue[0])
    console.log("date format inside useffect", data.title, data.timeValue[0].startingTime)
    console.log("check", data.dateValue[0].toLocaleDateString("en-ca").replace(/\//g, "-"))

  }, [data])



  const handleSave = async (e) => {
    console.log("👻👻👻👻👻👻 data", data)
    let postJson = {
      Week_Day: new Date(data.dateValue[0]).toLocaleString("en-us", { weekday: "long" }),
      date: data.dateValue[0].toLocaleDateString("en-ca"),
      end_time: data.timeValue[0].endingTime,
      start_time: data.timeValue[0].startingTime,
      title_name: data.title.title,
      description: data.description.description,
      height: parseInt(data.jsonHeight[0].height)
      
    }

    let response = await handlePost(postJson, "POST", CalenderAPI)
    console.log("👻👻👻👻👻👻 response", response)
    let firstParam = data.dateValue[0].toLocaleDateString("en-ca")
     let res = await handleGet(CalenderAPI, firstParam, firstParam)
     data.getresponseFunction(res)
     data.open.setOpen(false)
    // data.datepopupopen(false)
    data.idValuefunction("")
    
   
  }

 



  return (
    <>


      <div className="w-[500px] h-[500px] mt-[200px]  ml-[300px] bg-white rounded-[5px]">
        <div className="w-[100%] h-[40px] bg-[#f1f3f4] rounded-t-lg flex flex-row">
          <div>
            <Image
              src="/drag.png"
              width={30}
              height={30}
              alt="Drag Handle"
            />

          </div>
          <div className="ml-[430px] mt-[10px]">
            <Image
              src="/close.png"
              width={15}
              height={15}
              alt="Close"
            // onClick={(e) => { handleClose(e) }}
            />
          </div>

        </div>
        <div className="mt-[30px] ">
          <label className=" ml-[50px]">
            <input
              type="text"
              placeholder="Add Title and Time"
              onChange={(e) => data.title.setTitle(e.target.value)}
              className="border-b outline-0 text-[#3c4043] font-[400] text-[22px]  placeholder-[22px]"
            />
          </label>
        </div>
        <div className="  mt-[30px] flex flex-rows">
          <div className="ml-[10px]">
            <Image
              src="/clock.png"
              width={15}
              height={15}
              alt="Clock"
            />
          </div>
          <div>
            {new Date(data.dateValue[0]).toLocaleString("en-us", { weekday: "long" })},
            {" "}
            {new Date(data.dateValue[0]).toLocaleString("en-us", { month: "long" })}
            {new Date(data.dateValue[0]).getDate()}
            {" "}
            {formatedUITime(data.timeValue, data.dateValue)}

          </div>

        </div>

        <div className="flex flex-rows mt-[15px] gap-[15px]">
          <div className=" ml-[10px]">
            <Image
              src="/sort.png"
              width={15}
              height={15}
              alt="Sort"
            />
          </div>

          <div>
            <input
              type="text"
              onChange={(e) => data.description.setDescription(e.target.value)}
              className="outline-none text-[#3c4043] text-[16px]  placeholder-[16px]"
              placeholder="Add description"
            />
          </div>
        </div>
        <div className=" mt-[240px] ml-[400px]">
          <button
            onClick={(e) => handleSave(e)}
            className=" w-[70px] h-[36px] border-[1px] rounded-[4px] bg-blue-500 text-[white]"
          >
            {" "}
            Save{" "}
          </button>
        </div>
      </div>

    </>

  )

}