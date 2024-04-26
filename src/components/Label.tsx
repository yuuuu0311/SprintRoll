import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const Label: React.FC<{
    children: string;
}> = ({ children }) => {
    const labelClass = twMerge(
        classNames("bg-lime-500/50 rounded-full px-2 leading-none text-sm", {
            "bg-neutral-400/50 text-neutral-700 ": children === "bug",
            "bg-blue-400/50 text-blue-700": children === "feature",
            "bg-lime-400/50 text-lime-700": children === "refactor",
            "bg-rose-400/50 text-rose-700": children === "ASAP",
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
