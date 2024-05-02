import { motion } from "framer-motion";

import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const FloatingTicket: React.FC<{ domain: number }> = ({ domain }) => {
    const ticketDomainClass = twMerge(
        classNames("h-12", {
            "bg-lime-500 ": domain == 0,
            "bg-red-500 ": domain == 1,
            "bg-yellow-500 ": domain == 2,
            "bg-blue-500 ": domain == 3,
        })
    );

    return (
        <motion.div
            className="w-64 h-28 rounded-xl  absolute flex flex-col shadow-2xl"
            initial={{
                x: `${Math.floor((Math.random() - 0.5) * 400)}%`,
                y: `${Math.floor((Math.random() - 0.5) * 400)}%`,
                scale: 0.8,
                opacity: 0,
                filter: `blur(${Math.random() * 5}px)`,
                rotate: Math.floor((Math.random() - 0.5) * 180),
                overflow: "hidden",
            }}
            animate={{
                x: `${Math.floor((Math.random() - 0.5) * -800)}%`,
                y: `${Math.floor((Math.random() - 0.5) * -800)}%`,
                rotate: Math.floor((Math.random() - 0.5) * -360),
                scale: 1,
                filter: `blur(${Math.random() * 5}px)`,
                opacity: 1,
            }}
            transition={{
                duration: 100,
                ease: "linear",
                repeatType: "reverse",
                repeat: Infinity,
                opacity: {
                    type: "",
                    damping: 5,
                    stiffness: 50,
                    restDelta: 0.001,
                },
            }}
        >
            <div className={ticketDomainClass}></div>
            <div className="bg-stone-100 flex-1 py-2 px-4 text-2xl text-neutral-700">
                you can't see me
            </div>
        </motion.div>
    );
};
