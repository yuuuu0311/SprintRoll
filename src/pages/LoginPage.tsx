import philJustin from "../assets/phil-justin.png";
// import { useHistory } from "react";
import { useNavigate } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { setDoc, doc } from "firebase/firestore";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

// utilities
import { db } from "@/utilities/firebase";

// component
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";

export const LoginPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
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

    const handleSignIn = async () => {
        try {
            setIsLoading(true);
            const auth = getAuth();
            const { user } = await createUserWithEmailAndPassword(
                auth,
                userInfo.email,
                userInfo.password
            );

            if (!user.uid) setIsError(true);

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
            });

            setIsLoading(false);
            setIsSignIn(true);
        } catch (error) {
            setIsLoading(false);
            setIsError(true);
            console.error(error);
        }
    };

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const auth = getAuth();
            const { user } = await signInWithEmailAndPassword(
                auth,
                userInfo.email,
                userInfo.password
            );

            if (!user.uid) setIsError(true);

            setIsLoading(false);
            setIsLogin(true);
        } catch (error) {
            console.log(error);

            console.log("has user");
        }
    };

    useEffect(() => {
        if (isLogin) navigate("/all");
    }, [isLogin, navigate]);

    return (
        <div className="grid place-items-center bg-blue-500 h-full">
            <div className="rounded-2xl overflow-hidden bg-blue-100 w-1/2 flex">
                <div className=" bg-blue-700 overflow-hidden">
                    <img src={philJustin} />
                </div>
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
                                something went wrong
                            </div>
                        )}
                        {isSignIn && (
                            <div className="text-green-500">signIn success</div>
                        )}
                    </div>
                    <div className="flex  gap-2 justify-end ">
                        <Button rounded onClickFun={handleSignIn}>
                            signIn
                        </Button>
                        <Button rounded onClickFun={handleLogin}>
                            login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
