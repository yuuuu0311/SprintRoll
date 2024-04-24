import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const Label: React.FC<{
    children: string;
}> = ({ children }) => {
    const labelClass = twMerge(
        classNames("bg-lime-500/50 rounded-full px-2 leading-none text-sm", {
            "bg-neutral-400/50 text-white": children === "bug",
            "bg-blue-500/50 text-white": children === "feature",
            "bg-red-500/50 text-white": children === "ASAP",
        })
    );

    return <div className={labelClass}>{children}</div>;
};

export const renderLabel = (labels: object) => {
    const labelArr = [];
    for (const key in labels) {
        labelArr.push(key);
    }

    return labelArr
        .sort((a, b) => a.length - b.length)
        .map((label) => <Label key={label}>{label}</Label>);
};

export default Label;
