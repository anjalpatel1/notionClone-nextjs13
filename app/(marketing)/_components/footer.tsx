import { Button } from "@/components/ui/button"

import { Logo } from "./logo"

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50 h-full dark:bg-[#1F1F1F] ">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex tems-center gap-x-2 text-muted-foreground">   
                <Button variant="ghost" size="sm">
                    Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                    Terms and Conditions
                </Button>
            </div>
        </div>
    )
}

