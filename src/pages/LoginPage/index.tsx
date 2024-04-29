import philJustin from "@/assets/phil-justin.png";

// component
import { SigninPanel } from "./SigninPanel";
import { LoginPanel } from "./LoginPanel";
import { useState } from "react";

export const LoginPage: React.FC = () => {
    const [isLoginPanel, setIsLoginPanel] = useState(true);
    return (
        <div className="grid place-items-center bg-blue-500 h-full">
            <div className="rounded-2xl overflow-hidden bg-blue-100 w-1/2 flex">
                <div className=" bg-blue-700 overflow-hidden">
                    <img src={philJustin} />
                </div>
                <div className="w-2/3 flex flex-col py-8 gap-6 px-4 justify-center">
                    {isLoginPanel ? (
                        <LoginPanel setIsLoginPanel={setIsLoginPanel} />
                    ) : (
                        <SigninPanel setIsLoginPanel={setIsLoginPanel} />
                    )}
                </div>
            </div>
        </div>
    );
};
