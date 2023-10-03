import { PiHamburger } from "react-icons/pi";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import {   IoManOutline } from "react-icons/io5"
import dynamic from "next/dynamic";
import 'react-tippy/dist/tippy.css'
import {
    Tooltip,
} from 'react-tippy';

function OcenaWydatkuManKcal({ sumaWydatkuMin, sumaWydatkuMax }) {
    const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });
    const between = (x, min, max) => {
        return x >= min && x <= max;
    };

    let bg = ""
    let bg1 = ""
    const functionWithSwitchMan1 = (parameter) => {

        switch (true) {
            case (between(parameter, 1, 299)):
                return "bardzo lekka"

            case (between(parameter, 300, 799)):
                return "lekka"

            case (between(parameter, 800, 1499)):
                return "umiarkowana"

            case (between(parameter, 1500, 1999)):
                return "ciężka"

            case (parameter > 2000):
                return "bardzo ciężka"

            default:
                return <h3 className=" text-base font-bold text-zielony-3">
                    zero
                </h3>
        }
    }
    const functionWithSwitchMan2 = (parameter) => {

        switch (true) {
            case (between(parameter, 1, 299)):
                return "bardzo lekka"

            case (between(parameter, 300, 799)):
                return "lekka"

            case (between(parameter, 800, 1499)):
                return "umiarkowana"

            case (between(parameter, 1500, 1999)):
                return "ciężka"

            case (parameter > 2000):
                return "bardzo ciężka"

            default:
                return <h3 className=" text-base font-bold text-zielony-3">
                    zero
                </h3>
        }
    }

    switch (functionWithSwitchMan1(sumaWydatkuMin)) {
        case "bardzo lekka":
            bg = "text-wykres-1";

            break;
        case "lekka":
            bg = "text-wykres-2";
            break;
        case "umiarkowana":
            bg = "text-wykres-3";
            break;
        case "ciężka":
            bg = "text-wykres-4";
            break;
        case "bardzo ciężka":
            bg = "text-wykres-5";
            break;

    }
    switch (functionWithSwitchMan1(sumaWydatkuMax)) {
        case "bardzo lekka":
            bg1 = "text-wykres-1";

            break;
        case "lekka":
            bg1 = "text-wykres-2";
            break;
        case "umiarkowana":
            bg1 = "text-wykres-3";
            break;
        case "ciężka":
            bg1 = "text-wykres-4";
            break;
        case "bardzo ciężka":
            bg1 = "text-wykres-5";
            break;

    }

    return (
        <div className="w-full flex h-full  items-center flex-col">
            <IoManOutline className=" h-[130px]  md:h-[20%] w-full   text-niebieski-2   py-6" />
            <div className="flex flex-col  w-full   ">
                <div className="flex w-full justify-center pb-4 text-xl">
                    <p >STOPIEŃ CIĘŻKOŚCI PRACY</p>
                </div>

                <div className="w-full flex-col flex ">
                    <div className="flex flex-col md:flex-row">
                        <div className="  flex  justify-center items-center">
                            <GaugeComponent
                                value={`${sumaWydatkuMin}  `}
                                type="semicircle"
                                maxValue={3500}

                                labels={{
                                    valueLabel:
                                    {
                                        formatTextValue: value => value + ` kcal`, matchColorWithArc: true,
                                        maxDecimalDigits: 1,
                                    },

                                    tickLabels: {
                                        type: "outer",
                                        ticks: [
                                            { value: 300 },
                                            { value: 800 },
                                            { value: 1500 },
                                            { value: 2000 },
                                        ]
                                    }
                                }}
                                arc={{

                                    colorArray: ['#5BE12C', '#EA4228'],
                                    subArcs: [{ limit: 300 }, { limit: 800 }, { limit: 1500 }, { limit: 2000 }, {}],
                                    padding: 0.02,
                                    width: 0.3,

                                }}
                                pointer={{
                                    type: "arrow",
                                    color: " #fff",
                                    length: .3,
                                    elastic: true,
                                    animationDelay: 0
                                }}
                            />
                        </div>


                        <div className=" flex   justify-center items-center">
                            <GaugeComponent
                                value={`${sumaWydatkuMax}  `}
                                type="semicircle"
                                maxValue={3500}

                                labels={{
                                    valueLabel:
                                    {
                                        formatTextValue: value => value + ` kcal`, matchColorWithArc: true,
                                        maxDecimalDigits: 1,
                                    },

                                    tickLabels: {
                                        type: "outer",
                                        ticks: [
                                            { value: 300 },
                                            { value: 800 },
                                            { value: 1500 },
                                            { value: 2000 },
                                        ]
                                    }
                                }}
                                arc={{

                                    colorArray: ['#5BE12C', '#EA4228'],
                                    subArcs: [{ limit: 300 }, { limit: 800 }, { limit: 1500 }, { limit: 2000 }, {}],
                                    padding: 0.02,
                                    width: 0.3,

                                }}
                                pointer={{
                                    type: "arrow",
                                    color: " #fff",
                                    length: .3,
                                    elastic: true,
                                    animationDelay: 0
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex w-full justify-center" >
                        {functionWithSwitchMan1(sumaWydatkuMin) == functionWithSwitchMan2(sumaWydatkuMax) ?
                            <span className={`text-3xl  ${bg}`}  >{functionWithSwitchMan1(sumaWydatkuMin)}</span>
                            :
                            <>
                                <span className={`text-3xl block ${bg}`} >{`${functionWithSwitchMan1(sumaWydatkuMin)} - `}</span>
                                <span className={`text-3xl block ${bg1}`} >{` ${functionWithSwitchMan2(sumaWydatkuMax)}`}</span>

                            </>

                        }
                    </div>
                </div>
            </div>

            <div className="hidden md:flex flex-col pt-8 items-center w-full     ">

                {sumaWydatkuMax > 2000 ?
                    <div className="  flex  w-full">
                        <PiHamburger className={`${sumaWydatkuMax > 1500 ? "text-zielony-1" : "text-szary-5"} p-2 h-[100px] w-1/5        `} />
                        <div className="flex items-center w-3/4 p-2">
                            <p className={` text-lg ${sumaWydatkuMax > 2000 ? "text-zielony-1" : "text-szary-5"}  `}> {sumaWydatkuMax > 2000 ? "obowiązek zapewnienia posiłków profilaktycznych w każdych warunkach" : "nie ma obowiązku zapewnienia posiłków"} </p>
                        </div>
                    </div> :
                    <div className="  flex  items-center   w-full">
                        <PiHamburger className={`${sumaWydatkuMax > 1500 ? "text-zielony-1" : "text-szary-5"} p-2 h-[100px] w-1/5`} />
                        <div className={`flex flex-col items-center   w-3/4 p-2 text-lg ${sumaWydatkuMax > 1500 ? "text-zielony-1" : "text-szary-5"}`} >
                            {sumaWydatkuMax > 1500 ?
                                <>
                                    <p className="self-start">obowiązek zapewnienia posiłków profilaktycznych: </p>
                                    <li>gdy prace wykonywane są w pomieszczeniach zamkniętych, w których temperatura wynosi poniżej 10<sup>o</sup>C lub
                                        <Tooltip
                                            // options arrows
                                            title="wskaźnik obciążenia termicznego"
                                            position="top"
                                            trigger="mouseenter"
                                        >
                                            <span className="px-1">
                                                WBGT
                                            </span>
                                        </Tooltip>
                                        wynosi powyżej 25<sup>o</sup>C,</li>
                                    <li className="pt-2">gdy prace wykonywane są na otwartej przestrzeni w okresie zimowym.</li>
                                </>
                                :
                                <p className={`self-start text-lg ${sumaWydatkuMax > 1500 ? "text-zielony-1" : "text-szary-5"}    `}>nie ma obowiązku zapewnienia posiłków</p>}
                        </div>
                    </div>
                }




                <div className="  flex    w-full">
                    <MdOutlineEmojiFoodBeverage className={`${sumaWydatkuMax > 1500 ? "text-zielony-1" : "text-szary-5"} p-2  h-[100px]   w-1/5        `} />
                    <div className="flex items-center w-3/4 p-2">
                        <p className={` text-lg ${sumaWydatkuMax > 1500 ? "text-zielony-1" : "text-szary-5"}  `}> {sumaWydatkuMax > 1500 ? "obowiązek zapewnienia napojów profilaktycznych " : "nie ma obowiązku zapewnienia napojów"} </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default OcenaWydatkuManKcal;