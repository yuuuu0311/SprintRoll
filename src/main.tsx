import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "@/components/Layout.tsx";

import { KanbanPage } from "./pages/KanbanPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<KanbanPage />} />
                <Route path="/:domain" element={<KanbanPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
