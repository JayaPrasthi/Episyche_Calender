import { useState, useEffect } from "react";
import Image from "next/image";
import { Popup } from "./popup";

import Test from "./Test";

const monthItems = [
  {
    humanFormat: "January",
    machineFormat: 0,
  },
  {
    humanFormat: "February",
    machineFormat: 1,
  },
  {
    humanFormat: "March",
    machineFormat: 2,
  },
  {
    humanFormat: "April",
    machineFormat: 3,
  },
  {
    humanFormat: "May",
    machineFormat: 4,
  },
  {
    humanFormat: "June",
    machineFormat: 5,
  },
  {
    humanFormat: "July",
    machineFormat: 6,
  },
  {
    humanFormat: "August",
    machineFormat: 7,
  },
  {
    humanFormat: "September",
    machineFormat: 8,
  },
  {
    humanFormat: "October",
    machineFormat: 9,
  },
  {
    humanFormat: "November",
    machineFormat: 10,
  },
  {
    humanFormat: "December",
    machineFormat: 11,
  },
];

const dayItems = [
  {
    dayShortFormat: "S",
    dayFullFormat: "Sun",
    daymachineFormat: 0,
  },
  {
    dayShortFormat: "M",
    dayFullFormat: "Mon",
    daymachineFormat: 1,
  },
  {
    dayShortFormat: "T",
    dayFullFormat: "Tue",
    daymachineFormat: 2,
  },
  {
    dayShortFormat: "W",
    dayFullFormat: "Wed",
    daymachineFormat: 3,
  },
  {
    dayShortFormat: "T",
    dayFullFormat: "Thu",
    daymachineFormat: 4,
  },
  {
    dayShortFormat: "F",
    dayFullFormat: "Fri",
    daymachineFormat: 5,
  },
  {
    dayShortFormat: "S",
    dayFullFormat: "Sat",
    daymachineFormat: 6,
  },
];

