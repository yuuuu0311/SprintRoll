import { Outlet } from "react-router-dom";

import "./App.css";

const App: React.FC = () => {
    return (
        <div className="flex h-screen w-screen bg-neutral-500">
            <main className="relative flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
};

export default App;
