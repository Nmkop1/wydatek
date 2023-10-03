import { PiHamburger } from "react-icons/pi";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import { IoWomanOutline } from "react-icons/io5"
import dynamic from "next/dynamic";
import 'react-tippy/dist/tippy.css'
import {
    Tooltip,
} from 'react-tippy';
import { useRouter } from 'next/navigation'

function OcenaWydatkuWomenKcal({ sumaWydatkuMin, sumaWydatkuMax, openDrukuj, setOpenDrukuj }) {
    const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });
    const between = (x, min, max) => {
        return x >= min && x <= max;
    };
    const wydatekMinKobiety = sumaWydatkuMin * .8
    const wydatekMaxKobiety = sumaWydatkuMax * .8
    const router = useRouter()
    let bg = ""
    let bg1 = ""
    const functionWithSwitchWomen1 = (parameter) => {

        switch (true) {
            case (between(parameter, 1, 199)):
                return "bardzo lekka"

            case (between(parameter, 200, 699)):
                return "lekka"

            case (between(parameter, 700, 999)):
                return "umiarkowana"

            case (between(parameter, 1000, 1199)):
                return "ciężka"

            case (parameter > 1200):
                return "bardzo ciężka"

            default:
                return <h3 className=" text-base font-bold text-zielony-3">
                    zero
                </h3>
        }
    }
    const functionWithSwitchWomen2 = (parameter) => {

        switch (true) {
            case (between(parameter, 1, 199)):
                return "bardzo lekka"

            case (between(parameter, 200, 699)):
                return "lekka"

            case (between(parameter, 700, 999)):
                return "umiarkowana"

            case (between(parameter, 1000, 1199)):
                return "ciężka"

            case (parameter > 1200):
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
        <div className="w-full flex  h-full relative  items-center flex-col">
            <div className="text-white text-3xl absolute top-0 right-0 cursor-pointer  w-6 h-6 flex justify-center">
                <Tooltip
                    // options arrows
                    title="Wydatek energetyczny dla kobiet pomniejszony jest o współczynnik korygujący, który wynosi 0,8"
                    position="bottom"
                    trigger="mouseenter"
                >
                    <h1 >*</h1>
                </Tooltip>
            </div>


            <div className="flex justify-center h-[130px]   md:h-[20%] w-full">
                <IoWomanOutline className=" w-[20%] h-full      text-niebieski-2   pb-6" />
            </div>
            <div className="flex flex-col  w-full  h-[80%]   ">
                <div className="flex w-full justify-center pb-4 text-xl">
                    <p >STOPIEŃ CIĘŻKOŚCI PRACY</p>
                </div>

                <div className="w-full flex-col flex ">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 flex  justify-center items-center">
                            <GaugeComponent
                                value={`${wydatekMinKobiety}  `}
                                type="semicircle"
                                maxValue={3000}

                                labels={{
                                    valueLabel:
                                    {
                                        formatTextValue: value => value + ` kcal`, matchColorWithArc: true,
                                        maxDecimalDigits: 1,
                                    },

                                    tickLabels: {

                                        type: "outer",

                                        ticks: [
                                            { value: 200 },
                                            { value: 700 },
                                            { value: 1000 },
                                            { value: 1200 },

                                        ]
                                    }
                                }}
                                arc={{

                                    colorArray: ['#5BE12C', '#EA4228'],
                                    subArcs: [{ limit: 200 }, { limit: 700 }, { limit: 1000 }, { limit: 1200 }, {}],
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
                                maxValue={3000}

                                labels={{
                                    valueLabel:
                                        { formatTextValue: value => value + ` kcal`, matchColorWithArc: true, maxDecimalDigits: 1, },

                                    tickLabels: {

                                        type: "outer",

                                        ticks: [
                                            { value: 200 },
                                            { value: 700 },
                                            { value: 1000 },
                                            { value: 1200 },

                                        ]
                                    }
                                }}
                                arc={{

                                    colorArray: ['#5BE12C', '#EA4228'],
                                    subArcs: [{ limit: 200 }, { limit: 700 }, { limit: 1000 }, { limit: 1200 }, {}],
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
                <div className="hidden md:flex flex-col pt-8 items-center w-full h-1/2   ">

                    {wydatekMaxKobiety > 4605 ?
                        <div className="   flex  w-full">
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
                    <div className="  flex     w-full">
                        <MdOutlineEmojiFoodBeverage className={`${wydatekMaxKobiety > 4187 ? "text-zielony-1" : "text-szary-5"} p-2  h-[100px]   w-1/5        `} />
                        <div className="flex items-center w-3/4 p-2">
                            <p className={` text-lg ${wydatekMaxKobiety > 4187 ? "text-zielony-1" : "text-szary-5"}  `}> {wydatekMaxKobiety > 4187 ? "obowiązek zapewnienia napojów profilaktycznych " : "nie ma obowiązku zapewnienia napojów"} </p>
                        </div>
                    </div>
                </div>


            </div>
            <button className={`outline-none absolute -bottom-2 -right-3 md:bottom-2  md:right-2 w-16 h-16   rounded-full flex justify-center items-center hover:bg-niebieski-10 bg-zielony-1 text-niebieski-6  hover:text-white hover:border    cursor-pointer tracking-wider transition duration-300  `} onClick={() => router.push('/wydruk')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
            </button>
        </div>
    );
}

export default OcenaWydatkuWomenKcal;
