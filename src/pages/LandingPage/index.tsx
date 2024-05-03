import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import { FloatingTicket } from "@/components/FloatingTicket";

import { IoMdArrowRoundForward } from "react-icons/io";

export const LandingPage: React.FC = () => {
    return (
        <div className="h-screen w-full">
            <div className="h-screen bg-neutral-300">
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <motion.div
                        className="opacity-50"
                        initial={{
                            scale: 1,
                            rotate: 0,
                        }}
                        animate={{
                            rotate: 30,
                            scale: 1.5,
                        }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                        }}
                    >
                        {Array.from(Array(2)).map((ele, index) => (
                            <FloatingTicket
                                key={`${ele}+${index}`}
                                domain={0}
                            />
                        ))}
                        {Array.from(Array(3)).map((ele, index) => (
                            <FloatingTicket
                                key={`${ele}+${index}`}
                                domain={1}
                            />
                        ))}
                        {Array.from(Array(1)).map((ele, index) => (
                            <FloatingTicket
                                key={`${ele}+${index}`}
                                domain={2}
                            />
                        ))}
                        {Array.from(Array(2)).map((ele, index) => (
                            <FloatingTicket
                                key={`${ele}+${index}`}
                                domain={3}
                            />
                        ))}
                    </motion.div>

                    <div className="z-50 flex flex-col gap-2 justify-center items-center scale-150 tracking-widest">
                        <div className="relative h-20 w-full flex overflow-hidden items-center text-stroke-4 ">
                            {Array.from("SprintRoll").map((word, index) => (
                                <motion.div
                                    key={`${word}-${index}`}
                                    className="text-6xl tex-bold text-stroke-2 "
                                    initial={{
                                        translateY: "100%",
                                        opacity: 0,
                                        color: "#FFFFFF",
                                    }}
                                    animate={{
                                        translateY: "0%",
                                        opacity: 1,
                                        color: "#454545",
                                    }}
                                    transition={{
                                        duration: 1,
                                        ease: [0, 0.71, 0.2, 1.01],
                                        delay: index / 12,
                                        repeat: 2,
                                        repeatType: "reverse",
                                    }}
                                >
                                    {word}
                                </motion.div>
                            ))}
                        </div>
                        <div className="text-xl text-bold scale-110">
                            your best rollup option
                        </div>
                        <NavLink to="/login">
                            <motion.button
                                className="flex gap-2 items-center py-1 px-3 text-stone-100 bg-neutral-600 rounded-full mt-3 active:bg-neutral-500 hover:bg-neutral-600 transition"
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 1,
                                    ease: "easeInOut",
                                }}
                            >
                                <div>Start</div>
                                <div>
                                    <IoMdArrowRoundForward />
                                </div>
                            </motion.button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};
