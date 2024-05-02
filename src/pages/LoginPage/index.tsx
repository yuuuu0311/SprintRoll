import philJustin from "@/assets/phil-justin.png";

// component
import { SigninPanel } from "./SigninPanel";
import { LoginPanel } from "./LoginPanel";
import { useState } from "react";

export const LoginPage: React.FC = () => {
    const [isLoginPanel, setIsLoginPanel] = useState(true);
    return (
        <div className="grid place-items-center bg-neutral-300  h-full">
            <div className="rounded-2xl overflow-hidden bg-stone-100 w-2/3 flex">
                <div className="w-1/2 overflow-hidden">
                    <img src={philJustin} />
                </div>
                <div className="flex-1 flex flex-col p-14 gap-6 justify-center">
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
