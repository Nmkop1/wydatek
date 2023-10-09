
import SectionText from "../components/SectionText"
// import { motion } from 'framer-motion';
// import { fadeIn, textVariant, staggerContainer } from '../components/motion';
// const services = [
//   {
//     title: 'Frontend Developer',

//   },
//   {
//     title: 'Backend Developer',

//   },
//   {
//     title: 'UI/UX Design',

//   },
//   {
//     title: 'Software Prototyping',

//   },
// ];
// const ServiceCard = ({ index, title, icon }) => {
//   return (
//     <motion.div
//       variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
//       className={`relative  lg:flex-[3.5] flex-[10] `}
//     >
//       <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">
//         Enter Metaverse
//       </p>
//       <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">
//         {title}
//       </h2>
//     </motion.div>
//   );
// };
function Page() {

  return (
    <>
      <div className='flex flex-col md:flex-row items-center justify-center  w-full h-[calc(100vh_-_92px)] p-6 md:p-32 bg-niebieski-7   '>

        <div className='flex flex-col w-2/3 items-start    '>
          <h1 className='text-white text-3xl md:text-7xl font-bold pb-2   '>Kalkulatory  do</h1>
          <h2 className='text-zielony-1 text-6xl md:text-8xl font-bold'> pracy </h2>
          <p className='text-white text-xl w-full md:w-1/2 pt-20 leading-9'> Pracuj zgodnie z przepisami, a my policzymy wydatek energetyczny i nie tylko za Ciebie. </p>

        </div>
        <div className='hidden w-1/3 md:flex items-center text-zielony-1    '>
        
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-96 h-96">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <h2 className="absolute bottom-2 right-3">1.0.0</h2>

        </div>

      </div>


      {/* <div className="  w-full h-screen bg-red-300">


        <section id="explore">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`w-full mx-auto flex flex-col`}
          >

            <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
              {services.map((service, index) => (
                <ServiceCard key={service.title} index={index} title={service.title} />
              ))}
            </div>
          </motion.div>
        </section>


      </div> */}










{/* 

      <SectionText opis={
        <>
          <h1>Wydatek energetyczny</h1>
          <h2 id='Podstawa wynagrodzenia'>Pojęcie</h2>
          <h4>Pod pojęciem wydatku energetycznego rozumiemy ilość energii produkowanej przez organizm podczas wykonywania pracy fizycznej. Wielkość wydatkowanej energii podawana jest w jednostkach pracy: kcal/min lub kJ/min.</h4>


          <h2 id="Współczynnik urlopowy">Metody pomiarowe</h2>
          <h4>Istnieje wiele metod pomiaru wydatku energetycznego. Metody te są bardzo zróżnicowane, począwszy od najprostszych: chronometrażowo-tabelarycznych, skończywszy na bardziej skomplikowanych i kosztownych – metodach kalorymetrii pośredniej lub bezpośredniej, wymagających specjalistycznej aparatury.</h4>

          <h2 id="Część etatu">Pomiar wydatku energetycznego metodą Lehmanna</h2>
          <h4>Jedną z najprostszych jest metoda chronometrażowo-tabelaryczna wg. Lehmanna, o którą oparto wyliczenie wydatku energetycznego na naszej stronie. Metoda ta polega na przeprowadzeniu "fotografii dnia pracy" pracownika, tj. sporządzenia zestawienia wszystkich czynności wykonanych przez pracownika w ciągu zmiany roboczej, z uwzględnieniem  zajmowanej podczas pracy pozycji ciała oraz rodzaju wykorzystywanych przy wysiłku grup mięśniowych. Po zsumowaniu wszystkich wartości, w całym cyklu roboczym, uzyskujemy wynik (kJ/8h lub kcal/8h), tj. koszt energetyczny wyrażający pracę mechaniczną w trakcie zmiany roboczej.</h4>
          <h4>Z uwagi na mniejszą masę mięśniową kobiet w stosunku do mężczyzn, ich wydatek energetyczny związany z obciążeniem fizycznym pracą jest również mniejszy o ok. 20%, zatem należy przyjąć pewien współczynnik korygujący, który wynosi 0,8  [G. Lehmann - Praktyczna fizjologia pracy. PZWL, Warszawa 1966]</h4>
          <h4>Wyliczenia naszego kalkulatora odnoszą się do pracy wykonywanej w warunkach umiarkowanego środowiska termicznego. W przypadku środowiska gorącego wydatek energetyczny jest wyższy o ok. 12 %, a środowiska zimnego – 10 %.</h4>
          <h2 id="Wymiar czasu pracy">Zalety i wady metody Lehmanna</h2>
          <h4>Zaletą metody jest szybkość i łatwość jej stosowania. Wykonując ocenę wydatku nie zakłócamy przebiegu pracy pracowników. Metoda obarczona jest jednak pewnym błędem pomiarowym, możliwym jednak do zaakceptowania na etapie praktycznego szacowania wydatku energetycznego. Metoda ta nie uwzględnia także warunków środowiska pracy, takich jak temperatura i wilgotność powietrza.</h4>


          <h2 id="Norma czasu pracy">Zgodność z przepisami</h2>
          <h4>Obowiązujące przepisy prawa nie regulują kto i jaką metodą powinien przeprowadzić ocenę wydatku energetycznego.</h4>
          <h4>Dopełniliśmy wszelkich starań aby wyliczenia kalkulatora wydatku były zgodne z założeniami metody G.Lehmanna.</h4>
          <h4 style={{ color: "#C62828" }}> Nie ponosimy odpowiedzialności za poprawność wyników oraz prawidłowość identyfikacji czynności i czasu wykonywania tych czynności na ocenianych stanowiskach pracy.</h4>

          <h2 id="Wymiar czasu pracy">Kalkulator technicznie</h2>
          <h4>Kalkulator wydatku energetycznego jest w pełni responsywny, tj. prawidłowo wyświetlają się na komputerach, tabletach i smartfonach i automatycznie dostosowując się do urządzeń na których są wyświetlane. Kalkulator napisane są w oparciu o framework Next.JS i bibliotekę React, co zapewnia bardzo szybkie jego działanie.</h4>
          <h4>
            Kalkulator prawidłowo wyświetlają się w najnowszych przeglądarkach: Chrome, Edge, Opera, Firefox. Pewne problemy mogą wystąpić w starszych przeglądarkach Internet Explorer, w związku z tym nie zalecamy używania tej przeglądarki do wyświetlania kalkulatorów urlopowych.
          </h4>
        </>
      }
      /> */}
    </>
  );
}

export default Page; 
