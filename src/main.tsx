import ReactDOM from "react-dom/client";
import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { DashBoardPage } from "@/pages/DashBoardPage";
import { KanbanPage } from "@/pages/KanbanPage";
import { ProjectPage } from "@/pages/ProjectPage";
import { ProfilePage } from "./pages/ProfilePage";
import { OverviewPage } from "@/pages/OverviewPage";
// import { SettingPage } from "@/pages/SettingPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <div className="flex h-screen w-screen bg-neutral-300 dark:bg-neutral-800">
        <main className="relative flex-1 ">
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="profile" element={<ProfilePage />}>
                        <Route path="overview" element={<OverviewPage />} />
                        {/* <Route path="setting" element={<SettingPage />} /> */}
                    </Route>

                    <Route path=":project" element={<ProjectPage />}>
                        <Route path="all" element={<DashBoardPage />} />
                        <Route path=":domain" element={<KanbanPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </main>
    </div>
);
