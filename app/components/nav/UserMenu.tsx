"use client"

import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "../Avatar";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react"

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])
    return (<div className="relative z-30">
        <div onClick={toggleOpen} className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700">
            <Avatar />
            <AiFillCaretDown />
        </div>
        {isOpen && <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden top-12 right-0 text-sm flex flex-col cursor-pointer">
            <div>
                <Link href="/orders">
                    <MenuItem onClick={toggleOpen}>Your orders</MenuItem>
                </Link>
                <Link href="/admin">
                    <MenuItem onClick={toggleOpen}>Admin dashboard</MenuItem>
                </Link>
                <MenuItem onClick={() => {
                    toggleOpen();
                    signOut()
                }}>logout</MenuItem>
            </div>
        </div>}
    </div>);
}

export default UserMenu;