export const Year = () => {
  const [yearDates, setYearDates] = useState([]);
  const [displayedYear, setDisplayedYear] = useState([]);
  const [popupData, setPopupData] = useState({});
  const [closePopup, setClosePopup] = useState(false);
  const [getAPIData, setGetAPIData] = useState([]);
  const [firstParamForYear, setFirstParamForYear] = useState([]);
  const [lastParamForYear, setLastParamForYear] = useState([]);
  

  useEffect(() => {
    let monthArrayWithCompleteDate = [];
    let currentYearArray = [];
    let monthArray = [];
    let dictOfArray;
    let date;
    let dateObj;
    monthItems.forEach((value) => {
      date = new Date(new Date().getFullYear(), value.machineFormat, 1);
      let firstWeekFirstDay = new Date(
        date.setDate(date.getDate() - date.getDay() - 1)
      );
      for (let i = 0; i <= 41; i++) {
        let IndividualDate = new Date(
          firstWeekFirstDay.setDate(firstWeekFirstDay.getDate() + 1)
        );
        monthArray.push(IndividualDate.getDate());
        monthArrayWithCompleteDate.push(IndividualDate);
      }
    });

    monthArrayWithCompleteDate.forEach((item) => {
      dateObj = {};
      dateObj["singleNumeralDate"] = item.getDate();
      dateObj["fullDate"] = item.toLocaleDateString().replace(/\//g, "-");
      dateObj["month"] = item.getMonth();
      currentYearArray.push(dateObj);
    });

    let chunkSize = 42;
    dictOfArray = Array.from(
      { length: Math.ceil(currentYearArray.length / chunkSize) },
      (_, i) => currentYearArray.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
    console.log(
      "dict Of Array",
      dictOfArray[0][0].fullDate,
      dictOfArray[11][41].fullDate
    );

    let firstParamValue = new Date(
      dictOfArray[0][0].fullDate
    ).toLocaleDateString("en-ca");
    let lastParamValue = new Date(
      dictOfArray[11][41].fullDate
    ).toLocaleDateString("en-ca");
    // console.log("tt", firstParamValue, lastParamValue);
    setFirstParamForYear(firstParamValue);
    setLastParamForYear(lastParamValue);
    setDisplayedYear(date.getFullYear());
    setYearDates(dictOfArray);
  }, []);

  const handlePrevious = (e) => {
    let previousYear = displayedYear - 1;
    console.log("previous year", previousYear);
    let previousYearMonthArrayWithCompleteDate = [];
    let previousYearArray = [];
    let previousYearMonthArray = [];
    let date;
    let dictOfArray = [];
    let dateObj;
    monthItems.forEach((value) => {
      date = new Date(previousYear, value.machineFormat, 1);
      let firstWeekFirstDay = new Date(
        date.setDate(date.getDate() - date.getDay() - 1)
      );
      for (let i = 0; i <= 41; i++) {
        let IndividualDate = new Date(
          firstWeekFirstDay.setDate(firstWeekFirstDay.getDate() + 1)
        );
        previousYearMonthArray.push(IndividualDate.getDate());
        previousYearMonthArrayWithCompleteDate.push(IndividualDate);
      }
    });
    previousYearMonthArrayWithCompleteDate.forEach((item) => {
      dateObj = {};
      dateObj["singleNumeralDate"] = item.getDate();
      dateObj["fullDate"] = item.toLocaleDateString().replace(/\//g, "-");
      dateObj["month"] = item.getMonth();
      previousYearArray.push(dateObj);
    });

    let chunkSize = 42;
    dictOfArray = Array.from(
      { length: Math.ceil(previousYearArray.length / chunkSize) },
      (_, i) =>
        previousYearArray.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
    console.log("dict of the Array", dictOfArray);
    console.log("1st day of the year", dictOfArray[0]);
    let firstParamValue = new Date(
      dictOfArray[0][0].fullDate
    ).toLocaleDateString("en-ca");
    let lastParamValue = new Date(
      dictOfArray[11][41].fullDate
    ).toLocaleDateString("en-ca");
    console.log("tt", firstParamValue, lastParamValue);
    setFirstParamForYear(firstParamValue);
    setLastParamForYear(lastParamValue);
    setDisplayedYear(previousYear);
    setYearDates(dictOfArray);
  };

  const handleNext = (e) => {
    let nextYear = displayedYear + 1;
    console.log("next year", nextYear);
    let nextYearMonthArrayWithCompleteDate = [];
    let nextYearArray = [];
    let nextYearMonthArray = [];
    let date;
    let dateObj;
    let dictOfArray = [];
    monthItems.forEach((value) => {
      date = new Date(nextYear, value.machineFormat, 1);
      let firstWeekFirstDay = new Date(
        date.setDate(date.getDate() - date.getDay() - 1)
      );
      for (let i = 0; i <= 41; i++) {
        let IndividualDate = new Date(
          firstWeekFirstDay.setDate(firstWeekFirstDay.getDate() + 1)
        );
        nextYearMonthArray.push(IndividualDate.getDate());
        nextYearMonthArrayWithCompleteDate.push(IndividualDate);
      }
    });
    nextYearMonthArrayWithCompleteDate.forEach((item) => {
      dateObj = {};
      dateObj["singleNumeralDate"] = item.getDate();
      dateObj["fullDate"] = item.toLocaleDateString().replace(/\//g, "-");
      dateObj["month"] = item.getMonth();
      // dateObj["id"] = `date-${item.toLocaleDateString().replace(/\//g, "-")}-month-{}`
      nextYearArray.push(dateObj);
    });

    let chunkSize = 42;
    dictOfArray = Array.from(
      { length: Math.ceil(nextYearArray.length / chunkSize) },
      (_, i) => nextYearArray.slice(i * chunkSize, i * chunkSize + chunkSize)
    );

    console.log("dict of the Array", dictOfArray);
    let firstParamValue = new Date(
      dictOfArray[0][0].fullDate
    ).toLocaleDateString("en-ca");
    let lastParamValue = new Date(
      dictOfArray[11][41].fullDate
    ).toLocaleDateString("en-ca");
    console.log("tt", firstParamValue, lastParamValue);
    setFirstParamForYear(firstParamValue);
    setLastParamForYear(lastParamValue);
    setDisplayedYear(nextYear);
    setYearDates(dictOfArray);
  };

  const handlePopupClick = (e) => {
    if (!e.target.id) {
      console.log("event target",e.target);
      setClosePopup(false);
    }else {
      setClosePopup(true);
    }

     
  };

  useEffect(() => {
    if (firstParamForYear && lastParamForYear) {
      fetch(
        `http://127.0.0.1:8000/googleCalender/calender/${firstParamForYear}/${lastParamForYear}/`
      ) //url always a string //remember whenever using state check if there is a value inside it
        .then((res) => res.json())
        .then((response) => {
          console.log("API response ::", response);
          setGetAPIData(response);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [firstParamForYear, lastParamForYear]);

  useEffect(() => {
    console.log("popupData", popupData, typeof popupData);
  }, [popupData]);

  return (
    <>
      <div onClick={(e) => handlePopupClick(e)} className="relative">
        <div className="w-[1100px]  mx-auto h-[1000px] bg-white relative">
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
            <div className="mt-[15px] ml-[30px] text-[20px] ">
              {displayedYear}
            </div>
          </div>
          <div className=" grid grid-cols-4 gap-4 w-[100%] h-[600px] mb-[20px]">
            {monthItems.map((month, monthindex) => (
              <>
                <div>
                  <div key={monthindex} className=" mb-[15px] ">
                    {month.humanFormat}
                  </div>
                  <div className=" grid grid-cols-7 gap-2 text-[11px] w-[100%]">
                    {dayItems.map((day, dayIndex) => (
                      <>
                        <div key={dayIndex} className="mb-[10px]">
                          {day.dayShortFormat}
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-[11px] w-[100%]">
                    {yearDates.map(
                      (date, dateIndex) =>
                        monthindex === dateIndex &&
                        date.map((individualDate) => (
                          <>
                            
                            <div
                              id={`date-${individualDate.fullDate}-month-${dateIndex}`}
                              
                              onClick={(e) => setPopupData(e )}
                              className={` text-center rounded-[100%] w-[55%] 
                              ${
                                Object.keys(popupData).length !== 0 &&
                                popupData.target.id ==
                                  `date-${individualDate.fullDate}` &&
                                new Date(individualDate.fullDate).getMonth() ==
                                  dateIndex
                                  ? "bg-blue-500"
                                  : "hover:bg-red-300"
                              }
                              ${
                                new Date().toLocaleDateString().replace(/\//g, "-") == individualDate.fullDate && new Date().getMonth()== monthindex && "bg-blue-500 text-white"
                              }`
                              }
                              key={dateIndex}
                            >
                              {individualDate.singleNumeralDate}
                            </div>
                          </>
                        ))
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div>
          {popupData !== null && closePopup == true && (
            <>
              {/* <div> {console.log("the get response", getAPIData)}</div> */}
              <Popup
                prop={popupData}
                getAPIData={getAPIData}
                yearDates={yearDates}
                monthItems = {monthItems}
              ></Popup>
            </>
          )}
        </div>
      </div>
    </>
  );
};
