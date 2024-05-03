import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// utilities
import { UserFace } from "@/interface";
import { useUser } from "@/utilities/store";

// component
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";

export const LoginPanel: React.FC<{
    setIsLoginPanel: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsLoginPanel }) => {
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

    const { setUser } = useUser<UserFace>((state) => state);

    const inputClass = twMerge(
        classNames(
            `text-md px-3 py-2 rounded-md overflow-hidden leading-none transition w-full`
        )
    );

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const auth = getAuth();

            const { user } = await signInWithEmailAndPassword(
                auth,
                userInfo.email,
                userInfo.password
            );

            if (user.uid === null || user.email === null) return;

            localStorage.setItem("userID", user.uid);
            localStorage.setItem("userEmail", user.email);

            setUser({ uid: user.uid, email: user.email } as UserFace);

            setIsLoading(false);
            setIsLogin(true);
        } catch (error) {
            setIsError(error as Error);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) navigate("/profile/overview");
    }, [isLogin, navigate]);

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="text-3xl font-bold text-neutral-500 mb-4">
                    Login
                </div>
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

                <div className="flex gap-3">
                    <span>Don't have an account ?</span>
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsLoginPanel((prev) => !prev)}
                    >
                        Sign up
                    </span>
                </div>
                <div>
                    <Button
                        rounded
                        primary
                        onClickFun={handleLogin}
                        addonStyle="w-full flex justify-center"
                    >
                        {isLoading ? <Loader addonStyle="h-6 w-6" /> : "Login"}
                    </Button>
                </div>
                {isError && (
                    <div className="text-red-500">
                        {isError.message ===
                            "Firebase: Error (auth/email-already-in-use)." &&
                            "email has been used"}
                    </div>
                )}
            </div>
        </div>
    );
};
