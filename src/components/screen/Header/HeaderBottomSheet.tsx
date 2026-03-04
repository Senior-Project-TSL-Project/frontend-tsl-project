"use client";
import { IconButton } from "@/components/buttons/IconButton";
import { Text } from "@/components/typography/Text";

interface HeaderBottomSheetProps {
    title: string;
    onClose: () => void;
}

export function HeaderBottomSheet({ title, onClose }: HeaderBottomSheetProps) {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-t-3xl">
            <Text type="label" size="large" weight="large" className="text-center">{title}</Text>
            <IconButton tooltipContent="Close" icon="mdi:close" onClick={onClose} size={24} />
        </div>
    );
}
