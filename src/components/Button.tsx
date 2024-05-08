// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

interface ButtonProps {
    link?: boolean;
    outline?: boolean;
    rounded?: boolean;
    primary?: boolean;
    danger?: boolean;
    secondary?: boolean;
    success?: boolean;
    addonStyle?: string;
    onClickFun?: () => void;
    children: React.ReactNode | string;
}

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
    const buttonClass = twMerge(
        classNames(`px-4 py-2 transition  ${props.addonStyle}`, {
            "rounded-md ": props.rounded,
            "bg-neutral-700 text-white": props.primary && !props.link,
            "hover:bg-stone-100 bg-transparent hover:bg-stone-300 active:bg-stone-400":
                props.link,
            "text-stone-600 bg-stone-300 hover:bg-stone-400 active:bg-stone-300":
                props.secondary && !props.link,
            "text-white bg-red-500 hover:bg-red-400 active:bg-red-500":
                props.danger,
            "text-white bg-lime-500 hover:bg-lime-600 active:bg-lime-500":
                props.success,
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
