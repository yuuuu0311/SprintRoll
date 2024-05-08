import { useState } from "react";

// GSAP
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

// dnd
import {
    Droppable,
    Draggable,
    DragDropContext,
    OnDragEndResponder,
} from "react-beautiful-dnd";

// style
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// icon
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

// components
import { FloatingTicket } from "@/components/FloatingTicket";
import { Footer } from "./Footer";

// icon
import { IoMdArrowRoundForward } from "react-icons/io";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

// utilities
import { rearange } from "@/utilities";

import { mockTicketFace } from "@/interface";

const Ticket: React.FC<{
    ticketInfo: mockTicketFace;
    index: number;
}> = ({ ticketInfo, index }) => {
    const ticketsClass = twMerge(
        classNames("rounded-md overflow-hidden transition")
    );
    const ticketsDomainClass = twMerge(classNames("p-2 bg-lime-500"));

    return (
        <Draggable index={index} draggableId={ticketInfo.ticketTitle}>
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
                    <div className={ticketsClass}>
                        <div className={ticketsDomainClass}></div>
                        <div className="bg-stone-100 hover:bg-neutral-300 transition flex flex-col gap-1 p-2">
                            <div className="">{ticketInfo.ticketTitle}</div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

const TicketList: React.FC<{ mockTickets: mockTicketFace[] }> = ({
    mockTickets,
}) => {
    return (
        <Droppable droppableId={"TicketList"}>
            {({ innerRef, droppableProps, placeholder }) => (
                <div
                    className="flex max-h-full flex-col gap-3 bg-neutral-200 p-4 pb-6 rounded-lg md:w-56 w-full shadow-lg dark:bg-neutral-600"
                    ref={innerRef}
                    {...droppableProps}
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg text-neutral-700 font-bold capitalize dark:text-stone-200">
                            To Do
                        </h3>
                        <MdOutlineDelete className="hover:text-rose-500 transition text-xl cursor-pointer text-neutral-500 dark:text-stone-200" />
                    </div>

                    {mockTickets.length === 0 ? (
                        <div className="text-neutral-400">
                            drop tickets here
                        </div>
                    ) : (
                        <div className="flex h-full overflow-auto  no-scrollbar flex-col gap-3">
                            {mockTickets.map((ticketInfo, index) => {
                                return (
                                    <Ticket
                                        ticketInfo={ticketInfo}
                                        index={index}
                                        key={`${ticketInfo.ticketTitle}-${index}`}
                                    />
                                );
                            })}

                            {placeholder}
                        </div>
                    )}
                </div>
            )}
        </Droppable>
    );
};

const SprintPanel: React.FC<{ mockTickets: mockTicketFace[] }> = ({
    mockTickets,
}) => {
    const [isToggle, setIsToggle] = useState(true);

    const ticketsWrapClass = twMerge(
        classNames("transition-all px-6 overflow-hidden relative h-0", {
            "h-auto": isToggle,
        })
    );

    const getProgressPercentage = (sprintTickets: mockTicketFace[]) => {
        const havingStatus = sprintTickets.filter(
            (ticket) => ticket.status !== -1
        );

        return havingStatus.length === 0 && sprintTickets.length === 0
            ? 0
            : Math.floor((havingStatus.length / sprintTickets.length) * 100);
    };

    return (
        <Droppable droppableId={"SprintTickets"}>
            {({ innerRef, droppableProps, placeholder }) => (
                <div className="transition hover:brightness-95 bg-white">
                    <div className="sticky top-0 bg-white w-full px-6 pt-4 pb-2 flex flex-col gap-3 ">
                        <div className="flex justify-end gap-2">
                            <MdOutlineEdit className="text-lg hover:text-lime-500 transition" />
                            <MdOutlineDelete className="text-lg hover:text-rose-500 transition" />
                        </div>
                        <div className="text-neutral-600 flex flex-col gap-1">
                            <div className="flex justify-between items-baseline">
                                <div className="font-bold text-3xl flex gap-2 items-center">
                                    <span>SprintRoll</span>
                                </div>
                                <span className="text-sm"># Sprint 0</span>
                            </div>
                            <div className="flex justify-between items-baseline text-sm text-neutral-500">
                                <span className="">
                                    {mockTickets.length} tickets inside
                                </span>
                                <span className=" flex gap-2">
                                    <span>
                                        {new Date().toLocaleDateString()}
                                    </span>
                                    -
                                    <span>
                                        {new Date().toLocaleDateString()}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="text-neutral-500">
                            It's a mock sprint
                        </div>

                        <div className="flex gap-4 items-center">
                            <div className="flex-1 relative rounded-full overflow-hidden bg-neutral-200 h-3">
                                {getProgressPercentage(mockTickets) ? (
                                    <div
                                        className={`animate-pulse transition-all ease-in-out duration-1000 origin-left bg-lime-500 rounded-full h-full`}
                                        style={{
                                            width: `${getProgressPercentage(
                                                mockTickets
                                            )}%`,
                                        }}
                                    ></div>
                                ) : (
                                    <></>
                                )}
                            </div>
                            {`${getProgressPercentage(mockTickets)}%`}
                        </div>
                    </div>
                    <div
                        className={ticketsWrapClass}
                        ref={innerRef}
                        {...droppableProps}
                    >
                        <div className="flex flex-col">
                            {mockTickets.length === 0 ? (
                                <div className="text-neutral-300 text-sm">
                                    It's empty, drop some tickets here
                                </div>
                            ) : (
                                mockTickets.map((ticket, index) => (
                                    <TicketStatusRow
                                        index={index}
                                        ticketInfo={ticket}
                                        key={`${ticket.ticketTitle}`}
                                    />
                                ))
                            )}
                        </div>
                        {placeholder}
                    </div>
                    <div
                        onClick={() =>
                            setIsToggle((prev) => (prev ? false : true))
                        }
                        className="flex justify-center transition hover:bg-neutral-200 py-2 text-neutral-400"
                    >
                        {isToggle ? "less" : "more"}
                    </div>
                </div>
            )}
        </Droppable>
    );
};

const TicketStatusRow: React.FC<{
    ticketInfo: mockTicketFace;
    index: number;
}> = ({ ticketInfo, index }) => {
    // style
    const ticketStatusLightBg = twMerge(
        classNames(
            "absolute inline-flex h-full w-full rounded-full bg-neutral-400/50 opacity-75",
            {
                "animate-ping": ticketInfo.status === -1,
                "bg-lime-400": ticketInfo.status === 1,
            }
        )
    );
    const ticketStatusLight = twMerge(
        classNames(
            "relative inline-flex rounded-full h-3 w-3 bg-neutral-400/50",
            {
                "bg-lime-400": ticketInfo.status === 1,
            }
        )
    );

    return (
        <Draggable index={index} draggableId={ticketInfo.ticketTitle}>
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
                    <div className="flex flex-wrap gap-2 md:gap-0 justify-between  hover:pl-5 p-2 hover:bg-stone-200/80 transition-all rounded-full">
                        <div className="flex gap-4 items-center">
                            <span className="relative flex h-3 w-3">
                                <span className={ticketStatusLightBg}></span>
                                <span className={ticketStatusLight}></span>
                            </span>

                            <span>{ticketInfo.ticketTitle}</span>
                        </div>
                        <div className="flex justify-end gap-2">
                            {ticketInfo.status === -1 ? (
                                <div className="bg-neutral-400/50 grid place-items-center text-neutral-700 rounded-full px-2 text-sm">
                                    unfinished
                                </div>
                            ) : (
                                <div className="bg-lime-400/50 grid place-items-center text-lime-700 rounded-full px-2 text-sm">
                                    completed
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export const LandingPage: React.FC = () => {
    const [mockTickets, setMockTickets] = useState<mockTicketFace[]>([
        {
            ticketTitle: "drag and drop to reorder!",
            status: -1,
        },
        {
            ticketTitle: "checkout the dashboard",
            status: -1,
        },
        {
            ticketTitle: "drop me into sprint cycle!",
            status: 1,
        },
        {
            ticketTitle: "let's get started",
            status: 1,
        },
    ]);
    const [mockSprintTickets, setMockSprintTickets] = useState<
        mockTicketFace[] | []
    >([]);

    useGSAP(() => {
        gsap.fromTo(
            ".hero",
            {
                opacity: 1,
                borderRadius: 0,
            },
            {
                opacity: 0.75,
                borderRadius: 24,
                scale: 0.9,
                transformOrigin: "center center",
                ease: "expoScale(0.5,7,none)",
                scrollTrigger: {
                    trigger: ".hero",
                    scroller: ".landing-page",
                    start: "top top",
                    end: "bottom top",
                    pin: true,
                    scrub: 3,
                    markers: true,
                },
            }
        );
        gsap.fromTo(
            ".intro-card",
            {
                opacity: 0,
                translateY: "10%",
            },
            {
                opacity: 1,
                translateY: "0%",
                stagger: 0.15,
                duration: 1.5,
                ease: "expoScale(0.5,7,none)",
                scrollTrigger: {
                    trigger: ".container-intro",
                    scroller: ".landing-page",
                    start: "top center",
                    end: "center center",
                    // markers: true,
                },
            }
        );
    }, {});

    const sectionTitle = twMerge(
        classNames(
            "md:text-4xl text-2xl tracking-widest text-neutral-600  whitespace-nowrap text-neutral-600 font-semibold"
        )
    );

    const introCardWrap = twMerge(
        classNames(
            "flex flex-col gap-6 bg-white px-12 pt-6 py-8 rounded-xl tracking-widest overflow-hidden shadow-lg hover:bg-lime-400/30 transition flex-1 intro-card"
        )
    );

    const introCardTitle = twMerge(
        classNames("text-2xl leading-relaxed text-center whitespace-nowrap")
    );

    const toSprint = (
        sourceIndex: number,
        destIndex: number,
        ticketID: string
    ) => {
        const [toSprintTicket] = mockTickets.filter(
            (ticket) => ticket.ticketTitle === ticketID
        );

        setMockTickets((prev) => {
            const ticketsCopy = [...prev];
            ticketsCopy.splice(sourceIndex, 1);

            return ticketsCopy;
        });

        setMockSprintTickets((prev) => {
            const sprintTicketsCopy = [...prev];
            sprintTicketsCopy.splice(destIndex, 0, toSprintTicket);

            return sprintTicketsCopy;
        });
    };

    const toTicketList = (
        sourceIndex: number,
        destIndex: number,
        ticketID: string
    ) => {
        const [toSprintTicket] = mockSprintTickets.filter(
            (ticket) => ticket.ticketTitle === ticketID
        );
        setMockSprintTickets((prev) => {
            const ticketsCopy = [...prev];
            ticketsCopy.splice(sourceIndex, 1);

            return ticketsCopy;
        });

        setMockTickets((prev) => {
            const sprintTicketsCopy = [...prev];
            sprintTicketsCopy.splice(destIndex, 0, toSprintTicket);

            return sprintTicketsCopy;
        });
    };

    const getDndResult = (sourceID: string, destID: string) => {
        if (sourceID === "TicketList" && destID === "SprintTickets") return 0;
        if (sourceID === "SprintTickets" && destID === "TicketList") return 1;
        if (sourceID === "TicketList" && destID === "TicketList") return 2;
        if (sourceID === "SprintTickets" && destID === "SprintTickets")
            return 3;
    };

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        switch (
            getDndResult(
                result.source.droppableId,
                result.destination?.droppableId as string
            )
        ) {
            case 0:
                toSprint(
                    result.source.index,
                    result.destination?.index as number,
                    result.draggableId
                );

                break;
            case 1:
                toTicketList(
                    result.source.index,
                    result.destination?.index as number,
                    result.draggableId
                );

                break;
            case 2:
                setMockTickets(
                    () =>
                        rearange(
                            mockTickets as mockTicketFace[],
                            source.index,
                            destination.index
                        ) as mockTicketFace[]
                );
                break;
            case 3:
                setMockSprintTickets(
                    () =>
                        rearange(
                            mockSprintTickets as mockTicketFace[],
                            source.index,
                            destination.index
                        ) as mockTicketFace[]
                );

                break;

            default:
                break;
        }
    };

    return (
        <div className="h-screen w-full overflow-x-hidden overflow-y-auto no-scrollbar bg-stone-100 landing-page">
            <div className="h-screen w-screen mx-auto relative grid place-items-center overflow-hidden hero">
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

            <div className="w-screen bg-stone-100 relative container-intro">
                <div className="mx-auto md:w-3/4 w-full md:py-24 py-12 px-10 flex flex-col gap-36">
                    <div className="flex flex-col md:gap-20 gap-12">
                        <div className={sectionTitle}># SprintRoll</div>

                        <div className="gap-6 grid md:grid-cols-4 grid-cols-1">
                            <div className={introCardWrap}>
                                <div className={introCardTitle}>輕鬆規劃</div>
                                <div>直觀的拖放介面，快速設定和調整任務</div>
                            </div>
                            <div className={introCardWrap}>
                                <div className={introCardTitle}>協作無界限</div>
                                <div>實時共享進度，溝通無阻，保持團隊同步</div>
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
                    </div>

                    <div className="min-h-[750px] flex flex-col md:gap-20 gap-12">
                        <div className={sectionTitle}># Sprint DashBoard</div>
                        <div className="text-xl text-neutral-600 tracking-wide leading-relaxed">
                            發掘全新視角的儀表板，專為提升專案透明度而設計。實時查看關鍵指標，透過精準的數據視覺化，一目了然地掌握專案進度和團隊表現。無論何時何地，都能迅速做出數據驅動的決策，確保您的專案按計劃推進，效率和成果均可預見
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="text-neutral-400">
                                請試著拖曳
                                <span className="inline-block md:hidden">
                                    上方
                                </span>
                                <span className="hidden md:inline-block">
                                    左方
                                </span>
                                的
                                <span className="text-lime-500 px-2 font-bold">
                                    Ticket
                                </span>
                                到
                                <span className="inline-block md:hidden">
                                    下方
                                </span>
                                <span className="hidden md:inline-block">
                                    右方
                                </span>
                                的
                                <span className="text-lime-500 px-2 font-bold">
                                    Sprint DashBoard
                                </span>
                                中
                            </div>

                            <div className="flex gap-12 md:items-start md:flex-row flex-col items-stretch">
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <TicketList mockTickets={mockTickets} />
                                    <div className="relative rounded-lg flex-1 overflow-hidden shadow-lg">
                                        <SprintPanel
                                            mockTickets={mockSprintTickets}
                                        />
                                    </div>
                                </DragDropContext>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
