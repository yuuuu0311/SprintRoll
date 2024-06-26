import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { MdClose } from "react-icons/md";

export const Dialog: React.FC<{
    children: React.ReactNode;
    title: string;
    danger?: boolean;
    size?: string;
    handleDialogToggle: () => void;
}> = ({ children, handleDialogToggle, title, danger, size }) => {
    const dialogClass = twMerge(
        classNames(
            `flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden bg-neutral-200 md:w-fit w-[80%] z-50`,
            {
                "md:w-1/2 w-[80%] min-h-58": size === "md",
            }
        )
    );
    const titleClass = twMerge(
        classNames(
            `px-8 py-6 font-bold text-xl capitalize text-neutral-600 flex justify-between gap-2 items-center`,
            {
                "text-rose-500": danger,
            }
        )
    );

    return ReactDOM.createPortal(
        <div className="fixed w-screen h-screen inset-0 backdrop-blur-md z-50">
            <div
                className="fixed bg-neutral-700 opacity-60 w-full h-full z-40"
                onClick={handleDialogToggle}
            ></div>
            <div className={dialogClass}>
                {title.length !== 0 && (
                    <div className={titleClass}>
                        <span className=" line-clamp-1 text-ellipsis flex-1 break-words">
                            {title}
                        </span>
                        <MdClose
                            className="hover:text-neutral-400 transition cursor-pointer"
                            onClick={handleDialogToggle}
                        />
                    </div>
                )}
                <div className="flex flex-col flex-1 px-6 pb-6">{children}</div>
            </div>
        </div>,
        document.body
    );
};
