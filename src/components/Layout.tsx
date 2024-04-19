// component
import { TabNavigation } from "@/components/TabNavigation";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className="flex h-screen w-screen bg-neutral-300">
            <TabNavigation />
            <main className="relative flex-1 overflow-hidden">{children}</main>
        </div>
    );
};
