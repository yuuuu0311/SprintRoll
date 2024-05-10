import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { LabelFace } from "@/interface";

const Label: React.FC<{
    children: string;
}> = ({ children }) => {
    const labelClass = twMerge(
        classNames(
            "bg-lime-500/50 grid place-items-center rounded-full px-2 leading-none text-sm",
            {
                "bg-yellow-400/50 text-yellow-700 ": children === "bug",
                "bg-blue-400/50 text-blue-700": children === "feature",
                "bg-lime-400/50 text-lime-700": children === "refactor",
                "bg-rose-400/50 text-rose-700": children === "ASAP",
            }
        )
    );

    return <div className={labelClass}>{children}</div>;
};

export const renderLabel = (labels: LabelFace) => {
    const labelArr = [];

    for (const key in labels) {
        const labelCheck = labels[key as keyof LabelFace];
        if (labelCheck) labelArr.push(key);
    }

    return labelArr
        .sort((a, b) => a.length - b.length)
        .map((label) => <Label key={label}>{label}</Label>);
};

export default Label;
