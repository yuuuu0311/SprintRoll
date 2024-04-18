// dependency
import { ChangeEvent, useState } from "react";
import { db } from "@/utilities/firebase";
import { addDoc, collection } from "firebase/firestore";

// components
import { Dialog } from "@/components/Dialog";
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
        <>
            {isActive && (
                <Dialog
                    handleDialogToggle={() => toggleDialog(isActive)}
                    title="add category"
                >
                    <div>
                        <div>
                            <label htmlFor="name">title</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="title goes here"
                                value={collectionName}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            link
                            rounded
                            onClickFun={() => toggleDialog(isActive)}
                        >
                            close
                        </Button>
                        <Button
                            link
                            primary
                            rounded
                            onClickFun={handleAddCollection}
                        >
                            add
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
