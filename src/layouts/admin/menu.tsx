
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";
import {Navbar} from "./navbar"

export default function Menu() {
    return (
        <div className=" h-full flex items-center gap-5 px-5 " style={{borderBottom: '1px solid  rgb(203 213 225)'}}>
            <div id="back" >
                <Link href="/" className="flex items-center gap-x-2 text-black hover:text-red-600" ><ArrowLeftIcon />StoreFont</Link>
            </div>
            <div className="flex">
                    <Navbar className="mx-6"/>
            </div>

        </div>

    )
}