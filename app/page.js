import SectionText from "../components/SectionText"

function Page() {

  return (
    <>
      <div className='flex flex-col md:flex-row items-center justify-center  w-full h-[calc(100vh_-_92px)] p-6 md:p-32 bg-niebieski-7'>
        <div className='flex flex-col     '>
          <h1 className='text-white text-3xl md:text-7xl font-bold pb-3'>Lorem Ipsum is  </h1>
          <h2 className='text-zielony-1 text-5xl md:text-8xl font-bold'>It has survived  </h2>
          <p className='text-white text-xl w-full md:w-1/2 pt-20 leading-9'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>

        </div>
        <div className='hidden md:flex items-center text-zielony-1  '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-96 h-96">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <h2>1.0.0</h2>

        </div>

      </div>
      <SectionText opis={
        <>
          <h1>Kalkulator ekwiwalentu urlopowego</h1>
          <h2 id='Podstawa wynagrodzenia'>Podstawa wynagrodzenia</h2>
          <h4>Obliczając ekwiwalent za niewykorzystany urlop należy brać pod uwagę:</h4>
          <li>wynagrodzenie zasadnicze w wysokości należnej za miesiąc, w którym pracownik nabył prawo do ekwiwalentu za niewykorzystany urlop wypoczynkowy, </li>
          <li>wynagrodzenie zmienne wypłacane za okresy jednomiesięczne lub krótsze, obliczone z 3 miesięcy poprzedzających miesiąc nabycia prawa do ekwiwalentu,</li>
          <li>wynagrodzenie zmienne  przysługujące za okresy dłuższe niż jeden miesiąc, wypłacone w okresie 12 miesięcy poprzedzających miesiąc, w którym pracownik nabył prawo do ekwiwalentu.</li>

          <h2 id="Współczynnik urlopowy">Współczynnik urlopowy</h2>
          <h4>Współczynnik urlopowy, który stanowi podstawę do obliczenia ekwiwalentu za jeden dzień urlopu oblicza się dla każdego roku osobno, odejmując od liczby dni w danym roku kalendarzowym łączną liczbę przypadających w tym roku niedziel i świąt oraz dni wolnych od pracy wynikających z rozkładu czasu pracy w przeciętnie pięciodniowym tygodniu pracy, a otrzymany wynik dzieli się przez 12.</h4>

          <h2 id="Część etatu">Część etatu</h2>
          <h4>W przypadku gdy pracownik jest zatrudniony w niepełnym wymiarze etatu wartość współczynnika urlopowego obniża się proporcjonalnie do wymiaru czasu pracy.</h4>

          <h2 id="Wymiar czasu pracy">Wymiar czasu pracy</h2>
          <h4>Urlopu udziela się w dni, które są dla pracownika dniami pracy, zgodnie z obowiązującym go rozkładem czasu pracy, w wymiarze godzinowym, odpowiadającym dobowemu wymiarowi czasu pracy pracownika w danym dniu.</h4>
          <h4> Dobowy wymiar czasu pracy jest to faktyczna liczba godzin, którą w dobie powinien przepracować pracownik zgodnie z obowiązującym go rozkładem czasu pracy.</h4>
          <h4>O faktycznym wymiarze czasu pracy pracownika decyduje pracodawca</h4>

          <h2 id="Norma czasu pracy">Norma czasu pracy</h2>
          <h4>Pracodawca chcąc wyznaczyć ekwiwalent za 1 godzinę urlopu musi podzielić przeciętne wynagrodzenie przysługujące pracownikowi za 1 dzień pracy, przez taką liczbę godzin, jaka odpowiada dobowej normie czasu pracy obowiązującej danego pracownika.</h4>
          <h4>Dla pracownika zatrudnionego w pełnym jak i niepełnym wymiarze czasu pracy dobowa norma czasu pracy wynosi 8 godzin. W równoważnych systemach czasu pracy, możliwość przedłużenia dobowego wymiaru czasu pracy do 12 godzin nie zmienia się obowiązującej tych pracowników dobowej normy czasu pracy, która wynosi 8 godzin.</h4>
          <h4> Na mocy przepisów szczególnych, niektórych pracowników obowiązują natomiast niższe normy czasu pracy. Taka sytuacja dotyczy m.in. pracowników z umiarkowanym bądź znacznym stopniem niepełnosprawności – dobowa norma 7 godzin.</h4>


        </>
      }
      />
    </>
  );
}

export default Page; 
