import React from 'react';

type IconCloseProps = {
    className?: string;
    onClick?: () => void
}

export default function IconClose({className, onClick, ...props}: IconCloseProps) {
    return (
        <svg 
          width="30px" height="30px" 
          viewBox="0 0 24 24" fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={onClick} 
          className={className} {...props}>
            <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5" />
            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
        </svg>
    )
}
