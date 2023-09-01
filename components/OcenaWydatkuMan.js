
import { Fragment, useRef, useState, useCallback, useEffect } from "react";


import { IoWomanOutline, IoManOutline } from "react-icons/io5"
import dynamic from "next/dynamic";

function OcenaWydatkuMan({ sumaWydatkuMin, sumaWydatkuMax }) {
    const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });
    const between = (x, min, max) => {
        return x >= min && x <= max;
    };



    const functionWithSwitchMan = (parameter) => {
        switch (true) {
            case (between(parameter, 1, 1255)):
                return (

                    <h3 className=" text-base font-bold   ">
                        bardzo lekka
                    </h3>



                )
            case (between(parameter, 1256, 3349)):
                return (
                    <>
                        <div className="w-[8%] h-full border-r flex justify-center items-center  ">
                            <h3 className=" text-base font-bold  ">
                                lekka
                            </h3>
                        </div>

                    </>
                )
            case (between(parameter, 3350, 6279)):
                return (
                    <>
                        <div className="w-[8%] h-full border-r flex justify-center items-center  ">
                            <h3 className=" text-base font-bold text-orange-3">
                                umiarkowana
                            </h3>
                        </div>

                    </>
                )
            case (between(parameter, 6280, 8374)):
                return (
                    <>
                        <div className="w-[8%] h-full border-r flex justify-center items-center  ">
                            <h3 className=" text-base font-bold text-zielony-3">
                                ciężka
                            </h3>
                        </div>

                    </>
                )
            case (parameter > 8374):
                return (
                    <>
                        <div className="w-[8%] h-full border-r flex justify-center items-center  ">
                            <h3 className=" text-base font-bold text-zielony-3">
                                bardzo ciężka
                            </h3>
                        </div>

                    </>
                )
            default:
                return <h3 className=" text-base font-bold text-zielony-3">
                    zero
                </h3>
        }
    }
    
    return (
        <div className="w-full flex items-center flex-col ">
            <IoManOutline className="text-[150px] mb-6" />
            <div className="flex w-full">
                <div className="w-1/2 flex flex-col justify-center">
                    <GaugeComponent
                        value={`${sumaWydatkuMin}  `}
                        type="semicircle"
                        maxValue={7000}

                        labels={{
                            valueLabel:
                                { formatTextValue: value => value + ` kJ`, matchColorWithArc: true },

                            tickLabels: {

                                type: "outer",

                                ticks: [
                                    { value: 837 },
                                    { value: 2930 },
                                    { value: 4178 },
                                    { value: 5024 },

                                ]
                            }
                        }}
                        arc={{

                            colorArray: ['#5BE12C', '#EA4228'],
                            subArcs: [{ limit: 837 }, { limit: 2930 }, { limit: 4178 }, { limit: 5024 }, {}],
                            padding: 0.02,
                            width: 0.3
                        }}
                        pointer={{
                            type: "arrow",
                            color: " #fff",
                            length: .3,

                            elastic: true,
                            animationDelay: 0
                        }}
                    />
                    <div>
                        {functionWithSwitchMan(sumaWydatkuMin)}
                    </div>
                </div>
                <div className="w-1/2 flex  flex-col justify-center">
                    <GaugeComponent
                        value={`${sumaWydatkuMax}  `}
                        type="semicircle"
                        maxValue={7000}

                        labels={{
                            valueLabel:
                                { formatTextValue: value => value + ` kJ`, matchColorWithArc: true },

                            tickLabels: {

                                type: "outer",

                                ticks: [
                                    { value: 837 },
                                    { value: 2930 },
                                    { value: 4178 },
                                    { value: 5024 },

                                ]
                            }
                        }}
                        arc={{

                            colorArray: ['#5BE12C', '#EA4228'],
                            subArcs: [{ limit: 837 }, { limit: 2930 }, { limit: 4178 }, { limit: 5024 }, {}],
                            padding: 0.02,
                            width: 0.3
                        }}
                        pointer={{
                            type: "arrow",
                            color: " #fff",
                            length: 1,

                            elastic: true,
                            animationDelay: 0
                        }}
                    />
                      <div>
                        {functionWithSwitchMan(sumaWydatkuMax)}
                    </div>
                </div>


            </div> 
             



        </div>
    );
}

export default OcenaWydatkuMan;