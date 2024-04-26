import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const Dialog: React.FC<{
    children: React.ReactNode;
    title: string;
    danger?: boolean;
    size?: string;
    handleDialogToggle: () => void;
}> = ({ children, handleDialogToggle, title, danger, size }) => {
    const dialogClass = twMerge(
        classNames(
            `flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden bg-neutral-200`,
            {
                "w-1/2 min-h-58": size === "md",
            }
        )
    );
    const titleClass = twMerge(
        classNames(`px-6 py-4 font-bold text-lg capitalize text-neutral-600`, {
            "text-rose-500": danger,
        })
    );

    return ReactDOM.createPortal(
        <div className="fixed w-screen h-screen inset-0 backdrop-blur-md">
            <div
                className="fixed bg-neutral-700 opacity-60 w-full h-full z-0"
                onClick={handleDialogToggle}
            ></div>
            <div className={dialogClass}>
                {title.length !== 0 && (
                    <div className={titleClass}>{title}</div>
                )}
                <div className="flex flex-col flex-1 px-6 pb-6">{children}</div>
            </div>
        </div>,
        document.body
    );
};
