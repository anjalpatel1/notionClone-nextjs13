"use client";

import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/spinner";
import Link from "@/node_modules/next/link";
import { SignInButton } from "@clerk/clerk-react"



export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:5xl md:text-6xl font-bold">
                Your Ideas, documents & plans, unified. Welcome to <span className="underline">Potion</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Potion is the connected workspace where better, faster work happens. 
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                 <Spinner size="lg" />
                </div>
            )}
            {isAuthenticated && !isLoading && (
            <Button asChild>
                <Link href="/documents">
                Enter Potion
                <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
            </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                        Get Potion free
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
        </div>
    )
}