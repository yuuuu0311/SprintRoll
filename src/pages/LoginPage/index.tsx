import philJustin from "@/assets/phil-justin.png";

// component
import { SigninPanel } from "./SigninPanel";
import { LoginPanel } from "./LoginPanel";

export const LoginPage: React.FC = () => {
    return (
        <div className="grid place-items-center bg-blue-500 h-full">
            <div className="rounded-2xl overflow-hidden bg-blue-100 w-1/2 flex">
                <div className=" bg-blue-700 overflow-hidden">
                    <img src={philJustin} />
                </div>
                <div className="w-2/3 flex flex-col py-8 gap-6 px-12 justify-center">
                    <h1>SprintRoll</h1>
                    <h3>Your best rollup option</h3>

                    <SigninPanel />
                    <LoginPanel />
                </div>
            </div>
        </div>
    );
};
