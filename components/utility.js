export const updateId = (jsonArray, value)=>{
 jsonArray.forEach(item=>{
  if(!item.height){
    item["height"] = parseInt(value[0].height)
    // item["top"] = value[0].top
    // item["left"] = value[0].left

  }
 })

 console.log("the jsonArray after adding the hright", jsonArray)
 

 return jsonArray
}

export const updateTime = (data, key, value) => {
  let updatedJsonArray = [...data]
  updatedJsonArray[0][key] = value
  return updatedJsonArray
}

export const timeValue = (endTime) => {
  let minuteQuotient = parseInt(endTime / 60)
  let minuteRemainder = endTime % 60
  let endingValue = minuteQuotient + ":" + minuteRemainder
  return endingValue
}


export const convertTimeToMinutes = (endingTime) => {
 let endingValue = endingTime.split(":")
 let endingTimeValue = Number(endingValue[0]) * 60 + Number(endingValue[1]) + 15
  return endingTimeValue
}


export const convertTimeToMinutesDecrement = (endingTime) => {
 let endingValue = endingTime.split(":")
 let endingTimeValue = Number(endingValue[0]) * 60 + Number(endingValue[1]) - 15
 return endingTimeValue
}

export const convertToMintues = (startingTime, endingTime) => {
 
  let minutesArray = []
  let valueArray = [startingTime, endingTime]
  valueArray.forEach(time => {
    let splittingTime = time.split(":")
    let calculatedValue = Number(splittingTime[0]) * 60 + Number(splittingTime[1])
    minutesArray.push(calculatedValue)
  })
  if ((minutesArray[1] - minutesArray[0] > 30)) {
    console.log("minutes difference",minutesArray[1] - minutesArray[0])
    let returningArray = [true, minutesArray[1] - minutesArray[0] ]
    return returningArray
  } else {
    console.log(" inside else minutes difference",minutesArray[1] - minutesArray[0])
    let returningArray = [false,  minutesArray[1] - minutesArray[0] ]
    return returningArray
  }
}

export const formatedUITime = (timedict, dayValue) => {
  let timeDisplayArray = []
  let startingValue = new Date(new Date(dayValue[0]).setHours(timedict[0].startingTime.split(":")[0], timedict[0].startingTime.split(":")[1])).toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit" })
  let endingValue = new Date(new Date(dayValue[0]).setHours(timedict[0].endingTime.split(":")[0], timedict[0].endingTime.split(":")[1])).toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit" })
  timeDisplayArray.push(startingValue, " -", endingValue)
  return timeDisplayArray
}




