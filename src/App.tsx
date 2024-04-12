import { Outlet } from "react-router-dom";
import "./App.css";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// component
import { TabNavigation } from "@/components/TabNavigation";

const App: React.FC = () => {
    const wrapperClass = classNames(
        twMerge(
            "flex h-screen w-screen bg-gray-500"
            // isDarkMode && "bg-blue-500"
        )
    );

    const contentClass = classNames(twMerge("flex-1"));

    return (
        <div className={wrapperClass}>
            <TabNavigation />
            <main className={contentClass}>
                <Outlet />
            </main>
        </div>
    );
};

export default App;
