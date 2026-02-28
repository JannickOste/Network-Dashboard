import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Text from "./Text";

export type HeaderProps = {
    level?: 1 | 2 | 3 | 4 | 5;
    children: ReactNode;
    className?: string;
    color?: string;
};

const Header = ({
    level = 1,
    children,
    className = ""
}: HeaderProps) => {
    const sizeClasses: Record<number, string> = {
        1: "text-4xl font-bold",
        2: "text-3xl font-semibold",
        3: "text-2xl font-semibold",
        4: "text-xl font-medium",
        5: "text-lg font-medium",
    };
    const globalClasses = "text-gray-700";
    const classes = twMerge(sizeClasses[level], globalClasses, className);

    return <Text className={classes} as={`h${level}`}>
        {children}
    </Text>;
};

export default Header;
