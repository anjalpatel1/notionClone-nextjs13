"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";

import { Popover,
        PopoverContent,
        PopoverTrigger
        }  from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { api } from "@/convex/_generated/api";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Check } from "lucide-react";
import { Copy } from "lucide-react";

interface PublishProps {
    initialData: Doc<"documents">
};

export const Publish = ({
    initialData
}: PublishProps) => {

    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const [ copied, setCopied ] = useState(false);
    const [ isSubmitting, setIsSubmitting ] = useState(false);

    const url = `${origin}/preview/${initialData._id}`; 

    const onPublish = () => {
        setIsSubmitting(true);

        const promise = update ({
            id: initialData._id,
            isPublished: true,
        })
        .finally(() => setIsSubmitting(false));

        toast.promise (promise, {
            loading: "Publishing...",
            success:"Note published!" ,
            error: "Failed to publish",
        });
    };

    const onUnPublish = () => {
        setIsSubmitting(true);

        const promise = update ({
            id: initialData._id,
            isPublished: false,
        })
        .finally(() => setIsSubmitting(false));

        toast.promise (promise, {
            loading: "Unpublishing...",
            success:"Note Unpublished!" ,
            error: "Successfully Unpublished",
        });
    };


    const onCopy = () => {
        navigator.clipboard.writeText(url);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000)
    };


   return (
    <Popover>
        <PopoverTrigger asChild>
            <Button size="sm" variant="ghost"> 
                Publish
                {initialData.isPublished && <Globe 
                className="text-sky-500 w-4 h-4 ml-2"
                />}
            </Button>
        </PopoverTrigger>
        <PopoverContent
        className='w-72'
        align="end"
        alignOffset= {8}
        forceMount
        >
            {initialData.isPublished ? (
                <div className="space-y-4">
                    <div className="flex items-center gap-x-2">
                        <Globe 
                        className="text-sky-500 animate-pulse h-4 w-4"
                        />
                        <p className="text-xs font-medium text-sky-500 "> This note is live on the web. </p>
                    </div>
                    <div className="flex items-center">
                        <input 
                        value={url}
                        className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                        disabled
                        />
                    </div>
                    <div>
                    <Button 
                    onClick={onCopy}
                    disabled={copied}
                    className="h-8 rounded-l-none"
                    >
                        {copied ? (
                            <Check className="h-4 w-4" />
                        ): (
                            <Copy className="h-4 w-4" />
                        )}
                    </Button>
                    </div>
                    <div>
                    <Button className="w-full text-xs" size='sm' disabled={isSubmitting} onClick={onUnPublish}>
                        Unpublish
                    </Button>
                    </div>
                    </div>
                ): (
                    <div className="flex flex-col items-center justify-center ">
                    <Globe
                    className="h-8 w-8 text-muted-foreground mb-2"
                    />
                    <p className="text-sm mb-2 font-medium">
                        Publish this Note.
                    </p>
                    <span className="text-xs text-muted-foreground mb-4">
                        Share your work with others.
                    </span>
                    <Button
                    className="w-full text-sm"
                    disabled={isSubmitting}
                    onClick={onPublish}
                    size="sm"
                    >
                        Publish
                    </Button>
                </div>
            )}
        </PopoverContent>
    </Popover>
   )
}