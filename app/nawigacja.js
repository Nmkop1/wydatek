'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link';
function Nawigacja() {

    const pathname = usePathname();
    const navigation = [
        { name: "Główna", href: "/", current: true },
        { name: "Wydatek", href: "/wydatek", current: false },
        { name: "Login", href: "/logowanie", current: false },
    ];


    return (
        <>

            {navigation.map((item) => (
                <Link
                    href={{
                        pathname: `${item.href}`,
                        // query: { state: true },
                    }}
                    key={item.name}
                    className={
                        pathname === item.href
                            ? " text-zielony-1 outline-none text-lg   font-semibold  mr-6 "
                            : "text-white outline-none  text-lg         transition   duration-500 cursor-pointer mr-6   font-semibold "
                    }
                >
                    {item.name.toUpperCase()}
                </Link>
            ))}
        </>
           
    )
}

export default Nawigacja