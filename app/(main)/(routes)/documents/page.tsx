"use client";

import { Button } from "@/components/ui/button";
import Image from "@/node_modules/next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {toast} from "sonner";
import { useRouter } from "next/navigation"

const DocumentsPage = () => {

    const router = useRouter();
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({ title:"Untitled" })
        .then((documentId) => router.push(`/documents/${documentId}`))

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note."
        });
    }

    return (
        <div className="h-full w-full flex flex-col items-center justify-center space-y-48 dark:bg-[#1F1F1F]">
            <Image 
            src="/empty.png"
            height="300"
            width="300"
            alt="Empty"
            className="dark:hidden"
             />
             <Image 
            src="/empty-dark.png"
            height="300"
            width="300"
            alt="Empty"
            className="hidden dark:block"
             />
             <div>
                <h2 className="text-lg font-medium bold text-justify">
                    Welcome to {user?.firstName}&apos;s Potion
                </h2>
             </div>
             <div>
                <Button onClick={onCreate}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create a note
                </Button>
             </div>
        </div>
    )
};

export default DocumentsPage;