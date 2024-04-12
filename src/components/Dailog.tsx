// import { Dispatch, SetStateAction } from "react";

// dependency
// import { twMerge } from "tailwind-merge";
// import classNames from "classnames";

export const Dialog: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div>
            <div>backdrop</div>
            <div>
                <div>title</div>
                {children}
            </div>
        </div>
    );
};
