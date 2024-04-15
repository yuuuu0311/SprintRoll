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
        classNames(`p-3 transition ${props.addonStyle}`, {
            "bg-blue-700 text-white": props.primary && !props.link,
            "text-blue-700": props.primary && props.link,
        })
    );

    return (
        <button className={buttonClass} onClick={props.onClickFun}>
            {props.children}
        </button>
    );
};
