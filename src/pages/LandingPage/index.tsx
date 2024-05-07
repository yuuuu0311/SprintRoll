// import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// icon
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

// components
import { FloatingTicket } from "@/components/FloatingTicket";

// icon
import { IoMdArrowRoundForward } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const LandingPage: React.FC = () => {
    useGSAP(() => {
        gsap.fromTo(
            ".intro-card",
            {
                opacity: 0,
                translateY: "10%",
            },
            {
                opacity: 1,
                translateY: 0,
                stagger: 0.25,
                scrollTrigger: {
                    trigger: ".container-intro",
                    scroller: ".landing-page",
                    start: "top center",
                    end: "center center",
                    toggleActions: "play none none reverse",
                    // markers: true,
                },
            }
        );
    }, {});

    const sectionTitle = twMerge(
        classNames("text-4xl tracking-widest text-neutral-600")
    );

    const introCardWrap = twMerge(
        classNames(
            "flex flex-col gap-6 bg-white px-12 pt-6 py-8 rounded-xl tracking-widest overflow-hidden shadow-md hover:bg-lime-400/30 transition flex-1 intro-card"
        )
    );

    const introCardTitle = twMerge(
        classNames("text-2xl leading-relaxed text-center")
    );

    return (
        <div className="h-screen w-full overflow-x-hidden overflow-y-auto no-scrollbar bg-stone-100 landing-page">
            <div className="h-screen w-screen mx-auto relative grid place-items-center overflow-hidden">
                <motion.div
                    className="opacity-50 absolute w-full h-full bg-neutral-300"
                    initial={{
                        scale: 1,
                    }}
                    animate={{
                        scale: 1.5,
                    }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                    }}
                >
                    {Array.from(Array(5)).map((ele, index) => (
                        <FloatingTicket
                            key={`${ele}+${index}`}
                            index={index}
                            domain={0}
                        />
                    ))}
                    {Array.from(Array(2)).map((ele, index) => (
                        <FloatingTicket
                            key={`${ele}+${index}`}
                            index={index}
                            domain={1}
                        />
                    ))}
                    {Array.from(Array(3)).map((ele, index) => (
                        <FloatingTicket
                            key={`${ele}+${index}`}
                            index={index}
                            domain={2}
                        />
                    ))}
                    {Array.from(Array(5)).map((ele, index) => (
                        <FloatingTicket
                            key={`${ele}+${index}`}
                            index={index}
                            domain={3}
                        />
                    ))}
                </motion.div>
                <div className="z-50 w-fit mx-auto flex flex-col gap-2 justify-center items-center md:scale-150 tracking-widest">
                    <div className="relative h-20 w-full flex overflow-hidden justify-center items-center text-stroke-4 select-none pointer-events-none">
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
                    <div className="text-xl text-bold scale-110 select-none pointer-events-none">
                        your best rollup option
                    </div>
                    <NavLink to="/login">
                        <motion.button
                            className="flex gap-2 items-center py-1 px-3 text-stone-100 bg-neutral-600 rounded-full mt-3 active:bg-neutral-600 active:scale-90 hover:bg-neutral-700 transition select-none"
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

            <div className="h-screen w-screen bg-stone-100 relative container-intro">
                <div className="mx-auto w-3/4 py-24 flex flex-col gap-32">
                    <div className={sectionTitle}>SprintRoll</div>

                    <div className="flex gap-4">
                        <div className={introCardWrap}>
                            <div className={introCardTitle}>輕鬆規劃</div>
                            <div>直觀的拖放介面，快速設定和調整任務</div>
                        </div>
                        <div className={introCardWrap}>
                            <div className={introCardTitle}>協作無界限</div>
                            <div>直觀的拖放介面，快速設定和調整任務</div>
                        </div>
                        <div className={introCardWrap}>
                            <div className={introCardTitle}>客製化彈性</div>
                            <div>按需調整，滿足獨特的工作流程和需求</div>
                        </div>
                        <div className={introCardWrap}>
                            <div className={introCardTitle}>即時追蹤</div>
                            <div>讓您隨時掌握專案狀態，做出明智決策</div>
                        </div>
                    </div>

                    <div className={sectionTitle}>Sprint DashBoard</div>

                    {/* <div className="flex gap-24 justify-between relative">
                        <div className="flex flex-1 flex-col shadow-xl rounded-xl overflow-hidden bg-white ticket">
                            <div className="h-14 bg-lime-500"></div>
                            <div className="h-fit bg-white overflow-hidden px-6 pt-4 pb-6 flex flex-col gap-6">
                                <div className="text-4xl relative text-neutral-700">
                                    <div>feature: complete SprintRoll</div>
                                </div>
                                <div className="flex gap-2 justify-end mt-auto">
                                    <span className="bg-blue-500/50 text-blue-700 rounded-full text-2xl py-1 px-4">
                                        feature
                                    </span>
                                    <span className="bg-rose-500/50 text-rose-700 rounded-full text-2xl py-1 px-4">
                                        ASAP
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className="text-xs p-20 bottom-10 w-screen text-center opacity-50">
                Copyright © {new Date().getFullYear()} SprintRoll . All rights
                reserved.
            </div>
        </div>
    );
};
