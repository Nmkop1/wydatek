import { postawa, palce, ramie, caleCialo, dwaRamiona } from "../public/dane"
import Image from 'next/image'
const DaneDoWydatku = ({ setCzas, setPostawaValue, setPartiaCialaValue, postawaValue, partiaCialaValue, handleClick }) => {

    const handleChange = e => setCzas(e.target.value);


    return (
        <>

            <div className="space-y-12">
                <div className=" border-gray-900/10 pb-12">
                    <div className="flex ">
                        <div className="w-1/2">
                            <div className="flex ">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Nazwa czynnosci
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="nazwa"
                                            id="nazwa"
                                            autoComplete="nazwa"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Czas trwania czynności
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="number"
                                            onChange={handleChange}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>
                                <h1>min</h1>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="flex">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Opis
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="opis"
                                        name="opis"
                                        rows={2}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
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
                            className="flex w-[23.5%] flex-col border border-niebieski-6 rounded-lg   p-4  bg-white"
                        // className={
                        //     postawaValue == item.value
                        //         ? "flex  flex-col border border-niebieski-6 rounded-lg w-[23%] h-44 bg-white text-zielony-1 outline-none text-xl hover:text-textMenu font-semibold    "
                        //         : " flex  flex-col border border-niebieski-6 rounded-lg w-[23%] h-44 bg-white text-textMenu outline-none  text-xl      hover:text-zielony-1  transition  duration-500 cursor-pointer   font-semibold "
                        // }
                        >
                            <div className="flex   justify-center items-center w-full h-3/4 relative">
                                {
                                    postawaValue == item.value ?
                                        <div className="flex justify-center items-center  border-4 rounded-full text-zielony-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-zielony-1 transition  duration-1500 p-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>


                                        :
                                        <Image
                                            src={item.src}
                                            width={60}
                                            height={60}
                                            alt="Picture of the author"

                                        />
                                }

                            </div>
                            <div className="flex justify-center items-center w-full h-1/3  ">
                                <h1 className="font-bold text-2xl text-niebieski-8">{item.text}</h1>
                            </div>


                        </div>

                    ))}
                </div>
            </div>
            <div className="flex flex-col w-full p-6 bg-niebieski-4 rounded-lg mt-4 ">

                <h1 className="pb-6 text-2xl">Partie ciała, które wykonują czynność</h1>
                <div className='flex flex-wrap     w-full justify-between   '>
                    <div className="flex   w-[23.5%] flex-col border border-niebieski-6 rounded-lg   p-4  bg-white">
                        <h1>Palce</h1>
                        {palce.map((item) => (
                            <div className="flex   w-full  " 
                            key={item.id}>
                        <div className="flex   justify-center items-center   h-3/4">
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

                                    {item.text}

                                </div>

                            </div>


                        ))}

                    </div>
                    {/* <div className="flex w-[23.5%] flex-col border border-niebieski-6 rounded-lg   p-4  bg-white">
                        <h1>Ramię</h1>
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
                        <h1>Dwa ramiona</h1>
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
                        <h1>Ciało</h1>
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

                    </div> */}
                </div>
            </div>
            <button className="mt-6 p-6 border " onClick={handleClick} >zapisz</button>
        </>
    )
}
export default DaneDoWydatku