import { useEffect, useState } from "react";
import Image from "next/image";



export function Popup({ prop, getAPIData,  yearDates}) {
  const [popupDate, setPopupDate] = useState([]);
  const[popupTitle, setPopupTitle] = useState([]);
  const[leftposition, setLeftPosition] = useState([])
  const [rightposition, setRightPosition] = useState([])
  const[captureInitalClick, setCaptureInitalClick] = useState(0)
  
  useEffect(() => {
    setLeftPosition([])
    setRightPosition([])
    let idValue = prop.target.id;
    
    // console.log("the id value insdie the useEffect", idValue);
   
    let slicedValue = idValue.split("-").slice(1,4).join("-")
    
    //  console.log("the sliced Value is ", slicedValue);
    let popupDate = new Date(slicedValue);
    setPopupDate(popupDate);
    // console.log("the position of the x and y", prop.pageX, prop.pageY);
    // console.log("the date from the API", getAPIData)
    // console.log("the date value in year format inside the useeffect", new Date(slicedValue).toLocaleDateString("en-ca") )
    let found = getAPIData.find(element=> element.date === new Date(slicedValue).toLocaleDateString("en-ca")) 
    // getAPIData.forEach(element=>{
    //   element.date == new Date(slicedValue).toLocaleDateString("en-ca")
    //   console.log("title", element.title_name)
    // })
    console.log("the found API Data", found)
    if(found!= undefined){
        setPopupTitle(found.title_name)
    }else {
        setPopupTitle("There are no events scheduled on this day.")
    }

    console.log("year Data",  yearDates, prop)

   console.log("yearDates", yearDates)

    for (let index = 0; index < yearDates.length; index++){
          yearDates[index].forEach(value=>{
            value["idValue"] = `date-${value.fullDate}-month-${index}`
                  console.log("was the new key added", value)
          })
      //  element.forEach(value=>{
      //       value["idValue"] = `date-${value.fullDate}-month-${yearDates[index]}`
      //  })
   };

   setCaptureInitalClick(prop.target.id)

   

   let positionBasedYearDates = [[yearDates[0], yearDates[1]],[yearDates[2],yearDates[3]], [yearDates[4],yearDates[5]],[yearDates[6],yearDates[7]], [yearDates[8],yearDates[9]], [yearDates[10],yearDates[11]]]
   console.log("merged Array", positionBasedYearDates)

   
  // let accumulatedLeftPositions = [];
// let accumulatedRightPositions = [];
// let rightfound
// let leftfound


for (let index = 0; index < positionBasedYearDates.length; index++) {
  if (index % 2 == 0) {
      positionBasedYearDates[index].forEach(objects=>{
         let leftfound = objects.find(data => data.idValue == prop.target.id)
         if(leftfound!== undefined || null){
          console.log("@@leftfound", found)
          setLeftPosition(leftfound.idValue)
        }
      })
   }else if(index % 2 !== 0){
  positionBasedYearDates[index].forEach(objects=>{
      let rightfound = objects.find(data => data.idValue == prop.target.id)
      if(rightfound!== undefined || null){
        console.log("@@rightfound", found)
        setRightPosition(rightfound.idValue)
      }
   })
  }
}

if(prop){
  console.log("click event occured", prop)
  setCaptureInitalClick(captureInitalClick+1)
}









// // Set the state once outside the loop
// if (accumulatedLeftPositions.length > 0) {
//   setLeftPosition(accumulatedLeftPositions);
// }

// if (accumulatedRightPositions.length > 0) {
//   setRightPosition(accumulatedRightPositions);
// }
        


  
 

 

// //  rightColArray.map(item=>{
// //   let foundItem = item.find(value=> value.fullDate == slicedValue)
// //    if(foundItem){
// //      console.log("rightfoundItem", foundItem.fullDate)
// //      setRightPosition(foundItem.fullDate)
      
// //    }
   
// })


  


    

    // let index = getAPIData.findIndex(element=>element.date == new Date(popupDate).toLocaleDateString("en-ca"))
    //  console.log("index value", index)

    //  if(index!=-1){
    //     setPopupTitle(getAPIData[index].title_name)
    //  }else {
    //     setPopupTitle("no events")
    //  }
}, [prop, yearDates]);


useEffect(()=>{
  console.log("thee count value", captureInitalClick)

},[captureInitalClick])







const handleClose = (e) => {
    setPopupDate(false);
    setCaptureInitalClick(0)
  };

 

  return (
    <>
      <div 
       id="main-popup"
        style={
          leftposition.length > 0
          ? { position: "absolute", top: prop.pageY-8+"px", left: prop.pageX+10+"px" } :
          rightposition.length > 0 ?  { position: "absolute", top: prop.pageY-8+"px", left: prop.pageX-230+"px"  } :null
         
        }
        className="w-[220px] h-[140px] bg-white shadow-[0_1px_3px_0px_rgba(60,64,67,0.3)]  shadow-[0_4px_8px_3px_rgba(60,64,67,0.15)] border-2 border-transparent rounded-[8px]"
      >
        {popupDate !== undefined && (
          <>
            <div 
            id="popup"
            className=" flex flex-row gap-[20px] relative">
              <div id="popup-day" className=" mt-[10px] ml-[100px] font-[400] text-[#70757a] font-[sans-serif] text-[13px]">
                {" "}
                {new Date(popupDate).toLocaleDateString("en-us", { weekday: "short" })}
              </div>
              <div className=
              {` w-[45px]  absolute top-[15px] right-[15px]
               ${captureInitalClick == 1 ? "rounded-[100%] h-[45px] bg-slate-200":"hover:bg-slate-100 rounded-[100%] h-[45px]"}`}>
                <Image
                  src="/close.png"
                  width={14}
                  height={14}
                  alt="Close"
                  onClick={(e) => {
                    handleClose(e);
                  }}
                  className="mt-[15px] ml-[15px] "
                />
              </div>
            </div>
            <div id="popup-date" className=" text-center text-[28px]">
              {new Date(popupDate).getDate()}
            </div>
            
               
                <div  
                id="popup-title"
                className={` text-center text-[12px] text-[#3c4043] 
                   ${
                      getAPIData.find(element=>element.title_name == popupTitle) ? " w-[90%] rounded-[3px] h-[20px] mx-auto bg-blue-500": null
                   }`}
                   >
                  {popupTitle} 
                </div>
            
          </>
        )}
      </div>
    </>
  );
}
