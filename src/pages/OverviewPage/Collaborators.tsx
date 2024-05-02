import { useCollaborators } from "@/utilities/hook";

import { removeCollaborator } from "@/utilities";

interface collaborator {
    uid: string;
    name: string;
    role: number;
}

export const Collaborators: React.FC<{ projectID: string | undefined }> = ({
    projectID,
}) => {
    const { collaborators } = useCollaborators(projectID);

    return (
        <div>
            {collaborators?.map((collaborator: collaborator) => (
                <div
                    key={collaborator.uid}
                    className="flex gap-8 items-center py-2"
                >
                    <div className="flex gap-2 items-center">
                        <div>avatar</div>
                        <div>{collaborator.uid}</div>
                    </div>

                    <div
                        className="ml-auto bg-rose-500 text-white rounded-full cursor-pointer hover:bg-rose-600 transition flex items-center justify-center w-6 h-6"
                        onClick={() =>
                            removeCollaborator(projectID, collaborator.uid)
                        }
                    >
                        -
                    </div>
                </div>
            ))}
        </div>
    );
};
