import React from "react";
import clsx from "clsx";
import getBrowser from "@/lib/get-browser";

interface CmdKProps extends React.HTMLAttributes<HTMLSpanElement> {
    border?: boolean
}

const CmdK: React.FC<CmdKProps> = ({ border, className }) => {
    const style = clsx(
        'cmd-k',
        'flex items-baseline gap-0.5',
        border && 'px-1 py-0.5 border border-gray-100 rounded-md',
        className
    )

    return (
        <span className={style}>
            { getBrowser().getOSName() === 'macOS'
                ? <span className="cmd-key">⌘</span>
                : <span className="ctrl-key">Ctrl</span>
            }
            <span>K</span>
        </span>

    )
}

export default CmdK