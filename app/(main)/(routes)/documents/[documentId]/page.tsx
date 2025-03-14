"use client";

import { useQuery, useMutation } from "convex/react";
import  dynamic  from "@/node_modules/next/dynamic";
import { useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    };
}; 

const DocumentIdPage = ({
    params
}: DocumentIdPageProps) => {

    const Editor = useMemo(() => dynamic(() => import("@/components/editor"),{ssr:false}),[])
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    });

    const update = useMutation(api.documents.update);

    const onChange = (content:string) => {
        update({
            id: params.documentId,
            content
        });
    };

    if(document === undefined) {
       return (
       <div>
            <Cover.Skeleton />
            <div className="md:max-w-2xl lg:max-w-4xl mx-auto w-fit">
                <div className="space-y-4 pl-8 pt-4">
                    <Skeleton className="h-14 w-[50%]" />
                    <Skeleton className="h-14 w-[89%]" />
                    <Skeleton className="h-14 w-[40%]" />
                    <Skeleton className="h-14 w-[60%]" />
                </div>
            </div>
        </div>
       )
    };

    if (document === null) {
        return <div> Not found</div>
    }

    return ( 
        <div className="pb-40">
            <Cover url={document.coverImage} />
            <div className="md:max-w-2xl lg:max-w-2xl h-screen w-fit dark-bg:[#1F1F1F]">
                <Toolbar initialData={document} />
                <Editor 
                onChange={onChange}
                initialContent={document.content}
                />
            </div>
        </div>
     )
}
 
export default DocumentIdPage;