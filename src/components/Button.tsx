// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

interface ButtonProps {
    link?: boolean;
    outline?: boolean;
    rounded?: boolean;
    primary?: boolean;
    addonStyle?: string;
    onClickFun?: () => void;
    children: React.ReactNode | string;
}

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
    const buttonClass = twMerge(
        classNames(`px-4 py-2 transition bg-blue-400 ${props.addonStyle}`, {
            "rounded-md": props.rounded,
            "bg-blue-700 text-white": props.primary && !props.link,
            "hover:bg-gray-100": props.link,
            "text-blue-700 hover:bg-blue-100": props.primary && props.link,
        })
    );

    return (
        <button className={buttonClass} onClick={props.onClickFun}>
            {props.children}
        </button>
    );
};
