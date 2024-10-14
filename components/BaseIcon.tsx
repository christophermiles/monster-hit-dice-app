import React, {SVGProps} from 'react'

interface BaseIconProps extends SVGProps<SVGSVGElement> {
    path: string
}

const BaseIcon: React.FC<BaseIconProps> = ({ path, className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d={path}/>
        </svg>
    )
}

export default BaseIcon