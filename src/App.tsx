import { Outlet } from "react-router-dom";

import "./App.css";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const App: React.FC = () => {
    const wrapperClass = classNames(
        twMerge(
            "flex h-screen w-screen bg-neutral-500"
            // isDarkMode && "bg-blue-500"
        )
    );

    const contentClass = classNames(twMerge("relative flex-1 overflow-hidden"));

    return (
        <div className={wrapperClass}>
            <main className={contentClass}>
                <Outlet />
            </main>
        </div>
    );
};

export default App;
