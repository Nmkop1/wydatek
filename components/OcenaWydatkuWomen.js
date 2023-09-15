import { PiHamburger } from "react-icons/pi";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import { IoWomanOutline, IoManOutline } from "react-icons/io5"
import dynamic from "next/dynamic";
import 'react-tippy/dist/tippy.css'
import {
    Tooltip,
} from 'react-tippy'; 

function OcenaWydatkuWomen({ sumaWydatkuMin, sumaWydatkuMax, openDrukuj, setOpenDrukuj }) {
    const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });
    const between = (x, min, max) => {
        return x >= min && x <= max;
    };
    const wydatekMinKobiety = sumaWydatkuMin * .8
    const wydatekMaxKobiety = sumaWydatkuMax * .8

    let bg = ""
    let bg1 = ""
    const functionWithSwitchWomen1 = (parameter) => {

        switch (true) {
            case (between(parameter, 1, 836)):
                return "bardzo lekka"

            case (between(parameter, 837, 2929)):
                return "lekka"

            case (between(parameter, 2930, 4186)):
                return "umiarkowana"

            case (between(parameter, 4187, 5024)):
                return "ciężka"

            case (parameter > 5024):
                return "bardzo ciężka"

            default:
                return <h3 className=" text-base font-bold text-zielony-3">
                    zero
                </h3>
        }
    }
    const functionWithSwitchWomen2 = (parameter) => {

        switch (true) {
            case (between(parameter, 1, 836)):
                return "bardzo lekka"

            case (between(parameter, 837, 2929)):
                return "lekka"

            case (between(parameter, 2930, 4186)):
                return "umiarkowana"

            case (between(parameter, 4187, 5024)):
                return "ciężka"

            case (parameter > 5024):
                return "bardzo ciężka"

            default:
                return <h3 className=" text-base font-bold text-zielony-3">
                    zero
                </h3>
        }
    }

    switch (functionWithSwitchWomen1(wydatekMinKobiety)) {
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
    switch (functionWithSwitchWomen1(wydatekMaxKobiety)) {
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
        <div className="w-full flex  h-full items-center flex-col">
            <IoWomanOutline className="h-[130px]  md:h-[20%] w-full   text-niebieski-2   py-6" />
            <div className="flex flex-col  w-full    ">
                <div className="flex w-full justify-center pb-4 text-xl">
                    <p >STOPIEŃ CIĘŻKOŚCI PRACY</p>
                </div>

                <div className="w-full flex-col flex ">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 flex  justify-center items-center">
                            <GaugeComponent
                                value={`${wydatekMinKobiety}  `}
                                type="semicircle"
                                maxValue={7000}

                                labels={{
                                    valueLabel:
                                    {
                                        formatTextValue: value => value + ` kJ`, matchColorWithArc: true,
                                        maxDecimalDigits: 1,
                                    },

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


                        <div className="w-full md:w-1/2 flex   justify-center items-center">
                            <GaugeComponent
                                value={`${wydatekMaxKobiety}  `}
                                type="semicircle"
                                maxValue={7000}

                                labels={{
                                    valueLabel:
                                        { formatTextValue: value => value + ` kJ`, matchColorWithArc: true, maxDecimalDigits: 1, },

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
                        </div>
                    </div>


                    <div className="flex w-full justify-center" >
                        {functionWithSwitchWomen1(wydatekMinKobiety) == functionWithSwitchWomen2(wydatekMaxKobiety) ?
                            <span className={`text-3xl  ${bg}`}  >{functionWithSwitchWomen1(wydatekMinKobiety)}</span>
                            :
                            <>
                                <span className={`text-3xl block ${bg}`} >{`${functionWithSwitchWomen1(wydatekMinKobiety)} - `}</span>
                                <span className={`text-3xl block ${bg1}`} >{` ${functionWithSwitchWomen2(wydatekMaxKobiety)}`}</span>

                            </>

                        }
                    </div>
                </div>



            </div>

            <div className="hidden md:flex flex-col pt-8 items-center w-full h-1/2   ">

                {wydatekMaxKobiety > 4605 ?
                    <div className="  flex  w-full">
                        <PiHamburger className={`${wydatekMaxKobiety > 4187 ? "text-zielony-1" : "text-szary-5"} p-2 h-[100px]   w-1/5        `} />
                        <div className="flex items-center w-3/4 p-2">
                            <p className={` text-lg ${wydatekMaxKobiety > 4605 ? "text-zielony-1" : "text-szary-5"}  `}> {wydatekMaxKobiety > 4605 ? "obowiązek zapewnienia posiłków profilaktycznych w każdych warunkach" : "nie ma obowiązku zapewnienia"} </p>
                        </div>
                    </div> :
                    <div className="  flex  items-center   w-full">
                        <PiHamburger className={`${wydatekMaxKobiety > 4187 ? "text-zielony-1" : "text-szary-5"} p-2 h-[100px]    w-1/5`} />
                        <div className={`flex flex-col items-center    w-3/4 p-2 text-lg ${wydatekMaxKobiety > 4187 ? "text-zielony-1" : "text-szary-5"}`} >
                            {wydatekMaxKobiety > 4187 ?
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
                                <p className={`self-start text-lg ${wydatekMaxKobiety > 4187 ? "text-zielony-1" : "text-szary-5"}    `}>nie ma obowiązku zapewnienia posiłków</p>}
                        </div>
                    </div>
                }
                <div className="  flex    w-full">
                    <MdOutlineEmojiFoodBeverage className={`${wydatekMaxKobiety > 4187 ? "text-zielony-1" : "text-szary-5"} p-2  h-[100px]   w-1/5        `} />
                    <div className="flex items-center w-3/4 p-2">
                        <p className={` text-lg ${wydatekMaxKobiety > 4187 ? "text-zielony-1" : "text-szary-5"}  `}> {wydatekMaxKobiety > 4187 ? "obowiązek zapewnienia napojów profilaktycznych " : "nie ma obowiązku zapewnienia napojów"} </p>
                    </div>
                </div>
            </div>
            <button onClick={() => setOpenDrukuj(!openDrukuj)}>drukuj</button>
        </div>
    );
}

export default OcenaWydatkuWomen;