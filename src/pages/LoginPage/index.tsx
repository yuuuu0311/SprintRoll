import { motion } from "framer-motion";
import { FloatingTicket } from "@/components/FloatingTicket";

// component
import { SigninPanel } from "./SigninPanel";
import { LoginPanel } from "./LoginPanel";
import { useState } from "react";

export const LoginPage: React.FC = () => {
    const [isLoginPanel, setIsLoginPanel] = useState(true);
    return (
        <div className="grid place-items-center bg-neutral-300 h-full">
            <div className="rounded-2xl overflow-hidden bg-stone-100 md:w-2/3 md:h-2/3 w-full h-full flex flex-col md:flex-row shadow-xl">
                <div className="w-1/2 overflow-hidden relative bg-neutral-400">
                    <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                            className="opacity-50"
                            initial={{
                                scale: 1.5,
                            }}
                            animate={{
                                scale: 1.5,
                            }}
                            transition={{
                                duration: 3,
                                ease: "easeInOut",
                            }}
                        >
                            {Array.from(Array(10)).map((ele, index) => (
                                <FloatingTicket
                                    key={`${ele}+${index}`}
                                    domain={0}
                                />
                            ))}
                            {Array.from(Array(8)).map((ele, index) => (
                                <FloatingTicket
                                    key={`${ele}+${index}`}
                                    domain={1}
                                />
                            ))}
                            {Array.from(Array(5)).map((ele, index) => (
                                <FloatingTicket
                                    key={`${ele}+${index}`}
                                    domain={2}
                                />
                            ))}
                            {Array.from(Array(10)).map((ele, index) => (
                                <FloatingTicket
                                    key={`${ele}+${index}`}
                                    domain={3}
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col p-14 gap-6 justify-center">
                    {isLoginPanel ? (
                        <LoginPanel setIsLoginPanel={setIsLoginPanel} />
                    ) : (
                        <SigninPanel setIsLoginPanel={setIsLoginPanel} />
                    )}
                </div>
            </div>
        </div>
    );
};
