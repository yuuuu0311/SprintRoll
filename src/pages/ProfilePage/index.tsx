import { NavLink } from "react-router-dom";
export const ProfilePage = () => {
    return (
        <div>
            <h3>ProfilePage</h3>
            <ul>
                <li>
                    <NavLink to={`/sprintroll/all`}>SprintRoll</NavLink>
                </li>
            </ul>
        </div>
    );
};
