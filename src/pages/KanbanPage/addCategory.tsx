// dependency
import { ChangeEvent, useState } from "react";
import { db } from "@/utilities/firebase";
import { addDoc, collection } from "firebase/firestore";

// components
import { Button } from "@/components/Button";

// interface
import { useDialog } from "@/utilities/store";
import { CollectionFace, DialogState } from "@/interface";

export const AddCategoryDialog: React.FC<{
    collectionsData: CollectionFace[] | undefined;
    domain: string | undefined;
}> = ({ collectionsData, domain }) => {
    const { isActive, toggleDialog } = useDialog<DialogState>((state) => state);
    const [collectionName, setCollectionName] = useState("");

    const handleAddCollection: () => void = async () => {
        if (collectionName === "") return;
        if (collectionsData === undefined) return;

        toggleDialog(isActive);

        const collectionsRef = collection(db, "collections");
        await addDoc(collectionsRef, {
            domain: domain?.toLowerCase(),
            order: collectionsData.length,
            product: "SprintRoll",
            name: collectionName,
        });

        setCollectionName("");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCollectionName(() => e.target.value);
    };

    return (
        <div className="flex flex-col gap-2 bg-neutral-200 p-4 rounded-lg w-56">
            <div className="mb-2">
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={collectionName}
                    placeholder="Collection Title"
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    className="text-md px-3 py-2 w-full rounded-md overflow-hidden leading-none outline-none transition focus:bg-neutral-300 bg-neutral-300"
                />
            </div>
            <div className="flex justify-end gap-2">
                <Button
                    rounded
                    secondary
                    onClickFun={() => toggleDialog(isActive)}
                >
                    Close
                </Button>
                <Button success rounded onClickFun={handleAddCollection}>
                    Add
                </Button>
            </div>
        </div>
    );
};
