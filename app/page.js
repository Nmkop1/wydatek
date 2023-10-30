"use client"
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion';
import { fadeIn, textVariant, staggerContainer } from '../components/motion';
import Image from 'next/image'

const dane = [
  {
    imgUrl: "/power2.png",
    title: "Kalkulator wydatku energetycznego",
    titleImg: "Wydatek energetyczny",
    routers: "/wydatek",
    subtitle:
      "W kilku krokach obliczysz wydatek energetyczny związany z wykonywaną pracą na wybranym stanowisku pracy. Pomiar wydatku energetycznego przeprowadzony jest w oparciu o prostą metodę Lehmanna.",
  },
  {
    imgUrl: "/wymiar1.png",
    title: "Kalkulator wymiaru urlopu",
    titleImg: "Wymiar urlopu",
    routers: "/wymiar",
    subtitle:
      "Za pomocą naszego kalkulatora wymiaru urlopu w łatwy sposób obliczysz urlop za wyznaczony okres. Wynik otrzymasz w dniach lub godzinach. Dodatkowo kalkulator uwzględnia szczególne przepisy dotyczące urlopu osób niepełnosprawnych i urlopu za pierwszą pracę pracownika.",
  },

];
const textVariant2 = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeIn',
    },
  },
}; 
const NaszeKalkulatoryCard = ({ imgUrl, title, subtitle, index, titleImg, routers }) => {
const router = useRouter()
  return (

    <motion.div
      variants={fadeIn('up', 'spring', index * 0.5, 1)}
      className="flex md:flex-row flex-col      "
    >
      <div className={`  bg-niebieski-6 w-full md:w-[300px]  h-[300px]   rounded-lg flex items-center flex-col justify-center`} >

        <div className="relative   w-1/2   h-[60%]  ">
          <Image
            src={imgUrl}
            fill
            alt={title}
            onClick={() => router.push(`${routers}`)}
            className="cursor-pointer object-contain py-4"
          />
        </div>
        <h2 className="  text-xl  tracking-wider   text-white">
          {titleImg}
        </h2>
      </div>
      <div className=" md:w-[calc(100%_-_300px)]    flex justify-between items-center">
        <div className="flex-1 md:ml-[62px] flex flex-col  py-6">
          <h4 className="font-normal lg:text-[42px] text-[26px] text-niebieski-9  ">
            {title}
          </h4>
          <p className="mt-[16px] font-normal lg:text-[20px] text-[14px] text-niebieski-6">
            {subtitle}

          </p>

        </div>


      </div>
    </motion.div>
  );
}



function Page() {

  return (
    <>
      <section className='flex flex-col md:flex-row items-center justify-center    h-[calc(100vh_-_85px)]  w-full p-6 md:p-32 bg-niebieski-7'>
        <div className='flex flex-col  md:w-2/3 items-start'>
          <h1 className='text-white text-3xl md:text-7xl font-bold pb-2   '>Kalkulatory  do</h1>
          <h2 className='text-zielony-1 text-6xl md:text-8xl font-bold'> pracy </h2>
          <p className='text-white text-xl w-full md:w-[60%] pt-16 leading-9'>Pracuj zgodnie z przepisami, a my pomożemy Ci w tym wyliczając wydatek energetyczny i urlop wypoczynkowy.</p>
        </div>
        <div className='hidden w-1/3 md:flex items-center text-zielony-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-96 h-96">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <h2 className="absolute bottom-2 right-3">1.0.3</h2>
        </div>
      </section>

      <section className=" overflow-hidden w-full    ">
        <div className={`sm:p-16 xs:p-8 px-6 py-12 relative z-10  `}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`2xl:max-w-[1280px] w-full mx-auto flex flex-col `}
          >
            <div className='flex   md:ml-[300px] justify-center'>
                <motion.h2
              variants={textVariant2}
              initial="hidden"
              whileInView="show"
              className={`mt-[8px]      font-bold md:text-[64px] text-[40px] text-zielony-1  `}
            >
              {<>Nasze kalkulatory</>}
            </motion.h2>
            </div>
          

            <div className="mt-[50px] flex flex-col gap-[30px]">
              {dane.map((item, index) => (
                < NaszeKalkulatoryCard key={`insight-${index}`} {...item} index={index + 1} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
{/* 
<section>

        <h2 id="Wymiar czasu pracy" className="h2Text">Kalkulator technicznie</h2>
        <h4 className="h4Text">Kalkulator wydatku energetycznego jest w pełni responsywny, tj. prawidłowo wyświetlają się na komputerach, tabletach i smartfonach i automatycznie dostosowując się do urządzeń na których są wyświetlane. Kalkulator napisane są w oparciu o framework Next.JS i bibliotekę React, co zapewnia bardzo szybkie jego działanie.</h4>
        <h4 className="h4Text">
          Kalkulator prawidłowo wyświetlają się w najnowszych przeglądarkach: Chrome, Edge, Opera, Firefox. Pewne problemy mogą wystąpić w starszych przeglądarkach Internet Explorer, w związku z tym nie zalecamy używania tej przeglądarki do wyświetlania kalkulatorów urlopowych.
        </h4>
</section> */}



    </>
  );
}

export default Page; 
