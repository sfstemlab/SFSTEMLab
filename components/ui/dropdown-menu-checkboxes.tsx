"use client";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface Props {
  content: string;
  possibilities?: (string | number)[];
  onChange?: (...args: any[]) => void;
}

export function DropdownMenuCheckboxes({
    content,
    possibilities = [],
    onChange,
}: Props) {
    const [checkedItems, setCheckedItems] = useState<
        Record<string | number, Checked>
    >(() => {
        let initial: Record<string | number, Checked> = {};
        possibilities.forEach((p) => {
            initial[p] = false;
        });
        return initial;
    });

    const selectedItems = Object.entries(checkedItems)
        .filter(([, checked]) => checked)
        .map(([key]) => key);

    const toggleChecked = (item: string | number) => {
        setCheckedItems((prev) => {
            const updated = {
                ...prev,
                [item]: !prev[item],
            };

            const newSelected = Object.entries(updated)
                .filter(([, checked]) => checked)
                .map(([key]) => key);

            onChange?.(newSelected);
            return updated;
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "p-1 text-center bg-brand/75 rounded-md w-full h-auto hover:bg-brand/90 transition duration-500 ease-in-out",
                        selectedItems.length > 0 ? "text-white" : "text-gray-500"
                    )}
                >
                    {selectedItems.length > 0
                        ? selectedItems.join(", ")
                        : "Click to select options"}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{content}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.entries(checkedItems).map(([key, value]) => (
                    <DropdownMenuCheckboxItem
                        key={key}
                        checked={value}
                        onCheckedChange={() => toggleChecked(key)}
                    >
                        {key}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
