import React, { ReactNode, LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type FontWeight = "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
export type TextElementType =
    | "p"
    | "span"
    | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    | "pre"
    | "code"
    | "blockquote"
    | "label";

export type TextProps = {
    weight?: FontWeight;
    children: ReactNode;
    className?: string;
    as?: TextElementType;
    htmlFor?: Pick<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor">["htmlFor"];
};

const weightClasses: Record<FontWeight, string> = {
    thin: "font-thin",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
};

const Text = ({
    weight = "normal",
    children,
    className = "",
    as: Component = "p",
    htmlFor,
}: TextProps) => {
    const classes = twMerge(weightClasses[weight], className);
    const props = (() => {
        switch (Component) {
            case "label":
                return { htmlFor }
            default: return {}
        }
    })()

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
};

export default Text;
