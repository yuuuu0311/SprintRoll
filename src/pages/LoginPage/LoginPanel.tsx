import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// utilities

// component
import { Button } from "@/components/Button";

export const LoginPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<Error>();

    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState<{
        email: string;
        password: string;
    }>(() => ({
        email: "",
        password: "",
    }));

    const navigate = useNavigate();

    const inputClass = twMerge(
        classNames(
            `text-md px-3 py-2 rounded-md overflow-hidden leading-none  transition `
        )
    );

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const auth = getAuth();
            await signInWithEmailAndPassword(
                auth,
                userInfo.email,
                userInfo.password
            );

            setIsLoading(false);
            setIsLogin(true);
        } catch (error) {
            setIsError(error as Error);
        }
    };

    useEffect(() => {
        if (isLogin) navigate("/all");
    }, [isLogin, navigate]);

    return (
        <div className="w-2/3 flex flex-col py-8 gap-6 px-12 justify-center">
            <div className="flex flex-col gap-4">
                <div>
                    <input
                        className={inputClass}
                        type="email"
                        placeholder="email"
                        value={userInfo.email}
                        onChange={(e) =>
                            setUserInfo((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                    />
                </div>
                <div>
                    <input
                        className={inputClass}
                        type="password"
                        placeholder="password"
                        value={userInfo.password}
                        onChange={(e) =>
                            setUserInfo((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    />
                </div>
                {isLoading && <div>loading</div>}
                {isError && (
                    <div className="text-red-500">
                        {isError.message ===
                            "Firebase: Error (auth/email-already-in-use)." &&
                            "email has been used"}
                    </div>
                )}
            </div>
            <div className="flex  gap-2 justify-end ">
                <Button rounded primary onClickFun={handleLogin}>
                    login
                </Button>
            </div>
        </div>
    );
};
