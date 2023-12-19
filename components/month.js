import { Fragment, useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
//  import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Mina } from "next/font/google";
// import { MainComponent } from "./main";
// import { document } from "postcss"
// import {Array_data} from  '@/components/Calender'
// import { Array_data } from "./context"
import { CommonPopup } from "./commonpopup";
import { handleGet } from "@/API/Fetchapi";
import { CalenderAPI } from "@/API/api";
import moment from "moment";

const dayItems = [
  {
    humanFormat: "SUN",
    machineFormat: "0",
  },
  {
    humanFormat: "MON",
    machineFormat: "1",
  },
  {
    humanFormat: "TUE",
    machineFormat: "2",
  },
  {
    humanFormat: "WED",
    machineFormat: "3",
  },
  {
    humanFormat: "THU",
    machineFormat: "4",
  },
  {
    humanFormat: "FRI",
    machineFormat: "5",
  },
  {
    humanFormat: "SAT",
    machineFormat: "6",
  },
];

let clickObj = {};
let clickArray = [];



export const Month = ({ onButtonClick, selectProps }) => {
  const [grid, setGrid] = useState();
  const [month, setMonthDates] = useState([]);
  const [day, setDay] = useState([]);
  const [firstWeekDates, setFirstWeekDates] = useState([]);
  const [firstDateInTheCalender, setFirstDateInTheCalender] = useState([]);
  const [lastDateInTheCalender, setLastDateInTheCalender] = useState([]);
  const [monthValue, setMonthValue] = useState([]);
  // const[year, setYear] = useState([])
  const [title, setTitle] = useState([]);
  const [random, setRandom] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("")
  const [tittlePopup, setTitlePopup] = useState([]);
  const [description, setDescription] = useState([]);
  const [startingDate, setStartingDate] = useState([]);
  const [endingDate, setEndingDate] = useState([]);
  const [timeEvent, setTimeEvent] = useState([]);
  const cancelButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selecteddate, setSelectedDate] = useState([]);
  const [startingDisplayValueTime, setStartingDisplayValueTime] = useState([]);
  const [currentTimeValue, setCurrentTimeValue] = useState([]);
  const [currentTime, setCurrentTime] = useState([]);
  const [endingDisplayValueTime, setEndingDisplayValueTime] = useState([]);
  const [startingTimeInArmyTime, setStartingTimeInArmyTime] = useState([]);
  const [endingTimeInArmyTime, setEndingTimeInArmyTime] = useState([]);
  const [postResponse, setPostResponse] = useState([]);
  const [firstParam, setFirstParam] = useState([]);
  const [lastParam, setLastParam] = useState([]);
  const [getResponse, setGetResponse] = useState([]);
  const [monthtask, setMonthTask] = useState([]);
  const [timeInterval, setTimeInterval] = useState([])

  const jsonValues = ({
    title_name: tittlePopup,
    description: description,
    start_time: startingTimeInArmyTime,
    end_time: endingTimeInArmyTime,
    Week_Day: day,
    date: selecteddate,
    height: 38
  })




  useEffect(() => {
    const returned_data = () => {
      console.log("month", month);

      return (
        <div className="">
          {month.map((item, index) => (
            <div
              id={`day-${index}`}
              className=" w-[100%] h-[100px] border-[#DFE0E3] border-t flex flex-cols"
            >
              {item.map((item1, index1) => (
                <div
                  id={`day-${index}-date-${item1.CompleteDate}`}
                  onClick={(e) => handleClick(e, index, item1.CompleteDate)}
                  className="w-[400px]  text-center h-[100px] border-[#DFE0E3] border-b border-r border-[1px] relative"
                >
                  <div className="relative">
                    {console.log("completed date @@", item1.CompleteDate)}
                    <div> {item1.day}</div>
                    <div> {item1.date}</div>
                  </div>
                  {getResponse.length > 0 && getResponse.map((res, index3) => (
                    <>
                      {console.log(
                        "!!res",
                        res,
                        new Date(res.date).toLocaleDateString(),
                        item1.CompleteDate,
                        new Date(res.date).toLocaleDateString() ===
                        item1.CompleteDate
                      )}
                      {
                        new Date(res.date).toLocaleDateString() === item1.CompleteDate && ( //if the key value matches the value of the id of the parent
                          <div
                            key={index3}
                            className="absolute w-full h-full px-[10px] border-black top-[46px] left-0 flex justify-center"
                          >
                            <div
                              id={`task-for-date-${new Date(
                                res.date
                              ).toLocaleDateString()}`}
                              style={{
                                boxShadow: "5px 3px #00000024",
                                opacity: "0.7",
                              }}
                              className="bg-blue-700 text-[11px] w-[200px]  h-[30px]  "
                            >
                              {" "}
                              {res.start_time} {res.title_name}
                            </div>
                          </div>
                        )
                      }
                    </>
                  ))}

                  {
                    //  date.length>0 && console.log( "condition", date, `day-${index}-date-${item1.CompleteDate}`,   date== `day-${index}-date-${item1.CompleteDate}`)
                    date.length > 0 && date == `day-${index}-date-${item1.CompleteDate}` &&
                    <div
                      // key={index3}
                      className="absolute w-full h-full px-[10px] border-black top-[46px] left-0 flex justify-center"
                    >
                      <div
                        // id={`task-for-date-${new Date(res.date).toLocaleDateString()}`}
                        style={{
                          boxShadow: "5px 3px #00000024",
                          opacity: "0.7",
                        }}
                        className="bg-blue-700 text-[11px] w-[200px]  h-[30px]  "
                      >
                        {" "}
                        No title
                      </div>
                    </div>


                  }

                </div>
              ))}
            </div>
          ))}
        </div>
      );
    };

    setGrid(returned_data);
  }, [month, day, firstWeekDates, random, getResponse, date]);

  useEffect(() => {
    let MonthArray = [];
    let currentDate = new Date();
    console.log("the current Date", currentDate);
    var firstDateOftheCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ); // gets the value of the first day of the month
    var lasteDateOftheCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    console.log("first day of the month:,", firstDateOftheCurrentMonth);
    console.log("last day of the month:", lasteDateOftheCurrentMonth);
    let firstWeekfirstDate = firstDateOftheCurrentMonth.setDate(
      firstDateOftheCurrentMonth.getDate() - firstDateOftheCurrentMonth.getDay()
    ); // we manipulating the date to get the beginning of the week date
    // setFirstParam(firstWeekfirstDate)
    let firstWeekfirstDateValue = new Date(firstWeekfirstDate - 1);
    let lastWeekfirstDate = lasteDateOftheCurrentMonth.setDate(
      lasteDateOftheCurrentMonth.getDate() - lasteDateOftheCurrentMonth.getDay()
    );
    let lastWeekfirstDateValue = new Date(lastWeekfirstDate - 1);
    console.log(
      "first date of the week of the current month==>",
      firstWeekfirstDateValue
    );
    console.log(
      "last date of the week of the current month==>",
      lastWeekfirstDateValue
    );

    let currentMonthFirstWeekArray = [];
    let currentMonthFirstWeekArrayCompleteDate = [];
    for (let i = 0; i <= 6; i++) {
      let currentMonthFirstWeekValues = new Date(
        firstWeekfirstDateValue.setDate(firstWeekfirstDateValue.getDate() + 1)
      );
      currentMonthFirstWeekArrayCompleteDate.push(currentMonthFirstWeekValues);
      currentMonthFirstWeekArray.push(currentMonthFirstWeekValues.getDate());
    }

    let currentMonthLastWeekArray = [];
    let currentMonthLastWeekArrayCompleteDate = [];
    for (let i = 0; i <= 6; i++) {
      let currentMonthLastWeekValues = new Date(
        lastWeekfirstDateValue.setDate(lastWeekfirstDateValue.getDate() + 1)
      );
      currentMonthLastWeekArray.push(currentMonthLastWeekValues.getDate());
      currentMonthLastWeekArrayCompleteDate.push(currentMonthLastWeekValues);
    }

    let currentMonthFirstWeekFirstDayInShortForm =
      currentMonthFirstWeekArrayCompleteDate[0]
        .toLocaleDateString("en-ca")
        .replace(/\//g, "-");
    console.log(
      "current week first day first week",
      currentMonthFirstWeekFirstDayInShortForm
    );
    setFirstParam(currentMonthFirstWeekFirstDayInShortForm);

    let currentMonthLastWeekLastDayInShortForm =
      currentMonthLastWeekArrayCompleteDate[
        currentMonthLastWeekArrayCompleteDate.length - 1
      ]
        .toLocaleDateString("en-ca")
        .replace(/\//g, "-");
    console.log(
      "the current month end",
      currentMonthLastWeekLastDayInShortForm
    );
    setLastParam(currentMonthLastWeekLastDayInShortForm);

    console.log(
      "the current month first week's array",
      currentMonthFirstWeekArray
    );
    console.log(
      "the current month first week's last index Value",
      currentMonthFirstWeekArray[currentMonthFirstWeekArray.length - 1]
    );
    console.log(
      "the current month last week's first index Value",
      currentMonthLastWeekArray[0]
    );

    let currentMonthFirstWeekLastIndexDate =
      currentMonthFirstWeekArrayCompleteDate[
      currentMonthFirstWeekArrayCompleteDate.length - 1
      ];
    let currentMonthLastWeekFirstIndexDate =
      currentMonthLastWeekArrayCompleteDate[0];

    let currentMonthRestoftheWeekArray = [];
    let currentMonthRestoftheWeekArrayCompleteDate = [];
    console.log("the value", currentMonthFirstWeekLastIndexDate.getDate() + 1);

    console.log(
      "&&",
      currentMonthFirstWeekArrayCompleteDate,
      currentMonthLastWeekArrayCompleteDate
    );

    let currentMonthInBetweenValue = new Date(
      currentMonthFirstWeekLastIndexDate.getFullYear(),
      currentMonthFirstWeekLastIndexDate.getMonth(),
      currentMonthFirstWeekLastIndexDate.getDate() + 1
    );
    for (
      let i = currentMonthInBetweenValue.getDate();
      i < currentMonthLastWeekFirstIndexDate.getDate();
      i++
    ) {
      console.log("the inbetween dates", i);
      let restOftheWeekValues = new Date(
        currentMonthInBetweenValue.getFullYear(),
        currentMonthInBetweenValue.getMonth(),
        i
      );
      console.log("&&rest of the week", restOftheWeekValues);
      currentMonthRestoftheWeekArray.push(restOftheWeekValues.getDate());
      currentMonthRestoftheWeekArrayCompleteDate.push(restOftheWeekValues);
    }

    let MonthArrayCompleteDate = [];
    let MonthArrayCompleteDateInString = [];
    MonthArrayCompleteDate.push(
      currentMonthFirstWeekArrayCompleteDate,
      currentMonthRestoftheWeekArrayCompleteDate,
      currentMonthLastWeekArrayCompleteDate
    );
    console.log("complete date array:", MonthArrayCompleteDate);
    let MonthArrayCompleteDateMerged = MonthArrayCompleteDate.flat();
    MonthArrayCompleteDateMerged.forEach((date) => {
      let dateInString = date.toLocaleDateString("en-US");
      MonthArrayCompleteDateInString.push(dateInString);
    });

    console.log(
      "MonthArrayCompleteDateInString",
      MonthArrayCompleteDateInString
    );

    console.log(
      "dates of the remaining week, ",
      currentMonthRestoftheWeekArrayCompleteDate
    );
    MonthArray.push(
      currentMonthFirstWeekArray,
      currentMonthRestoftheWeekArray,
      currentMonthLastWeekArray
    );
    console.log("the current Month's date", MonthArray);
    let MonthArrayMerged = MonthArray.flat();
    console.log("after merging the current month array", MonthArrayMerged);
    let splitedArray = [];
    let splitedArrayOfCompleteDate = [];
    let chunkSize = 7;

    let dateArrayOfObjects = [];
    MonthArrayCompleteDateInString.forEach((CompleteDateItem) => {
      console.log("CompleteDateItem", CompleteDateItem);
      let dateObj = {};
      dateObj["CompletedDate"] = CompleteDateItem;
      dateArrayOfObjects.push(dateObj);
    });

    console.log("date Array of Objects:", dateArrayOfObjects);

    for (let i = 0; i < MonthArrayMerged.length; i += chunkSize) {
      splitedArray.push(MonthArrayMerged.slice(i, i + chunkSize));
    }

    for (let i = 0; i < dateArrayOfObjects.length; i += chunkSize) {
      splitedArrayOfCompleteDate.push(
        dateArrayOfObjects.slice(i, i + chunkSize)
      );
    }

    console.log("the splited Array", splitedArrayOfCompleteDate);
    let arrayOfObjects = [];
    splitedArray.forEach((element, index) => {
      console.log("element", element, index, splitedArrayOfCompleteDate[index]);
      if (index == 0) {
        element.forEach((value, elementIndex) => {
          console.log(
            "value of dates",
            value,
            dayItems[elementIndex].humanFormat
          );
          const firstIndexObj = {};
          firstIndexObj["date"] = value;
          firstIndexObj["day"] = dayItems[elementIndex].humanFormat;
          arrayOfObjects.push(firstIndexObj);
          console.log("object1", firstIndexObj);
        });
      } else {
        element.forEach((value, elementIndex) => {
          const allIndexObj = {};
          allIndexObj["date"] = value;
          console.log("object2", allIndexObj);
          arrayOfObjects.push(allIndexObj);
        });
      }
    });
    console.log("the array of the objects", arrayOfObjects, dateArrayOfObjects);

    const finalArrayOfObjects = arrayOfObjects.map((item, index) => ({
      ...item,
      CompleteDate: dateArrayOfObjects[index].CompletedDate,
    }));
    console.log("the new array", finalArrayOfObjects);

    let finalSplitedArray = [];
    let Size = 7;
    for (let i = 0; i < finalArrayOfObjects.length; i += Size) {
      finalSplitedArray.push(finalArrayOfObjects.slice(i, i + Size));
    }
    console.log("final Array", finalSplitedArray);
    setMonthDates(finalSplitedArray);
    setMonthValue(currentDate);

    let monthAndYear = [];
    let month = currentDate.toLocaleString("en-us", { month: "long" });

    let monthandYearObj = { month: month, year: currentDate.getFullYear() };
    monthAndYear.push(monthandYearObj);
    setTitle(monthAndYear);
    // callfunction()

  }, []);

  const handlePrevious = (e) => {
    let MonthValue = new Date(monthValue);
    let previousMonthValue = new Date(
      MonthValue.setMonth(MonthValue.getMonth() - 1)
    );
    console.log("the current date Value", previousMonthValue);
    let previousMonthFirstDate = new Date(
      previousMonthValue.getFullYear(),
      previousMonthValue.getMonth(),
      1
    );
    console.log("previous month first date", previousMonthFirstDate);
    let previousMonthFirstWeekStartingDate = new Date(
      previousMonthFirstDate.setDate(
        previousMonthFirstDate.getDate() - previousMonthFirstDate.getDay()
      )
    );
    let previousMonthFirstWeekBeforeStartingDate = new Date(
      previousMonthFirstWeekStartingDate - 1
    );
    console.log(
      "the previous Month Before First Date",
      previousMonthFirstWeekBeforeStartingDate
    );

    let previousMonthFirstWeekArray = [];
    let previousMonthFirstWeekCompleteDate = [];
    for (let i = 0; i <= 6; i++) {
      let previousMonthFirstWeekValues = new Date(
        previousMonthFirstWeekBeforeStartingDate.setDate(
          previousMonthFirstWeekBeforeStartingDate.getDate() + 1
        )
      );
      console.log(
        "the previous Month's first Weeks's Value",
        previousMonthFirstWeekBeforeStartingDate
      );
      previousMonthFirstWeekCompleteDate.push(previousMonthFirstWeekValues);
      previousMonthFirstWeekArray.push(previousMonthFirstWeekValues.getDate());
    }

    console.log("the previous week complete date", previousMonthFirstWeekArray);

    //     //ending of the month
    let previousMonthLastDate = new Date(
      previousMonthValue.getFullYear(),
      previousMonthValue.getMonth() + 1,
      0
    );
    console.log("the previous month last date,", previousMonthLastDate);
    let previousMonthEndingWeekInitalDate = new Date(
      previousMonthLastDate.setDate(
        previousMonthLastDate.getDate() - previousMonthLastDate.getDay()
      )
    );
    console.log(
      "the previous Month starting of the end Week",
      previousMonthEndingWeekInitalDate
    );
    let previousMonthEndingWeekBeforeInitalDate = new Date(
      previousMonthEndingWeekInitalDate - 1
    );
    console.log(
      "the value before the start of the ending week",
      previousMonthEndingWeekBeforeInitalDate
    );

    let previousMonthLastWeekArray = [];
    let previousMonthLastWeekCompleteDate = [];
    for (let i = 0; i <= 6; i++) {
      let previousMonthLastWeekValue = new Date(
        previousMonthEndingWeekBeforeInitalDate.setDate(
          previousMonthEndingWeekBeforeInitalDate.getDate() + 1
        )
      );
      previousMonthLastWeekArray.push(previousMonthLastWeekValue.getDate());
      previousMonthLastWeekCompleteDate.push(previousMonthLastWeekValue);
    }

    console.log(
      "the previous week complete date of the last week",
      previousMonthLastWeekArray
    );

    let previousWeekFirstWeekFirstDay = previousMonthFirstWeekCompleteDate[0]
      .toLocaleDateString("en-ca")
      .replace(/\//g, "-");
    setFirstParam(previousWeekFirstWeekFirstDay);

    let previousWeekLastWeekLastDay = previousMonthLastWeekCompleteDate[
      previousMonthLastWeekCompleteDate.length - 1
    ]
      .toLocaleDateString("en-ca")
      .replace(/\//g, "-");
    console.log("the previous month end", previousWeekLastWeekLastDay);
    setLastParam(previousWeekLastWeekLastDay);

    let previousMonthFirstWeekLastIndexDate =
      previousMonthFirstWeekCompleteDate[
      previousMonthFirstWeekCompleteDate.length - 1
      ];
    let previousMonthLastWeekFirstIndexDate =
      previousMonthLastWeekCompleteDate[0];
    let previousMonthRestoftheWeekArray = [];
    let previousMonthRestoftheWeekArrayCompleteDate = [];
    console.log("the value", previousMonthFirstWeekLastIndexDate.getDate() + 1);

    console.log("&&the week values", previousMonthFirstWeekCompleteDate);
    console.log("&&nextweek", previousMonthLastWeekCompleteDate);
    console.log(
      "&&&",
      new Date(
        previousMonthFirstWeekLastIndexDate.getFullYear(),
        previousMonthFirstWeekLastIndexDate.getMonth(),
        previousMonthFirstWeekLastIndexDate.getDate() + 1
      )
    );
    let startingOftheInbetween = new Date(
      previousMonthFirstWeekLastIndexDate.getFullYear(),
      previousMonthFirstWeekLastIndexDate.getMonth(),
      previousMonthFirstWeekLastIndexDate.getDate() + 1
    );
    for (
      let i = startingOftheInbetween.getDate();
      i < previousMonthLastWeekFirstIndexDate.getDate();
      i++
    ) {
      console.log("&&the inbetween dates", i);
      let restOftheWeekValues = new Date(
        startingOftheInbetween.getFullYear(),
        startingOftheInbetween.getMonth(),
        i
      );
      // let restOftheWeekValues = new Date(previousMonthFirstWeekLastIndexDate.setDate(previousMonthFirstWeekLastIndexDate.getDate() + 1))
      console.log("&&rest of the week", restOftheWeekValues);
      previousMonthRestoftheWeekArray.push(restOftheWeekValues.getDate());
      previousMonthRestoftheWeekArrayCompleteDate.push(restOftheWeekValues);
    }

    // previousMonthFirstWeekLastIndexDate = new Date(previousMonthFirstWeekLastIndexDate.setDate(previousMonthFirstWeekCompleteDate[previousMonthFirstWeekCompleteDate.length-2].getDate()+1))

    let MonthArrayCompleteDate = [];
    let MonthArrayCompleteDateInString = [];
    MonthArrayCompleteDate.push(
      previousMonthFirstWeekCompleteDate,
      previousMonthRestoftheWeekArrayCompleteDate,
      previousMonthLastWeekCompleteDate
    );
    console.log("complete date array:", MonthArrayCompleteDate);
    let MonthArrayCompleteDateMerged = MonthArrayCompleteDate.flat();
    MonthArrayCompleteDateMerged.forEach((date) => {
      let dateInString = date.toLocaleDateString("en-US");
      MonthArrayCompleteDateInString.push(dateInString);
    });

    console.log(
      "MonthArrayCompleteDateInString",
      MonthArrayCompleteDateInString
    );

    console.log(
      "dates of the remaining week, ",
      previousMonthRestoftheWeekArrayCompleteDate
    );
    let previousMonthCompleteMonthArray = [
      previousMonthFirstWeekArray,
      previousMonthRestoftheWeekArray,
      previousMonthLastWeekArray,
    ];
    console.log("the previous Month's date", previousMonthCompleteMonthArray);
    let previousMonthArrayMerged = previousMonthCompleteMonthArray.flat();
    console.log(
      "after merging the previous month array",
      previousMonthArrayMerged
    );
    let splitedArray = [];
    let splitedArrayOfCompleteDate = [];
    let chunkSize = 7;

    let dateArrayOfObjects = [];
    MonthArrayCompleteDateInString.forEach((CompleteDateItem) => {
      console.log("CompleteDateItem", CompleteDateItem);
      let dateObj = {};
      dateObj["CompletedDate"] = CompleteDateItem;
      dateArrayOfObjects.push(dateObj);
    });

    console.log("date Array of Objects:", dateArrayOfObjects);

    for (let i = 0; i < previousMonthArrayMerged.length; i += chunkSize) {
      splitedArray.push(previousMonthArrayMerged.slice(i, i + chunkSize));
    }

    for (let i = 0; i < dateArrayOfObjects.length; i += chunkSize) {
      splitedArrayOfCompleteDate.push(
        dateArrayOfObjects.slice(i, i + chunkSize)
      );
    }

    console.log("the splited Array", splitedArrayOfCompleteDate);
    let arrayOfObjects = [];
    splitedArray.forEach((element, index) => {
      console.log("element", element, index, splitedArrayOfCompleteDate[index]);
      if (index == 0) {
        element.forEach((value, elementIndex) => {
          console.log(
            "value of dates",
            value,
            dayItems[elementIndex].humanFormat
          );
          const firstIndexObj = {};
          firstIndexObj["date"] = value;
          firstIndexObj["day"] = dayItems[elementIndex].humanFormat;
          arrayOfObjects.push(firstIndexObj);
          console.log("object1", firstIndexObj);
        });
      } else {
        element.forEach((value, elementIndex) => {
          const allIndexObj = {};
          allIndexObj["date"] = value;
          console.log("object2", allIndexObj);
          arrayOfObjects.push(allIndexObj);
        });
      }
    });
    console.log("the array of the objects", arrayOfObjects, dateArrayOfObjects);

    const finalArrayOfObjects = arrayOfObjects.map((item, index) => ({
      ...item,
      CompleteDate: dateArrayOfObjects[index].CompletedDate,
    }));
    console.log("the new array", finalArrayOfObjects);

    let finalSplitedArray = [];
    let Size = 7;
    for (let i = 0; i < finalArrayOfObjects.length; i += Size) {
      finalSplitedArray.push(finalArrayOfObjects.slice(i, i + Size));
    }
    console.log("final Array", finalSplitedArray);
    setMonthDates(finalSplitedArray);
    setMonthValue(previousMonthValue);

    let monthAndYear = [];
    let month = previousMonthValue.toLocaleString("en-us", { month: "long" });

    let monthandYearObj = {
      month: month,
      year: previousMonthValue.getFullYear(),
    };
    monthAndYear.push(monthandYearObj);
    setTitle(monthAndYear);



  };

  const handleNext = (e) => {
    let MonthValue = new Date(monthValue);
    // console.log("the next months Value", nextMonthValue)
    let nextMonthValue = new Date(
      MonthValue.setMonth(MonthValue.getMonth() + 1)
    );
    // let monthToGetTheEndOftheMonthValue = new Date(MonthValue.setMonth(MonthValue.getMonth()+2))
    console.log(nextMonthValue);
    let nextMonthFirstDate = new Date(
      nextMonthValue.getFullYear(),
      nextMonthValue.getMonth(),
      1
    );
    console.log("next month first date", nextMonthFirstDate);
    let nextMonthFirstWeekStartingDate = new Date(
      nextMonthFirstDate.setDate(
        nextMonthFirstDate.getDate() - nextMonthFirstDate.getDay()
      )
    );
    let nextMonthFirstWeekBeforeStartingDate = new Date(
      nextMonthFirstWeekStartingDate - 1
    );
    console.log(
      "the next Month Before First Date",
      nextMonthFirstWeekBeforeStartingDate
    );

    let nextMonthFirstWeekArray = [];
    let nextMonthFirstWeekCompleteDate = [];
    for (let i = 0; i <= 6; i++) {
      let nextMonthFirstWeekValues = new Date(
        nextMonthFirstWeekBeforeStartingDate.setDate(
          nextMonthFirstWeekBeforeStartingDate.getDate() + 1
        )
      );
      console.log(
        "the next Month's first Weeks's Value",
        nextMonthFirstWeekBeforeStartingDate
      );
      console.log("@@@@@@", nextMonthFirstWeekValues);
      nextMonthFirstWeekCompleteDate = [
        ...nextMonthFirstWeekCompleteDate,
        nextMonthFirstWeekValues,
      ];
      nextMonthFirstWeekArray.push(nextMonthFirstWeekValues.getDate());
    }

    console.log("&&next first week", nextMonthFirstWeekArray);
    console.log(
      "&&the next first week complete date",
      nextMonthFirstWeekCompleteDate
    );

    // // ending of the month
    let nextMonthLastDate = new Date(
      nextMonthValue.getFullYear(),
      nextMonthValue.getMonth() + 1,
      0
    );
    let nextMonthEndingWeekInitalDate = new Date(
      nextMonthLastDate.setDate(
        nextMonthLastDate.getDate() - nextMonthLastDate.getDay()
      )
    );
    console.log(
      "the next Month starting of the end Week",
      nextMonthEndingWeekInitalDate
    );
    let nextMonthEndingWeekBeforeInitalDate = new Date(
      nextMonthEndingWeekInitalDate - 1
    );
    // console.log("the value before the start of the ending week", nextMonthEndingWeekBeforeInitalDate)

    let nextMonthLastWeekArray = [];
    let nextMonthLastWeekCompleteDate = [];
    for (let i = 0; i <= 6; i++) {
      let nextMonthLastWeekValue = new Date(
        nextMonthEndingWeekBeforeInitalDate.setDate(
          nextMonthEndingWeekBeforeInitalDate.getDate() + 1
        )
      );
      nextMonthLastWeekArray.push(nextMonthLastWeekValue.getDate());
      nextMonthLastWeekCompleteDate.push(nextMonthLastWeekValue);
    }

    // console.log("the next week complete date of the last week", nextMonthLastWeekCompleteDate, nextMonthFirstWeekCompleteDate )

    let nextWeekFirstWeekFirstDate = nextMonthFirstWeekCompleteDate[0]
      .toLocaleDateString("en-ca")
      .replace(/\//g, "-");
    setFirstParam(nextWeekFirstWeekFirstDate);

    let nextWeekLastWeekLastDate = nextMonthLastWeekCompleteDate[
      nextMonthLastWeekCompleteDate.length - 1
    ]
      .toLocaleDateString("en-ca")
      .replace(/\//g, "-");
    setLastParam(nextWeekLastWeekLastDate);

    let nextMonthFirstWeekLastIndexDate =
      nextMonthFirstWeekCompleteDate[nextMonthFirstWeekCompleteDate.length - 1];
    console.log("&&next", nextMonthFirstWeekLastIndexDate);
    let nextMonthLastWeekFirstIndexDate = nextMonthLastWeekCompleteDate[0];
    console.log("&&nextfirst", nextMonthLastWeekFirstIndexDate);
    let nextMonthRestoftheWeekArray = [];
    let nextMonthRestoftheWeekArrayCompleteDate = [];
    // console.log("the value", nextMonthFirstWeekLastIndexDate.getDate() + 1)
    let startingOftheInbetween = new Date(
      nextMonthFirstWeekLastIndexDate.getFullYear(),
      nextMonthFirstWeekLastIndexDate.getMonth(),
      nextMonthFirstWeekLastIndexDate.getDate() + 1
    );
    for (
      let i = startingOftheInbetween.getDate();
      i < nextMonthLastWeekFirstIndexDate.getDate();
      i++
    ) {
      console.log("&&the inbetween dates", i);
      let restOftheWeekValues = new Date(
        startingOftheInbetween.getFullYear(),
        startingOftheInbetween.getMonth(),
        i
      );
      // let restOftheWeekValues = new Date(nextMonthFirstWeekLastIndexDate.setDate(nextMonthFirstWeekLastIndexDate.getDate() + 1))
      console.log("&&rest of the week", restOftheWeekValues);
      nextMonthRestoftheWeekArray.push(restOftheWeekValues.getDate());
      nextMonthRestoftheWeekArrayCompleteDate.push(restOftheWeekValues);
    }

    let MonthArrayCompleteDate = [];
    let MonthArrayCompleteDateInString = [];
    MonthArrayCompleteDate.push(
      nextMonthFirstWeekCompleteDate,
      nextMonthRestoftheWeekArrayCompleteDate,
      nextMonthLastWeekCompleteDate
    );
    console.log("complete date array:", MonthArrayCompleteDate);
    let MonthArrayCompleteDateMerged = MonthArrayCompleteDate.flat();
    MonthArrayCompleteDateMerged.forEach((date) => {
      let dateInString = date.toLocaleDateString("en-US");
      MonthArrayCompleteDateInString.push(dateInString);
    });

    console.log(
      "MonthArrayCompleteDateInString",
      MonthArrayCompleteDateInString
    );

    console.log(
      "dates of the remaining week, ",
      nextMonthRestoftheWeekArrayCompleteDate
    );
    let nextMonthCompleteMonthArray = [
      nextMonthFirstWeekArray,
      nextMonthRestoftheWeekArray,
      nextMonthLastWeekArray,
    ];
    console.log("the next Month's date", nextMonthCompleteMonthArray);
    let nextMonthArrayMerged = nextMonthCompleteMonthArray.flat();
    console.log("after merging the next month array", nextMonthArrayMerged);
    let splitedArray = [];
    let splitedArrayOfCompleteDate = [];
    let chunkSize = 7;

    let dateArrayOfObjects = [];
    MonthArrayCompleteDateInString.forEach((CompleteDateItem) => {
      console.log("CompleteDateItem", CompleteDateItem);
      let dateObj = {};
      dateObj["CompletedDate"] = CompleteDateItem;
      dateArrayOfObjects.push(dateObj);
    });

    console.log("date Array of Objects:", dateArrayOfObjects);

    for (let i = 0; i < nextMonthArrayMerged.length; i += chunkSize) {
      splitedArray.push(nextMonthArrayMerged.slice(i, i + chunkSize));
    }

    for (let i = 0; i < dateArrayOfObjects.length; i += chunkSize) {
      splitedArrayOfCompleteDate.push(
        dateArrayOfObjects.slice(i, i + chunkSize)
      );
    }

    console.log("the splited Array", splitedArrayOfCompleteDate);
    let arrayOfObjects = [];
    splitedArray.forEach((element, index) => {
      console.log("element", element, index, splitedArrayOfCompleteDate[index]);
      if (index == 0) {
        element.forEach((value, elementIndex) => {
          console.log(
            "value of dates",
            value,
            dayItems[elementIndex].humanFormat
          );
          const firstIndexObj = {};
          firstIndexObj["date"] = value;
          firstIndexObj["day"] = dayItems[elementIndex].humanFormat;
          arrayOfObjects.push(firstIndexObj);
          console.log("object1", firstIndexObj);
        });
      } else {
        element.forEach((value, elementIndex) => {
          const allIndexObj = {};
          allIndexObj["date"] = value;
          console.log("object2", allIndexObj);
          arrayOfObjects.push(allIndexObj);
        });
      }
    });
    console.log("the array of the objects", arrayOfObjects, dateArrayOfObjects);

    const finalArrayOfObjects = arrayOfObjects.map((item, index) => ({
      ...item,
      CompleteDate: dateArrayOfObjects[index].CompletedDate,
    }));
    console.log("the new array", finalArrayOfObjects);

    let finalSplitedArray = [];
    let Size = 7;
    for (let i = 0; i < finalArrayOfObjects.length; i += Size) {
      finalSplitedArray.push(finalArrayOfObjects.slice(i, i + Size));
    }
    console.log("final Array", finalSplitedArray);
    setMonthDates(finalSplitedArray);
    setMonthValue(nextMonthValue);

    let monthAndYear = [];
    let month = nextMonthValue.toLocaleString("en-us", { month: "long" });

    let monthandYearObj = { month: month, year: nextMonthValue.getFullYear() };
    monthAndYear.push(monthandYearObj);
    setTitle(monthAndYear);
    console.log("final Array", finalSplitedArray);

  };

  const handleClick = (e, day, date) => {

    if (e.target.id != "") {
      console.log("target", e.target.id);
      setDate(e.target.id)
    }

    setOpen(true);


  };

  useEffect(() => {
    if (date.length > 0) {
      let DateValue = new Date(date.split("-")[3]).toLocaleDateString("en-us", { weekday: "long", month: "long", day: "numeric" })
      setStartingDate(DateValue)
      setEndingDate(DateValue)

    }
  }, [date]);

  const callfunction = async () => {

    let res = await handleGet(CalenderAPI, firstParam, lastParam)
    setGetResponse(res)

  }

  useEffect(() => {

    let timeIntervalArray = []
    const interval = 15;
    for (let i = 0; i <= 60 * 24 - 15; i += interval) {
      let hours = Math.floor(i / 60);
      let minutes = i % 60;
      let timeInterValue = moment().hour(hours).minute(minutes).seconds(0);
      let formatedTime = timeInterValue.format(`HH:mm`)
      const formatedToTweleveHourFormat = moment(formatedTime, ["HH:mm"]).format("hh:mm A");
      let dateInterval={}
      dateInterval["date"] = formatedToTweleveHourFormat
      timeIntervalArray.push(dateInterval)
    }

    console.log("the time interval Array", timeIntervalArray)

    // timeIntervalArray.filter()

    
    setTimeInterval(timeIntervalArray)
  }, [])

  useEffect(() => {
    let currentTimeValue = new Date().toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit" })
    let currentTimeInMin = Number(currentTimeValue.split(":")[0]) * 60 + Number(currentTimeValue.split(":")[1].split(" ")[0])
    let starttime = Number(currentTimeValue.split(":")[0]) * 60 + 0
    let endtime = Number(currentTimeValue.split(":")[0]) * 60 + 30
    let endtimefinalmin = currentTimeValue.split(":")[0] * 60 + 59

    if (currentTimeInMin >= starttime && currentTimeInMin < endtime) {
      let currentDate = new Date()
      let startingTimeArray = new Date(currentDate.setMinutes(30)).toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit" })
      console.log("the time value 1", startingTimeArray)
      setStartingDisplayValueTime(startingTimeArray)
    } else if (currentTimeInMin >= endtime && currentTimeInMin <= endtimefinalmin) {
      let currentDate = new Date()
      let startingTimeValue = new Date(currentDate.setHours(currentDate.getHours() + 1, 0)).toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit" })
      console.log("the time value 2", startingTimeValue)
      setStartingDisplayValueTime(startingTimeValue)
    }
}, [date])

  return (
    <>
      <div className="w-[1536px]  mx-auto h-fill bg-white">
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
              {title.map((item) => (
                <>
                  <div className="text-[18px] font-[400]">{item.month} </div>
                  <div className="text-[18px] font-[400]">{item.year} </div>
                </>
              ))}
            </div>
            <div className="mt-[15px] ml-[30px]">
              <select
                value={selectProps}
                onChange={(e) => onButtonClick(e.target.value)}
              >
                <option value="Month"> Month </option>
                <option value="Week"> Week </option>
                <option value="Year"> Year </option>
                <option value="Day"> Day </option>

              </select>
            </div>
          </div>
        </div>

        <div> {grid}</div>
        <div> {<CommonPopup open={{ open, setOpen }} startingDate={startingDate} endingDate={{ endingDate, setEndingDate }} selected={selectProps} isOpen={isOpen} timeEvent={timeEvent} event={jsonValues} title={{ tittlePopup, setTitlePopup }} description={{ description, setDescription }} param={{ firstParam, lastParam }} getresponsefunction={setGetResponse} val={setDate} timeInterval={timeInterval}
         startDisplayValueTime = {{startingDisplayValueTime, setStartingDisplayValueTime }} />}</div>


      </div>
    </>
  );
};
