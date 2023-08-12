
import { Fragment, useRef, useState, useCallback, useEffect } from "react";

function OcenaWydatku({ sumaWydatkuMin, sumaWydatkuMax }) {
    const between = (x, min, max) => {
        return x >= min && x <= max;
    };


    const functionWithSwitchWomen = (parameter) => {
        switch (true) {
            case (between(parameter, 1, 836)):
                return (
                    <>
                        <div className="w-[8%] h-full border-r flex justify-center items-center  ">
                            <h3 className=" text-base font-bold text-text2">
                                bardzo lekka
                            </h3>
                        </div>
                   
                    </>
                )
            case (between(parameter, 837, 2929)):
                return (
                    <>
                        <div className="w-[8%] h-full border-r flex justify-center items-center  ">
                            <h3 className=" text-base font-bold text-szary-5">
                                lekka
                            </h3>
                        </div>
               
                    </>
                )
            case (between(parameter, 2930, 4186)):
                return (
                    <>
                        <div className="w-[8%] h-full border-r flex justify-center items-center  ">
                            <h3 className=" text-base font-bold text-orange-3">
                                umiarkowana
                            </h3>
                        </div>
                       
                    </>
                )
            case (between(parameter, 4187, 5024)):
                return (
                    <>
                        <div className="w-[8%] h-full border-r flex justify-center items-center  ">
                            <h3 className=" text-base font-bold text-zielony-3">
                                ciężka
                            </h3>
                        </div>
                     
                    </>
                )
            case (parameter > 5024):
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
    const functionWithSwitchMan = (parameter) => {
        switch (true) {
            case (between(parameter, 1, 1255)):
                return (
                    <>
                        <div className="w-[8%] h-full border-r flex justify-center items-center  ">
                            <h3 className=" text-base font-bold text-text2">
                                bardzo lekka
                            </h3>
                        </div>
                      
                    </>
                )
            case (between(parameter, 1256, 3349)):
                return (
                    <>
                        <div className="w-[8%] h-full border-r flex justify-center items-center  ">
                            <h3 className=" text-base font-bold text-szary-5">
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
        <>
            <div className="flex border p-4">
                <h1 className="pr-6">mężczyźni</h1>
                {functionWithSwitchMan(sumaWydatkuMin  )}
                {functionWithSwitchMan(sumaWydatkuMax  )}
            </div>
            <div className="flex border p-4">
                <h1 className="pr-6">kobiety</h1>
                {functionWithSwitchWomen(sumaWydatkuMin * .8)}
                {functionWithSwitchWomen(sumaWydatkuMax * .8)}
            </div>
            

        </>
    );
}

export default OcenaWydatku;