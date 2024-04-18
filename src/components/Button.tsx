// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

interface ButtonProps {
    link?: boolean;
    outline?: boolean;
    rounded?: boolean;
    primary?: boolean;
    danger?: boolean;
    success?: boolean;
    addonStyle?: string;
    onClickFun?: () => void;
    children: React.ReactNode | string;
}

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
    const buttonClass = twMerge(
        classNames(`px-4 py-2 transition bg-neutral-400 ${props.addonStyle}`, {
            "rounded-md hover:bg-neutral-300": props.rounded,
            "bg-neutral-700 text-white": props.primary && !props.link,
            "hover:bg-gray-100": props.link,
            "text-white bg-red-500 hover:bg-red-400 active:bg-red-500":
                props.danger && props.danger,
            "text-white bg-lime-500 hover:bg-lime-400 active:bg-lime-500":
                props.success && props.success,
            "text-neutral-700 hover:bg-neutral-600":
                props.primary && props.link,
        })
    );

    return (
        <button className={buttonClass} onClick={props.onClickFun}>
            {props.children}
        </button>
    );
};
