import { postawa, palce, ramie, caleCialo, dwaRamiona } from "../public/dane"
import Image from 'next/image'

const DaneDoWydatku = ({ setPostawaValue, setPartiaCialaValue, postawaValue, partiaCialaValue, czas, opis, handleClick, onMutate, nazwaCzynnosci, kcal, errors, messages }) => {

    return (
        <>

            <div className="   w-full h-[15%] pb-6">
                <div className="flex justify-between w-3/4 h-1/2">
                    <div className="flex w-1/2 h-full      ">
                        {/* input */}
                        <div className="flex   w-full items-center    ">
                            <div className="flex w-[15vw] items-center   ">
                                <label className={`text-xl font-semibold $  text-niebieski-6 pr-6`}>Nazwa czynności</label>
                            </div>
                            <input
                                type="text"
                                id="nazwaCzynnosci"
                                name="nazwaCzynnosci"
                                value={nazwaCzynnosci}
                                onChange={onMutate}
                                className={`w-1/3 flex   px-4 py-2 transition duration-300 border bg-itemTlo ${errors.nazwaCzynnosci ? " border-error-2" : "border-niebieski-7"} rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1`} 
                            />
                            {errors.nazwaCzynnosci && <span className="self-start pl-2 text-error-2">{messages.nazwaCzynnosci_incorrect}</span>}
                        </div>

                    </div>
                    <div className="flex w-1/2 h-full   ">
                        {/* input */}
                        <div className="flex w-full  items-center      ">
                            <div className="flex w-full items-center   ">
                                <label className={`text-xl font-semibold   text-niebieski-6 }   `}>Czas trwania czynności w min.</label>
                            </div>
                            <input
                                type="number"
                                id="czas"
                                name="czas"
                                value={czas}
                                onChange={onMutate}

                                className={`w-[12vw] px-4 py-2 transition duration-300 border bg-itemTlo ${errors.czas ? "border-error-2" : "border-niebieski-7"}  rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1`}
                            />
                            {errors.czas && <span className="self-start pl-2 text-error-2">{messages.czas_incorrect}</span>}
                            {errors.czas1 && <span className="self-start pl-2 text-error-2">{messages.czas1_incorrect}</span>}
                        </div>

                    </div>
                </div>

                <div className="flex justify-between w-full h-1/2  ">
                    {/* input */}
                    <div className="flex h-full items-center justify-between w-3/4 ">
                        <div className="flex w-[15vw] items-center  ">
                            <label className={`text-xl font-semibold   text-niebieski-6 }  pr-6`}>Opis czynności</label>
                        </div>
                        <input
                            type="text"
                            id="opis"
                            name="opis"
                            value={opis}
                            onChange={onMutate}

                            className="flex flex-1 px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                        />
                       
                    </div>
                    <div className="flex w-[120px]  text-niebieski-10 pr-2  ">
                        <div className=" w-full  h-full   flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-niebieski-10 bg-zielony-1 text-white    cursor-pointer tracking-wider transition duration-300  "
                            onClick={  handleClick } >
                            <h2 className="transition duration-300">Zapisz</h2>
                        </div>
                    </div>
                     

                </div>


            </div>


            <div className={`flex border border-niebieski-6 border-opacity-50  flex-col w-full h-[50%] ${errors.postawaValue ? "bg-error-1" : "bg-niebieski-4 " } rounded-lg `}>
                <div className="flex justify-center items-center bg-niebieski-6  text-white rounded-t-lg   h-[15%] text-2xl w-full ">
                    <h1 className="    ">Pozycja ciała charakterystyczna dla wykonywanej czynności</h1>
                </div>

                <div className='relative flex flex-wrap p-6 content-between  w-full h-[85%] justify-between   '>
                    {errors.postawaValue && <span className=" absolute bottom-0  left-[calc(50%-70px)] text-error-3 font-bold  ">{messages.postawaValue_incorrect}</span>}
                    {postawa.map((item, index) => (

                        <div
                            key={item.id}
                            onClick={() => setPostawaValue(kcal ? item.value : item.valueKcal)}
                            className="flex w-[23.5%] h-[47.5%] flex-col    border border-niebieski-6 border-opacity-50 rounded-lg   p-4  bg-white"

                        >
                            <div className="flex   justify-center items-center w-full h-3/4 relative">
                                {kcal ?
                                    (postawaValue == item.value ?
                                        <div className="flex justify-center items-center  border-4 rounded-full text-zielony-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 text-zielony-1 transition  duration-1500 p-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        :
                                        <div className="relative   w-1/2   h-3/4  ">
                                            <Image
                                                src={item.src}
                                                fill

                                                alt="Picture of the author"
                                                className="cursor-pointer object-contain"
                                            />
                                        </div>
                                    ) :
                                    (postawaValue == item.valueKcal ?
                                        <div className="flex justify-center items-center  border-4 rounded-full text-zielony-1  ">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 text-zielony-1 transition  duration-1500 p-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        :
                                        <Image
                                            src={item.src}
                                            width={60}
                                            height={60}
                                            alt="Picture of the author"
                                            className="cursor-pointer"
                                        />)
                                }

                            </div>
                            {kcal ?

                                <div
                                    className={
                                        postawaValue == item.value
                                            ? "text-center   text-zielony-1 outline-none text-xl   font-semibold    "
                                            : " text-center  bg-white text-textMenu outline-none  text-xl      hover:text-zielony-1  transition  duration-500 cursor-pointer   font-semibold "
                                    }>
                                    <h1 className="text-center font-bold text-2xl text-niebieski-8">{item.text}</h1>
                                </div> :
                                <div
                                    className={
                                        postawaValue == item.valueKcal
                                            ? "text-center   text-zielony-1 outline-none text-xl   font-semibold    "
                                            : " text-center  bg-white text-textMenu outline-none  text-xl      hover:text-zielony-1  transition  duration-500 cursor-pointer   font-semibold "
                                    }>
                                    <h1 className="text-center font-bold text-2xl text-niebieski-8">{item.text}</h1>
                                </div>}


                        </div>

                    ))}

                </div>
            </div>

            {/*  */}
            <div className={`flex border border-niebieski-6 border-opacity-50  flex-col w-full h-[35%]  ${errors.partiaCialaValue ? " bg-error-1" : "bg-niebieski-4 " } rounded-lg mt-4`} >
                <div className="flex justify-center items-center bg-niebieski-6 bg-opacity-25 text-niebieski-8  rounded-t-lg   h-[20%] text-2xl w-full ">
                    <h1 className="   ">Partie ciała, które wykonują czynność</h1>
                </div>

                <div className='flex flex-wrap  h-[80%]  p-6  w-full justify-between   '>
                    <div className="flex   items-center w-[23.5%] flex-col border border-niebieski-6 border-opacity-50 rounded-lg    bg-white">
                        <div className="flex justify-center items-center rounded-t-lg   h-[25%] w-full  bg-zielony-1 bg-opacity-40">
                            <h1 className="text-lg  text-niebieski-10 font-bold  ">palce, ręce, przedramiona</h1>
                        </div>

                        <div className="flex h-[75%] justify-center w-full p-4 ">
                            <div className="flex items-center w-1/2   ">
                                <p className="text-lg">cieżkość pracy</p>
                            </div>
                            <div className="w-1/2 flex items-center justify-center flex-col  ">
                                {palce.map((item) => (
                                    <div className="flex w-full   items-center "
                                        key={item.id}>

                                        <div

                                            onClick={() => setPartiaCialaValue(item.value)}
                                            className={
                                                partiaCialaValue == item.value
                                                    ? " text-zielony-1 outline-none text-2xl  font-semibold    "
                                                    : "text-textMenu outline-none  text-xl      hover:text-zielony-1  transition  duration-500 cursor-pointer     font-semibold "
                                            }
                                        >
                                            <p className="pl-2"> {item.text}</p>


                                        </div>
                                        <div className="flex pl-2  justify-center items-center h-3/4">
                                            {
                                                partiaCialaValue == item.value ?
                                                    <div className="flex      border-2 rounded-full text-zielony-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zielony-1 transition  duration-1500  p-1  ">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                        </svg>
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>


                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="flex w-[23.5%] flex-col border border-niebieski-6 rounded-lg   p-4  bg-white">
                        <h1>jedno ramię</h1>
                        {ramie.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setPartiaCialaValue(item.value)}
                                className={
                                    partiaCialaValue == item.value
                                        ? " text-zielony-1 outline-none text-xl hover:text-textMenu font-semibold  mr-4 "
                                        : "text-textMenu outline-none  text-xl      hover:text-zielony-1  transition  duration-500 cursor-pointer mr-4   font-semibold "
                                }
                            >{item.text}</div>
                        ))}
                    </div>
                    <div className="flex w-[23.5%] flex-col border border-niebieski-6 rounded-lg   p-4  bg-white">
                        <h1>dwa ramiona</h1>
                        {dwaRamiona.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setPartiaCialaValue(item.value)}
                                className={
                                    partiaCialaValue == item.value
                                        ? " text-zielony-1 outline-none text-xl hover:text-textMenu font-semibold  mr-4 "
                                        : "text-textMenu outline-none  text-xl      hover:text-zielony-1  transition  duration-500 cursor-pointer mr-4   font-semibold "
                                }
                            >{item.text}</div>
                        ))}

                    </div>
                    <div className="flex w-[23.5%] flex-col border border-niebieski-6 rounded-lg   p-4  bg-white">
                        <h1>całe ciało</h1>
                        {caleCialo.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setPartiaCialaValue(item.value)}
                                className={
                                    partiaCialaValue == item.value
                                        ? " text-zielony-1 outline-none text-xl hover:text-textMenu font-semibold  mr-4 "
                                        : "text-textMenu outline-none  text-xl      hover:text-zielony-1  transition  duration-500 cursor-pointer mr-4   font-semibold "
                                }
                            >{item.text}</div>
                        ))}

                    </div>
                    {errors.partiaCialaValue && <span className=" absolute   bottom-2  left-[calc(50%-70px)] text-error-3 font-bold  ">{messages.partiaCialaValue_incorrect}</span>}
                </div>
            </div>

        </>
    )
}
export default DaneDoWydatku