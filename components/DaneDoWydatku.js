import { postawa, palce, ramie, caleCialo, dwaRamiona } from "../public/dane"
import Image from 'next/image'
const DaneDoWydatku = ({ setPostawaValue, setPartiaCialaValue, postawaValue, partiaCialaValue, czas, handleClick, onMutate, nazwaCzynnosci }) => {




    return (
        <>
            <div className=" ">
                <div className=" border-gray-900/10 pb-6">
                    <div className="flex ">
                        <div className="w-1/2">
                            {/* input */}
                            <div className="flex pb-4 justify-between w-3/4  ">
                                <div className="flex items-center  ">
                                    <label className={`text-xl font-semibold $  text-niebieski-6   pr-6`}>Nazwa czynności</label>
                                </div>
                                <input
                                    type="text"
                                    id="nazwaCzynnosci"
                                    name="nazwaCzynnosci"
                                    value={nazwaCzynnosci}
                                    onChange={onMutate}
                                    className="px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                />
                            </div>
                            {/* input */}
                            <div className="flex pb-4 justify-between w-3/4  ">
                                <div className="flex items-center  ">
                                    <label className={`text-xl font-semibold   text-niebieski-6 }  pr-6`}>Czas</label>
                                </div>
                                <input
                                    type="number"
                                    id="czas"
                                    name="czas"
                                    value={czas}
                                    onChange={onMutate}
                                    className="px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                />
                            </div>

                        </div>
                        <div className="w-1/2">
                            <button className="mt-6 p-6 border " onClick={handleClick} >zapisz</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full p-6 bg-niebieski-4 rounded-lg ">

                <h1 className="pb-6 text-2xl">Pozycja ciała charakterystyczna dla wykonywanej czynności</h1>
                <div className='flex flex-wrap gap-4   w-full justify-between   '>

                    {postawa.map((item, index) => (

                        <div
                            key={item.id}
                            onClick={() => setPostawaValue(item.value)}
                            className="flex w-[23.5%] flex-col h-[160px] border border-niebieski-6 rounded-lg   p-4  bg-white"

                        >
                            <div className="flex   justify-center items-center w-full h-3/4 relative">
                                {
                                    postawaValue == item.value ?
                                        <div className="flex justify-center items-center  border-4 rounded-full text-zielony-1">
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
                                        />
                                }

                            </div>
                            <div
                                className={
                                    postawaValue == item.value
                                        ? "text-center   text-zielony-1 outline-none text-xl   font-semibold    "
                                        : " text-center  bg-white text-textMenu outline-none  text-xl      hover:text-zielony-1  transition  duration-500 cursor-pointer   font-semibold "
                                }>
                                <h1 className="text-center font-bold text-2xl text-niebieski-8">{item.text}</h1>
                            </div>


                        </div>

                    ))}
                </div>
            </div>
            <div className="flex flex-col w-full p-6 bg-niebieski-4 rounded-lg mt-4 ">

                <h1 className="pb-6 text-2xl">Partie ciała, które wykonują czynność</h1>
                <div className='flex flex-wrap     w-full justify-between   '>
                    <div className="flex   w-[23.5%] flex-col border border-niebieski-6 rounded-lg   p-4  bg-white">
                        <h1>palce, ręce, przedramiona</h1>
                        <div className="flex min-w-full">
                        <div className="flex items-center w-1/2   ">
                            <p>cieżkość pracy</p>
                        </div>
                        <div className="w-1/2   ">
                            {palce.map((item) => (
                                <div className="flex    w-full  "
                                    key={item.id}>
                                    <div className="flex  justify-center items-center h-3/4">
                                        {
                                            partiaCialaValue == item.value ?
                                                <div className="flex      border-2 rounded-full text-zielony-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-zielony-1 transition  duration-1500 p-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                    <div

                                        onClick={() => setPartiaCialaValue(item.value)}
                                        className={
                                            partiaCialaValue == item.value
                                                ? " text-zielony-1 outline-none text-xl hover:text-textMenu font-semibold    "
                                                : "text-textMenu outline-none  text-xl      hover:text-zielony-1  transition  duration-500 cursor-pointer     font-semibold "
                                        }
                                    >
<p className="pl-2"> {item.text}</p>
                                       

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
                </div>
            </div>

        </>
    )
}
export default DaneDoWydatku