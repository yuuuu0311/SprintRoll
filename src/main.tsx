import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    // Redirect,
    // Switch,
} from "react-router-dom";

import { DashBoardPage } from "@/pages/DashBoardPage";
import { KanbanPage } from "@/pages/KanbanPage";
import { LoginPage } from "@/pages/LoginPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>

    <BrowserRouter>
        {/* <Switch>
            <Route path="/login" element={<LoginPage />} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Redirect from="/" to="/login" />
        </Switch> */}

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
