import {
    ChangeEvent,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
} from "react";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
// import { useDebounce } from "use-debounce";

// interface
import { TicketFace, LabelInputFace, LabelFace } from "@/interface";

// components
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

// icons
// import { MdManageSearch } from "react-icons/md";

// utilities
import {
    deleteTicket,
    // getDomainDeveloper,
    // assignDeveloper,
    // removeFromAssigned,
    debounce,
    updateTicketInfo,
} from "@/utilities";

enum LabelType {
    BUG = "bug",
    FEATURE = "feature",
    REFACTOR = "refactor",
    ASAP = "ASAP",
}

const LabelTypeArray = [
    LabelType.BUG,
    LabelType.FEATURE,
    LabelType.REFACTOR,
    LabelType.ASAP,
];

export const Label: React.FC<LabelInputFace> = ({
    ticketInfo,
    labelName,
    isCheck,
    changeHandler,
}) => {
    const labelClass = twMerge(
        classNames(
            "bg-lime-500/50 rounded-full px-2 leading-none bg-neutral-300 py-1 px-3 transition",
            {
                "[&:has(input:checked)]:bg-yellow-400/50 [&:has(input:checked)]:text-yellow-700 ":
                    labelName === "bug",
                "[&:has(input:checked)]:bg-blue-400/50 [&:has(input:checked)]:text-blue-700":
                    labelName === "feature",
                "[&:has(input:checked)]:bg-lime-400/50 [&:has(input:checked)]:text-lime-700":
                    labelName === "refactor",
                "[&:has(input:checked)]:bg-rose-400/50 [&:has(input:checked)]:text-rose-700":
                    labelName === "ASAP",
            }
        )
    );

    return (
        <label htmlFor={labelName} className={labelClass}>
            <span>{labelName}</span>
            <input
                type="checkbox"
                name={labelName}
                id={labelName}
                hidden
                defaultChecked={isCheck?.[labelName]}
                onChange={(e) => {
                    if (changeHandler === undefined) return;
                    changeHandler((prev) => {
                        updateTicketInfo(ticketInfo, {
                            target: "label",
                            value: {
                                ...prev,
                                [e.target.name]: e.target.checked,
                            },
                        });

                        return {
                            ...prev,
                            [e.target.name]: e.target.checked,
                        };
                    });
                }}
            />
        </label>
    );
};

const DialogSection: React.FC<{
    children: React.ReactNode;
    sectionTitle: string;
}> = ({ children, sectionTitle }) => {
    return (
        <div>
            {sectionTitle && (
                <div className="capitalize text-md px-2 text-bold text-neutral-600 mb-2">
                    {sectionTitle}
                </div>
            )}

            <div>{children}</div>
        </div>
    );
};

// const Developer: React.FC<{
//     developerInfo: UserFace;
//     isInCollection: string;
//     ticketInfo: TicketFace;
// }> = ({ developerInfo, isInCollection, ticketInfo }) => {
//     const assignedDeveloperArr = [
//         ...(ticketInfo.assignedDeveloper as string | undefined[]),
//     ];
//     const isInAssigned =
//         assignedDeveloperArr.indexOf(developerInfo.name) !== -1;

//     return (
//         <div className="rounded-md bg-neutral-100 flex justify-between items-center gap-4 p-4">
//             <div className="flex flex-1 flex-col gap-1">
//                 <div className="capitalize flex justify-between items-baseline">
//                     <span>{developerInfo.name} </span>
//                     <span className="text-xs text-neutral-500">
//                         {developerInfo.domain}
//                     </span>
//                 </div>
//                 <div className="text-gray-500 text-sm ">
//                     {developerInfo.email}
//                 </div>
//             </div>

//             <Button
//                 link
//                 success={!isInAssigned}
//                 danger={isInAssigned}
//                 addonStyle="text-md aspect-square p-0 w-6 grid place-items-center rounded-full"
//                 onClickFun={() =>
//                     isInAssigned
//                         ? removeFromAssigned(
//                               developerInfo,
//                               isInCollection,
//                               ticketInfo.ticketID as string
//                           )
//                         : assignDeveloper(
//                               developerInfo,
//                               isInCollection,
//                               ticketInfo.ticketID as string
//                           )
//                 }
//             >
//                 {isInAssigned ? "-" : "+"}
//             </Button>
//         </div>
//     );
// };

