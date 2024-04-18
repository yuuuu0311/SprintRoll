import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { DashBoardPage } from "@/pages/DashBoardPage/index.tsx";
import { KanbanPage } from "@/pages/KanbanPage/index.tsx";
import { LoginPage } from "@/pages/LoginPage/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index path="/" element={<LoginPage />} />
                <Route path="/all" element={<DashBoardPage />} />
                <Route path="/:domain" element={<KanbanPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
