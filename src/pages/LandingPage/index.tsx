import { motion } from "framer-motion";

import { FloatingTicket } from "./FloatingTicket";

export const LandingPage: React.FC = () => {
    return (
        <div className="h-screen bg-neutral-300">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 flex flex-col items-center gap-2">
                <div className="opacity-50">
                    {Array.from(Array(2)).map(() => (
                        <FloatingTicket domain={0} />
                    ))}
                    {Array.from(Array(3)).map(() => (
                        <FloatingTicket domain={1} />
                    ))}
                    {Array.from(Array(1)).map(() => (
                        <FloatingTicket domain={2} />
                    ))}
                    {Array.from(Array(2)).map(() => (
                        <FloatingTicket domain={3} />
                    ))}
                </div>

                <div className="z-50 flex flex-col justify-center items-center">
                    <div className="relative h-20 w-full flex overflow-hidden items-center">
                        {Array.from("SprintRoll").map((word, index) => (
                            <motion.div
                                key={`${word}-${index}`}
                                className="text-6xl tex-bold"
                                initial={{
                                    translateY: "100%",
                                    opacity: 0,
                                }}
                                animate={{ translateY: "0%", opacity: 1 }}
                                transition={{
                                    duration: 1,
                                    ease: [0, 0.71, 0.2, 1.01],
                                    delay: index / 12,
                                }}
                            >
                                {word}
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-xl text-bold">
                        your best rollup option
                    </div>
                </div>
            </div>
        </div>
    );
};
