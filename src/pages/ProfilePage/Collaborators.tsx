import { useCollaborators } from "@/utilities/hook";

interface collaborator {
    uid: string;
    name: string;
    role: number;
}

export const Collaborators: React.FC<{ projectID: string | undefined }> = ({
    projectID,
}) => {
    const { collaborators } = useCollaborators(projectID);

    console.log(projectID, collaborators);

    return (
        <div className="border-b-2 border-b-solid border-b-neutral-300">
            {collaborators?.map((collaborator: collaborator) => (
                <div
                    key={collaborator.uid}
                    className="flex gap-2 items-center py-2"
                >
                    <div>avatar</div>
                    <div>{collaborator.uid}</div>
                    <div className="ml-8 bg-rose-500 text-white rounded-full grid place-items-center px-2 cursor-pointer hover:bg-rose-600 transition">
                        -
                    </div>
                </div>
            ))}
        </div>
    );
};