export const TicketInfo: React.FC<{
    ticketInfo: TicketFace;
    index: number;
    isInCollection?: string;
    setDialogActive: Dispatch<SetStateAction<boolean>>;
}> = ({ isInCollection, index, ticketInfo, setDialogActive }) => {
    // const [assignedDeveloper, setAssignedDeveloper] = useState<
    //     UserFace[] | void
    // >();

    // const [isSearching, setIsSearching] = useState<boolean>();
    // const [searchDeveloper, setSearchDeveloper] = useState<string>();
    // const [searchValue] = useDebounce(searchDeveloper, 1000, {
    //     leading: true,
    //     maxWait: 300,
    // });

    const [ticketLabel, setTicketLabel] = useState<LabelFace>(
        ticketInfo.label as LabelFace
    );

    useEffect(() => {}, [ticketLabel]);

    const ticketsStatusClass = twMerge(
        classNames("py-1 rounded-lg transition px-2 w-full appearance-none", {
            "text-lime-600 bg-lime-100": ticketInfo.status === "0",
            "text-rose-500 bg-rose-100": ticketInfo.status === "1",
            "text-yellow-600 bg-yellow-100": ticketInfo.status === "2",
        })
    );

    // const handleSearchToggle = () => {
    //     setSearchDeveloper("");
    //     setAssignedDeveloper([]);
    //     setIsSearching((prev) => !prev);
    // };

    const handleDialogToggle = () => {
        setDialogActive((prev) => (prev ? false : true));
    };

    // const handelSearchDeveloper = async (e: ChangeEvent<HTMLInputElement>) => {
    //     setSearchDeveloper(e.target.value);

    //     if (e.target.value.length === 0) {
    //         setAssignedDeveloper([]);
    //     } else {
    //         const developerInfo = await getDomainDeveloper(
    //             ticketInfo.domain as string,
    //             searchValue as string
    //         );

    //         setAssignedDeveloper(developerInfo);
    //     }
    // };

    const handleTicketChange = (e: ChangeEvent<HTMLSelectElement>) => {
        updateTicketInfo(ticketInfo, {
            target: "status",
            value: e.target.value,
        });
    };

    const handleTextAreaChange = debounce(
        (e: ChangeEvent<HTMLTextAreaElement>, ticketInfo: TicketFace) => {
            updateTicketInfo(ticketInfo, {
                target: "description",
                value: e.target.value,
            });
        },
        1000
    );

    return (
        <Dialog
            size="md"
            handleDialogToggle={() => {
                handleDialogToggle();
                // setAssignedDeveloper(undefined);
            }}
            title={ticketInfo.title as string}
        >
            <div className="flex gap-2 flex-1 mb-3">
                <div className="flex flex-col gap-6 flex-1">
                    <DialogSection sectionTitle="created date">
                        <div className="px-2">
                            {new Date(
                                ticketInfo.createdTime.seconds * 1000 +
                                    ticketInfo.createdTime.nanoseconds / 1000000
                            ).toLocaleDateString()}
                        </div>
                    </DialogSection>
                    <DialogSection sectionTitle="label">
                        <div className="flex gap-2 flex-wrap">
                            {LabelTypeArray.map((label) => (
                                <Label
                                    labelName={label}
                                    key={label}
                                    isCheck={
                                        ticketInfo.label as {
                                            [key: string]: boolean;
                                        }
                                    }
                                    ticketInfo={ticketInfo}
                                    changeHandler={setTicketLabel}
                                ></Label>
                            ))}
                        </div>
                    </DialogSection>
                    {/* <DialogSection sectionTitle="assigned developers">
                        <div className="flex gap-1 flex-wrap px-2 mb-2">
                            {!ticketInfo.assignedDeveloper?.length ? (
                                <div className="text-neutral-400">
                                    no developer has been assigned
                                </div>
                            ) : (
                                ticketInfo.assignedDeveloper?.map(
                                    (developer, index) => (
                                        <div
                                            key={`${developer}-${index}`}
                                            className="capitalize rounded-full bg-lime-500 text-white w-fit py-1 px-3"
                                        >
                                            {developer}
                                        </div>
                                    )
                                )
                            )}
                            <div
                                className="flex gap-1 leading-none items-center rounded-full text-blue-500 ml-3"
                                onClick={handleSearchToggle}
                            >
                                <MdManageSearch className="text-xl" />
                                Search
                            </div>
                        </div>

                        {isSearching && (
                            <div>
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="text"
                                        placeholder="Search Developer via email"
                                        className="w-full py-2 px-4 rounded-md focus:bg-neutral-300 bg-stone-100 focus:outline-none"
                                        onChange={(e) =>
                                            handelSearchDeveloper(e)
                                        }
                                    />
                                    <div className="flex flex-col gap-2">
                                        {assignedDeveloper?.map(
                                            (developerInfo) => (
                                                <Developer
                                                    key={developerInfo.uid}
                                                    isInCollection={
                                                        isInCollection as string
                                                    }
                                                    ticketInfo={ticketInfo}
                                                    developerInfo={
                                                        developerInfo
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogSection> */}
                    <DialogSection sectionTitle="Status">
                        <div className="relative">
                            <select
                                className={ticketsStatusClass}
                                onChange={(e) => handleTicketChange(e)}
                                defaultValue={ticketInfo.status}
                            >
                                <option
                                    value="-1"
                                    defaultChecked
                                    disabled
                                    aria-hidden
                                >
                                    select status
                                </option>
                                <option value="0">complete</option>
                                <option value="1">reject</option>
                                <option value="2">pending</option>
                            </select>
                        </div>
                    </DialogSection>
                    <DialogSection sectionTitle="Description">
                        <textarea
                            className=" p-2 text-neutral-500  rounded-md appearance-none w-full resize-none focus:bg-neutral-300 bg-stone-100 outline-none transition "
                            placeholder="add some description here"
                            onChange={(e) => {
                                handleTextAreaChange(e, ticketInfo);
                            }}
                            defaultValue={ticketInfo.description}
                        ></textarea>
                    </DialogSection>
                </div>
            </div>
            <div className="flex gap-2 mt-auto justify-end">
                {/* <Button
                    rounded
                    danger
                    onClickFun={() => {
                        deleteTicket(
                            isInCollection as string,
                            ticketInfo.ticketID as string,
                            index as number
                        );
                    }}
                >
                    delete
                </Button> */}
                <Button
                    rounded
                    secondary
                    onClickFun={() => {
                        handleDialogToggle();
                    }}
                >
                    Back
                </Button>
            </div>
        </Dialog>
    );
};
