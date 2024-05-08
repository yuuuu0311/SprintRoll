export const Footer: React.FC = () => {
    return (
        <div className="py-24 bg-neutral-400 text-neutral-700">
            <div className="w-3/4 mx-auto">
                <div className="tracking-wide">
                    <div className="text-2xl font-bold mb-2">SprintRoll</div>
                    <div className="text-lg">your best rollup option</div>
                </div>

                <div className="text-xs mt-20 text-center tracking-widest w-full">
                    Copyright © {new Date().getFullYear()} SprintRoll . All
                    rights reserved.
                </div>
            </div>
        </div>
    );
};
