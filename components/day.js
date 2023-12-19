import { Fragment, useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { timeMappingListForDay } from "./data";
import { PopupData } from "./popupdata";
import { incrementHeight, updateTime } from "./utility";
import { updateJsonObject } from "./utility";
import { timeValue } from "./utility";
import { convertTimeToMinutes } from "./utility";
import { convertTimeToMinutesDecrement } from "./utility";
import { convertToMintues } from "./utility";
import { updateToTimeFormat } from "./utility";
import { formatedUITime } from "./utility";
import { handleGet } from "@/API/Fetchapi";
import { CalenderAPI } from "@/API/api";
import { updateId } from "./utility";


const timeRangeMappingArray = [
  { data: 0 },
  { data: 15 },
  { data: 30 },
  { data: 45 }
];

export const DayCalender = () => {
  const [dayDisplay, setDayDisplay] = useState([]);
  const [day, setDay] = useState("");
  const [dayValue, setDayValue] = useState([]);
  const [draggableElements, setDraggableElements] = useState([]);
  const [idValue, setIdValue] = useState("");
  const datePopup = useRef();
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [datePopupopen, setDatePopupOpen] = useState(false);
  const [timedict, setTimeDict] = useState([{ startingTime: "", endingTime: " " }])
  const gridElement = useRef();
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [jsonHeight, setjsonHeight] = useState([])
  const [postresponse, setPostResponse] = useState([])
  const [response, setResponse] = useState([])
  const [getResponse, setGetResponse] = useState([])

  useEffect(() => {
    let currentFullDate = new Date();
    let currentDay = currentFullDate.toLocaleDateString("en-us", {
      weekday: "short",
    });
    let currentDate = currentFullDate.getDate();
    let currentMonth = currentFullDate.toLocaleDateString("en-us", {
      month: "long",
    });
    let currentYear = currentFullDate.getFullYear();
    setDayDisplay([currentMonth, " ", currentDate, ",", currentYear]);
    setDay(currentDay.toUpperCase());
    console.log("the type", typeof currentFullDate, currentFullDate);
    setDayValue([currentFullDate]);
  }, []);

  useEffect(() => {
    const draggableElement = () => {
      let response = convertToMintues(timedict[0].startingTime, timedict[0].endingTime)
      return (

        <>
          {datePopupopen == true && (
            <div
              ref={datePopup}
              id={`date-popup`}
              onMouseDown={(e) => handleMouseDown(e, 1)}
              style={{ height: "38px" }}
              className={`w-[85%]  shadow-xl bg-blue-500 absolute rounded-[3px] z-[100px]`}
            >
              {datePopup.current != undefined && console.log("the height of the date popup", datePopup.current.offsetHeight)}

              {response[0] ?
                <>
                  <div
                    id={`titleValue`}
                    className="w-[100px] h-[12.6px] font-bold  text-[10px] hover:cursor-grab text-white"
                  >
                    (No Title)
                  </div>
                  <div
                    id={`timeStamp`}
                    className="text-[12.6px] h-[15px] hover:cursor-grab  "
                  >

                    {timedict.length > 0 ?
                      <div> {formatedUITime(timedict, dayValue)}</div> :

                      null

                    }
                  </div>
                </> :

                <>


                  <span
                    id={`titleValue`}
                    className={` ${response[1] == 30 ? "w-[100px]  font-bold  h-[10px] text-[10px] hover: cursor-grab text-white " :
                      "w-[100px]  font-bold  h-[10px] text-[6px] hover: cursor-grab text-black absolute top-0 left-0 "}
                       `}>
                    (No Title),
                  </span>
                  <span
                    id={`timeStamp`}
                    className={` ${response[1] == 30 ? "text-white  text-[10px]  h-[10px] hover:cursor-grab" :
                      "text-white absolute top-0 left-[30px] text-[6px]  h-[10px] hover:cursor-grab"} `}

                  >

                    {timedict.length > 0 &&
                      timedict[0].startingTime.split(" ")[0]}
                  </span>
                </>
              }
              <div
                id={`ns-resive-cursor`}
                className={` w-[100%] hover:cursor-ns-resize h-[12.6px] `}
              >
              </div>
              <div
                className={`w-[100%] hover:cursor-ns-resize absolute bottom-[-10px] h-[20px]`}
              >
              </div>
            </div>
          )





          }



        </>
      )
    }
    setDraggableElements(draggableElement);
  }, [idValue, dayValue, timedict, postresponse]);

  // useEffect(()=>{
  //   console.log("the value of datepopup ", datePopupopen)

  // },[datePopupopen])

  useEffect(() => {
    const mapResponse = () => {

      return (
        <>
          {
            postresponse.length > 0 &&
            postresponse.map(item => (
              <>
                <div className={`w-[100px] h-[${item.height}px] font-bold absolute top-[${item.top}px] left-[${item.left}px] text-[10px] hover:cursor-grab text-white`}>
                  <div className="w-[100px] h-[12.6px] font-bold  text-[10px] hover:cursor-grab text-white">
                    {item.title}

                  </div>

                </div>
              </>

            ))
          }
        </>
      )
    }

    setResponse(mapResponse)

  }, [postresponse])

  useEffect(()=>{
    console.log("the get response ", getResponse)

  },[getResponse])


  const handlePrevious = (e) => {
    let previousFullDate = new Date(dayValue[0].setDate(dayValue[0].getDate() - 1));
    console.log("previous day value", previousFullDate);
    let previousDay = previousFullDate.toLocaleDateString("en-us", { weekday: "short", });
    let previousDate = previousFullDate.getDate();
    let previousMonth = previousFullDate.toLocaleDateString("en-us", { month: "long", });
    let previousYear = previousFullDate.getFullYear();
    setDayDisplay([previousMonth, " ", previousDate, ",", previousYear]);
    setDay(previousDay.toUpperCase());
    setDayValue([previousFullDate]);
    setIdValue("")
    setOpen(false)

  };

  const handleNext = (e) => {
    let nextFullDate = new Date(dayValue[0].setDate(dayValue[0].getDate() + 1));
    console.log("next day value", nextFullDate);
    let nextDay = nextFullDate.toLocaleDateString("en-us", {
      weekday: "short",
    });
    let nextDate = nextFullDate.getDate();
    let nextMonth = nextFullDate.toLocaleDateString("en-us", { month: "long" });
    let nextYear = nextFullDate.getFullYear();

    setDayDisplay([nextMonth, " ", nextDate, ",", nextYear]);
    setDay(nextDay.toUpperCase());
    setDayValue([nextFullDate]);
    setIdValue("")
    setOpen(false)
  };




  let count = 0
  const handleClick = (e, starttime, endtime) => {
    let endTimeResponse
    if (starttime && endtime) {
      // console.log("!!endtime", endtime, "start", starttime)
      // let timeStampValueRes = updateToTimeFormat(starttime, endtime, dayValue[0])
      let startTimeResponse = updateTime(timedict, "startingTime", starttime)
      // console.log("!!intial time response", startTimeResponse)
      if (startTimeResponse && endtime) {
        endTimeResponse = updateTime(timedict, "endingTime", endtime)
      }
      // console.log("!!end time response", endTimeResponse)

      if (endTimeResponse) {
        setTimeDict(endTimeResponse)
      }



    }

    if (e) {
      if (datePopupopen && open) {
        setIdValue("");
        setDatePopupOpen(false);
        setOpen(false);
      } else {
        setIdValue(e.target.id);
        setDatePopupOpen(true);
        setOpen(true);
      }
    }
    // if(postresponse){
    //   setOpen(false)
    //   setDatePopupOpen(true)
    // }



  };

  useEffect(() => {

    console.log("the condition", datePopup.current, datePopupopen)
    if (datePopup.current != undefined) {
      setjsonHeight([datePopup.current.getBoundingClientRect()])
    }
  }, [idValue, timedict, draggableElements, dayValue])





  const handlePopupClick = (e) => {
    if (datePopup.current !== undefined && datePopup.current !== null) {
      console.log(
        "@@handlePopupClick==>the event's id inside the handlePopupClick",
        e.target.id,
        idValue
      );
      console.log(
        "@@handlePopupClick==>checking the condition inside the handlePopupClick ",
        e.target.id == datePopup.current.id ||
        e.target.id == datePopup.current.childNodes.item(0).id ||
        e.target.id == datePopup.current.childNodes.item(1).id ||
        e.target.id == datePopup.current.childNodes.item(2).id
      );

      if (
        e.target.id == datePopup.current.id ||
        e.target.id == datePopup.current.childNodes.item(0).id ||
        e.target.id == datePopup.current.childNodes.item(1).id ||
        e.target.id == datePopup.current.childNodes.item(2).id
      ) {
        setDatePopupOpen(true);
      }
    }
  };

  const handleMouseDown = (e) => {
    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("mousemove", elementDrag);
  };


  const elementDrag = (e) => {
    const { clientY } = e;
    let bottomValue = datePopup.current.getBoundingClientRect()
    if (clientY >= parseInt(bottomValue.top + bottomValue.height)) {
      if (e.pageY < (gridElement.current.offsetHeight - 5)) {
        datePopup.current.style.height = parseInt(bottomValue.height) + 10 + "px";
        let minuteValue = convertTimeToMinutes(timedict[0].endingTime)
        let incrementResponse = timeValue(minuteValue)
        let updatedTimeValue = updateTime(timedict, "endingTime", incrementResponse)
        setTimeDict(updatedTimeValue)
        // updateToTimeFormat(timedict, dayValue)
      }
      else if (e.pageY > (gridElement.current.offsetHeight - 5)) {
        datePopup.current.style.height = datePopup.current.offsetHeight
        let minuteValue = convertTimeToMinutes(timedict[0].endingTime)
        let incrementResponse = timeValue(minuteValue)
        let updatedTimeValue = updateTime(timedict, "endingTime", incrementResponse)
        setTimeDict(updatedTimeValue)
      }
    } else if (clientY <= parseInt(bottomValue.top + bottomValue.height - 20)) {
      datePopup.current.style.height = parseInt(bottomValue.height) - 10 + "px";
      let minuteValue = convertTimeToMinutesDecrement(timedict[0].endingTime)
      let decrementResponse = timeValue(minuteValue)
      let updatedTimeValue = updateTime(timedict, "endingTime", decrementResponse)
      setTimeDict(updatedTimeValue)
    }

  };

  const closeDragElement = (e) => {
    console.log("event", e);
    document.removeEventListener("mouseup", closeDragElement);
    document.removeEventListener("mousemove", elementDrag);
  };

  useEffect(() => {
    const fetchData = async () => {

      if (dayValue.length > 0) {

        let firstParam = dayValue[0].toLocaleDateString("en-ca")
        let res = await handleGet(CalenderAPI, firstParam, firstParam)
        setGetResponse(res)

      }
    }
    fetchData()

  }, [dayValue])





  return (
    <>
      <div cllassName="w-[100%] relative" id="topnode">
        <div
          onClick={(e) => handlePopupClick(e)}
          ref={gridElement}

          className="w-[1100px]  mx-auto h-full bg-white relative"
        >
          <div className="flex flex-row w-[1100px] h-[100px]">
            <div className="flex flex-row w-[100%] h-[80px]  pt-[10px] ">
              <div className="mt-[5px] ml-[100px] ">
                <Image
                  src="/Episyche.png"
                  width={200}
                  height={200}
                  alt="Episyche Logo"
                />
              </div>
              <div
                id="previous"
                onClick={(e) => handlePrevious(e)}
                className="mt-[20px] ml-[30px]  "
              >
                <Image
                  src="/left-arrow.png"
                  width={17}
                  height={17}
                  alt="previous"
                />
              </div>
              <div
                id="next"
                onClick={(e) => handleNext(e)}
                className="mt-[20px] ml-[30px] "
              >
                <Image src="/next.png" width={17} height={17} alt="next" />
              </div>
              <div className="flex flex-row mt-[15px] ml-[10px] gap-[10px]">
                {dayDisplay}
              </div>
            </div>
          </div>
          <div className=" h-[1px] bg-[#dadce0] "> </div>
          <div className="flex flex-row gap-[10px] w-[90%] mx-auto ml-[100px] ">
            <div className="mt-[40px] text-[11px] "> GMT+5:30 </div>
            {/* <div className="w-[1px] h-[30px] bg-[#dadce0] mt-[70px]"> </div> */}
            <div>
              <div className="w-[20px]  text-center ml-[20px] mt-[30px] text-[12px] text-blue-500 font-[600]">
                {" "}
                {day}
              </div>
              <div className="w-[50px] h-[50px]  mb-[10px] mt-[3px] ml-[10px] rounded-full bg-blue-500 ">
                <div className="text-center  mt-[10px] text-white text-[28px]">
                  {" "}
                  {dayValue.length > 0 && dayValue[0].getDate()}
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-auto ml-[120px]  ">
            {timeMappingListForDay.map((item, index) => (
              <>
                <div style={{ userSelect: "none" }} className=" flex flex-row h-[40px] ">
                  <div
                    key={index}
                    id={`time-${item.humanFormat}`}
                    className="w-[10px]   text-center text-[11px] "
                  >
                    {index == 0 ? "  " : item.humanFormat}
                  </div>
                  <div
                    key={index}
                    className="w-[10px] text-center h-[40px] ml-[20px]  text-[11px]  border-[#dadce0] border-b-[1px]  "
                  >
                    {" "}
                  </div>
                  <div className=" w-[1px] h-[40px]   border-[#dadce0] border-l-[1px] ml-[1px]">
                    {" "}
                  </div>
                  <div
                    key={index}
                    id={
                      dayValue.length > 0 &&
                      `time-${item.machineFormat
                      }-day-${day.toLowerCase()}-date-${dayValue[0]
                        .toLocaleDateString("en-us")
                        .replace(/\//g, "-")}`
                    }
                    className=" w-[90%]  mt-[2px]  bg-white border-[#dadce0] border-b-[1px]"
                  >
                    {" "}
                    {console.log("time Range Mapping Array", timeRangeMappingArray, item.machineFormat)}
                    {timeRangeMappingArray.map((data, index1) => (

                      <div key={index1} className="relative">
                        <div

                          id={
                            dayValue.length > 0 &&
                            `time-${item.machineFormat}-hour-${item.machineFormat}-minute-${data.data}`
                          }
                          onClick={(e) => {
                            handleClick(
                              e,
                              item.machineFormat + ":" + (data.data == 0 || data.data == 15 ? 0 : 30),
                              timeValue(item.machineFormat * 60 + (data.data == 0 || data.data == 15 ? 0 : 30) + 60));
                            // handleJson(e)
                          }}
                          className="w-[100%] h-[9.3px] "
                        >
                        </div>
                        {
                          
                           getResponse.length>0 && getResponse.map((res, index) => (
                           
                            // console.log("res",res.start_time.split(":")[0]+":"+res.start_time.split(":")[1] , new Date(new Date(dayValue[0]).setHours( item.machineFormat , data.data)).toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit" , hour12: false }) )
                            res.start_time.split(":")[0]+":"+res.start_time.split(":")[1] == new Date(new Date(dayValue[0]).setHours( item.machineFormat , data.data)).toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit" , hour12: false }) &&
                             <div  style={{height:`${res.height}px`}} key={index} className= {`w-[85%]  bg-blue-500 absolute top-0 left-0 rounded-[5px]`}> 
                               <div> {res.title_name} </div>
                               <div> {res.start_time}-{res.end_time} </div>
                             </div> 
                          ))
                        }


                        <div id="parent-date-popup" className="w-[90%] absolute top-0 left-0 z-[1000] ">


                          {idValue.length > 0 &&
                            idValue ==
                            `time-${item.machineFormat}-hour-${item.machineFormat}-minute-${data.data}` &&
                            draggableElements}

                        </div>




                      </div>
                    ))}
                  </div>
                </div>
              </>
            ))}
          </div>
          {open == true && (
            <div className="fixed top-0 bottom-0 w-[10px] h-[10px]  z-[1000] ">
              <PopupData dateValue={dayValue} timeValue={timedict} title={{ title, setTitle }} description={{ description, setDescription }} open={{ open, setOpen }} getresponseFunction={setGetResponse} jsonHeight={jsonHeight} idValuefunction={setIdValue} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
