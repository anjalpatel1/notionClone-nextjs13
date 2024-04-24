"use client";

import { useEffect, useState } from "react";

import { SettingsModal } from "@/components/ui/modals/settings-modal";
import { CoverImageModal } from "@/components/ui/modals/cover-image-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <SettingsModal />
            <CoverImageModal />
        </>
    );

};