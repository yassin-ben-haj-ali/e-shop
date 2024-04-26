import React from "react";
import { IconType } from "react-icons";

interface ActionBtnProps {

    icon: IconType,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean

}

const ActionBtn: React.FC<ActionBtnProps> = ({ icon: Icon, onClick, disabled }) => {
    return (

        <button className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400 ${disabled && "cursor-not-allowed opacity-50"}`} disabled={disabled} onClick={onClick}>
            <Icon size={18} />
        </button>

    );
}

export default ActionBtn;