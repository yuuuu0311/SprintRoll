import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// component
import { FloatingTicket } from "@/components/FloatingTicket";
import { SigninPanel } from "./SigninPanel";
import { SignupPanel } from "./SignupPanel";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";

// utilities
import { UserFace } from "@/interface";
import { useUser } from "@/utilities/store";

export const LoginPage: React.FC = () => {
    const { setUser } = useUser<UserFace>((state) => state);
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isLoginPanel, setIsLoginPanel] = useState(true);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const auth = getAuth();

            const { user } = await signInWithEmailAndPassword(
                auth,
                "test123456@gmail.com",
                "test123456"
            );

            if (user.uid === null || user.email === null) return;

            localStorage.setItem("userID", user.uid);
            localStorage.setItem("userEmail", user.email);

            setUser({ uid: user.uid, email: user.email } as UserFace);
            setIsLoading(false);
            setIsLogin(true);
        } catch (error) {
            console.log(error);
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (isLogin) navigate("/profile/overview");
    }, [isLogin, navigate]);

    return (
        <div className="grid place-items-center bg-neutral-300 h-full">
            <div className="rounded-2xl overflow-hidden bg-stone-100 md:w-2/3 md:h-2/3 w-full h-full flex flex-col md:flex-row shadow-xl">
                <div className="w-1/2 overflow-hidden relative bg-neutral-400">
                    <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                            className="opacity-50"
                            initial={{
                                scale: 1.5,
                            }}
                            animate={{
                                scale: 1.5,
                            }}
                            transition={{
                                duration: 3,
                                ease: "easeInOut",
                            }}
                        >
                            {Array.from(Array(10)).map((ele, index) => (
                                <FloatingTicket
                                    key={`${ele}+${index}`}
                                    index={index}
                                    domain={0}
                                />
                            ))}
                            {Array.from(Array(8)).map((ele, index) => (
                                <FloatingTicket
                                    key={`${ele}+${index}`}
                                    index={index}
                                    domain={1}
                                />
                            ))}
                            {Array.from(Array(5)).map((ele, index) => (
                                <FloatingTicket
                                    key={`${ele}+${index}`}
                                    index={index}
                                    domain={2}
                                />
                            ))}
                            {Array.from(Array(10)).map((ele, index) => (
                                <FloatingTicket
                                    key={`${ele}+${index}`}
                                    index={index}
                                    domain={3}
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col p-14 gap-6 justify-center">
                    {isLoginPanel ? (
                        <SignupPanel setIsLoginPanel={setIsLoginPanel} />
                    ) : (
                        <SigninPanel setIsLoginPanel={setIsLoginPanel} />
                    )}
                    <hr className="border-neutral-300" />
                    <Button
                        rounded
                        success
                        onClickFun={handleLogin}
                        addonStyle="w-full flex justify-center"
                    >
                        {isLoading ? (
                            <Loader addonStyle="h-6 w-6 text-white" />
                        ) : (
                            "Sign In with test account"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};
