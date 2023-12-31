import { Suspense } from "react";
import './globals.css'
import { Inter } from 'next/font/google'
import Nawigacja from "./nawigacja"
import Loading from "./loading"
import { Providers } from './GlobalRedux/provider';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kalkulator wydatku energetycznego, kalkulator urlopu wypoczynkowego',
  description: 'W prosty sposób obliczysz wydatek energetyczny i urlop wypoczynkowy',

}

export default function RootLayout({ children }) {


  return (
    <html lang="pl">
      <body className={inter.className}>
        <Providers>
          <div className='h-[85px] flex justify-between md:justify-start items-center bg-niebieski-9 transition-colors   '>
            <div className='text-white px-4 md:mr-6'>
           
              <Link href={{ pathname: '/', }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 md:w-16 h:10 md:h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </Link>
            </div>

            <Nawigacja />
          </div>


          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Providers>

      </body>
    </html>
  )


}
