import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const BreadCrumbs: React.FC = () => {
    const { project, domain } = useParams();

    return (
        <div className="px-12 py-4 gap-2 text-neutral-500 hidden md:flex">
            <span className="line-clamp-1 max-w-72 text-ellipsis break-words">
                <NavLink to={`/${project}/all`}>{project}</NavLink>
            </span>
            <span>/</span>
            <span className="line-clamp-1 max-w-72 text-ellipsis break-words">
                {domain === undefined ? "all" : domain}
            </span>
        </div>
    );
};
