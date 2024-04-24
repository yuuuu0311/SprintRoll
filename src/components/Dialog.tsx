import ReactDOM from "react-dom";

export const Dialog: React.FC<{
    children: React.ReactNode;
    title: string;
    handleDialogToggle: () => void;
}> = ({ children, handleDialogToggle, title }) => {
    return ReactDOM.createPortal(
        <div className="fixed w-screen h-screen inset-0 backdrop-blur-md">
            <div
                className="fixed bg-neutral-700 opacity-60 w-full h-full z-0"
                onClick={handleDialogToggle}
            ></div>
            <div className="flex flex-col absolute w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden bg-neutral-200">
                <div className="px-6 pt-4 pb-2 font-bold text-lg capitalize text-stone-100 bg-neutral-600">
                    {title}
                </div>
                <div className="flex flex-col flex-1 px-6 py-6">{children}</div>
            </div>
        </div>,
        document.body
    );
};
