import { useState, useEffect, useRef } from "react"

export const ButtonComp = (value) => {
    const [buttonOpen, setButtonOpen] = useState(false)
    const [startSelect, setStartSelect] = useState(false)
    const inputElement = useRef();

    useEffect(() => {
       let filteredTimeInterval = value.timeInterval.filter(time=> time.date > value.starttime.startingDisplayValueTime )
       console.log("filtered Time", filteredTimeInterval)
    }, [value.timeInterval,value.starttime.startingDisplayValueTime  ])

    useEffect(() => {
        if (buttonOpen) {
            if (inputElement.current) {
                inputElement.current.click()
            }
        }
    }, [buttonOpen])

            
    return (
        <>
            {buttonOpen == false ? (
                <div id="AddtimeValue" className="w-[60px] h-[30px] border-[#5f6368] border-[1px] rounded-[5px]"
                    onClick={(e) => setButtonOpen(true)}>
                    <div className=" w-[100%] text-center text-[#5f6368] text-[11px] mt-[5px]"> Add Time </div>
                </div>

            ) : (
                <div className="relative">
                    <div className="flex flex-row gap-[10px] ">
                        <div>
                            <input ref={inputElement} type="text" id="startimeid" onClick={(e) => { setStartSelect(true) }} style={{ width: "100px" }} placeholder="hh:mm" value={value.starttime.startingDisplayValueTime} />
                        </div>
                        <div>
                            <input type="text" placeholder="hh:mm" value="" />
                        </div>
                    </div>
                    {
                        startSelect &&

                        <div className="absolute top-[40px]  w-[100px]">
                            <select
                                name="selectedTime"
                                onChange={e => value.starttime.setStartingDisplayValueTime(e.target.value)}
                                multiple={true}
                                className="w-[200px] min-h-[100px] max-h-[200px]"

                            >
                                {
                                    value.timeInterval.map((item, index) => (

                                        <option key={index} value={`${item.date}`}>{item.date}</option>


                                    ))

                                }
                            </select>

                        </div>

                    }
                </div>


            )

            }


        </>





    )
}