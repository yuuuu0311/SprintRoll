// component

export const Layout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className="flex flex-col md:flex-row h-screen w-screen bg-neutral-300 overflow-hidden">
            {children}
        </div>
    );
};
