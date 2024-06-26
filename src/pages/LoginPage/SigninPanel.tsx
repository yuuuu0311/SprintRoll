// import { useHistory } from "react";
// import { useNavigate } from "react-router-dom";
import { useState, Dispatch, SetStateAction } from "react";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// utilities
import { db } from "@/utilities/firebase";

// component
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";

export const SigninPanel: React.FC<{
    setIsLoginPanel: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsLoginPanel }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<Error>();
    const [isSignIn, setIsSignIn] = useState(false);
    const [userInfo, setUserInfo] = useState<{
        email: string;
        password: string;
    }>(() => ({
        email: "",
        password: "",
    }));

    const inputClass = twMerge(
        classNames(
            `text-md px-3 py-2 rounded-md overflow-hidden leading-none  transition w-full`
        )
    );

    const handleSignIn = async () => {
        try {
            setIsLoading(true);
            const auth = getAuth();

            await createUserWithEmailAndPassword(
                auth,
                userInfo.email,
                userInfo.password
            )
                .then(async ({ user }) => {
                    await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        email: user.email,
                    });

                    setIsLoading(false);
                    setIsSignIn(true);
                    setIsLoginPanel((prev) => !prev);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setIsError(error as Error);
                    return;
                });
        } catch (error) {
            setIsError(error as Error);
        }
    };

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="text-3xl font-bold text-neutral-500 mb-4">
                    Sign Up
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
                {isError && (
                    <div className="text-red-500">
                        {isError.message ===
                            "Firebase: Error (auth/email-already-in-use)." &&
                            "email has been used"}
                        {isError.message ===
                            "Firebase: Password should be at least 6 characters (auth/weak-password)." &&
                            "password should be at least 6 characters"}
                    </div>
                )}
                <div className="flex gap-3">
                    <span>
                        Back to{" "}
                        <span
                            className="text-blue-500 cursor-pointer"
                            onClick={() => setIsLoginPanel((prev) => !prev)}
                        >
                            Sign In
                        </span>
                    </span>
                </div>

                <Button
                    rounded
                    primary
                    onClickFun={handleSignIn}
                    addonStyle="w-full flex justify-center"
                >
                    {isLoading ? <Loader addonStyle="h-6 w-6" /> : "Sign Up"}
                </Button>

                {isSignIn && (
                    <div className="text-green-500">Sign Up Successfully</div>
                )}
            </div>
        </div>
    );
};
