import React from "react";

import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const Loader: React.FC<{ addonStyle?: string }> = ({ addonStyle }) => {
    const loaderClass = twMerge(
        classNames(
            `inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-400 motion-reduce:animate-[spin_1.5s_linear_infinite] ${addonStyle}`
        )
    );

    return (
        <div className={loaderClass} role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );
};
