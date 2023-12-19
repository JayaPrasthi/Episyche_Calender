import { Fragment, useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
//  import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Mina } from "next/font/google";
import { handleGet, handlePost } from "@/API/Fetchapi";
import { CalenderAPI } from "@/API/api";
import { ButtonComp } from "./selectComponent";

export const CommonPopup = (props) => {
    
    const cancelButtonRef = useRef(null);
   

    useEffect(() => {
        console.log("the props", props.open.open, props.selected)
        console.log("the is open", props.isOpen)
        console.log("the event", props.event )

    }, [props])

    const handleSave = async (e) => {
        // console.log("👻👻👻👻👻👻 data", data)
        let response = await handlePost(props.event, "POST", CalenderAPI)
        console.log("👻👻👻👻👻👻 response", response)
        props.open.setOpen(false)
        let res = await handleGet(CalenderAPI, props.param.firstParam, props.param.lastParam)
        console.log("  👻👻👻👻👻the get res", res)
        props.getresponsefunction(res)
        props.val(" ")

        
  }

    const handleClose = () => {
        props.open.setOpen(false)
    }

    return (
        <>
            <Transition.Root show={props.open.open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={handleClose}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-0"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform  w-[448px] h-[500px] overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div className="absolute bg-[#f1f3f4] top-[0] left-[0] right-[0] w-[100%] h-[36px] flex flex-rows">
                                        <div className="">
                                            <Image
                                                src="/drag.png"
                                                width={30}
                                                height={30}
                                                alt="Drag Handle"
                                            />
                                        </div>
                                        <div
                                            onClick={(e) => {
                                                handleClose(e);
                                            }}
                                            className="ml-[450px] mt-[10px]"
                                        >
                                            <Image
                                                src="/close.png"
                                                width={15}
                                                height={15}
                                                alt="Close"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-[30px] ">
                                        <label className=" ml-[50px]">
                                            <input
                                                type="text"
                                                placeholder="Add Title and Time"
                                                onChange={(e) => props.title.setTitlePopup(e.target.value)}
                                                className="border-b outline-0 text-[#3c4043] font-[400] text-[22px]  placeholder-[22px]"
                                            />
                                        </label>
                                    </div>
                                    <div className=" mt-[50px] flex flex-rows">
                                        <div className="ml-[10px]">
                                            <Image
                                                src="/clock.png"
                                                width={15}
                                                height={15}
                                                alt="Clock"
                                            />
                                        </div>
                                        <div className="flex flex-rows gap-[15px]">
                                            <div className="ml-[20px]"> </div>
                                            <div className="">

                                                {
                                                    props.selected == "Month" &&
                                                    <>
                                                    <div> {props.startingDate} - {props.endingDate.endingDate} </div>
                                                   <div className="flex flex-row ">
                                                    <div> <ButtonComp starttime = {props.startDisplayValueTime} timeInterval = {props.timeInterval}/></div>
                                                    

                                                </div>
                                                </>
                                                }



                                            </div>
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
                                                onChange={(e) => props.description.setDescription(e.target.value)}
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
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}