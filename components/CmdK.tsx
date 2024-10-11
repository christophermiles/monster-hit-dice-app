import React from "react";
import clsx from "clsx";
import getBrowser from "@/lib/get-browser";
import "./CmdK.css";

interface CmdKProps extends React.HTMLAttributes<HTMLSpanElement> {
    border?: boolean
}

const CmdK: React.FC<CmdKProps> = ({ border, className }) => {
    return (
        <span className={clsx('cmd-k', className)} data-bordered={ border }>
            { getBrowser().getOSName() === 'macOS'
                ? <span className="cmd-key">⌘</span>
                : <span className="ctrl-key">Ctrl</span>
            }
            <span>K</span>
        </span>

    )
}

export default CmdK