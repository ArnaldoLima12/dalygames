import { ModeToggle } from "../ui/toggle-theme"
import Link from "next/link"

export function Header() {
    return (
            <header className="flex justify-between items-center py-5">
             <Link href={'/'}>
                <h1 className="text-2xl font-bold">Daly<span className="text-red-500">Games</span></h1>
             </Link>

                <ul className="flex gap-3 items-center">
                    <li><ModeToggle/></li>
                </ul>
            </header>
    )
}