import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";
import { cn } from "~/lib/utils";

interface AccordionContextType {
    activeItems: string[];
    toggleItem: (id: string) => void;
    isItemActive: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
    undefined
);

const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion components must be used within an Accordion");
    }
    return context;
};

interface AccordionProps {
    children: ReactNode;
    defaultOpen?: string;
    allowMultiple?: boolean;
    className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
                                                        children,
                                                        defaultOpen,
                                                        allowMultiple = false,
                                                        className = "",
                                                    }) => {
    const [activeItems, setActiveItems] = useState<string[]>(
        defaultOpen ? [defaultOpen] : []
    );

    const toggleItem = (id: string) => {
        setActiveItems((prev) => {
            if (allowMultiple) {
                return prev.includes(id)
                    ? prev.filter((item) => item !== id)
                    : [...prev, id];
            } else {
                return prev.includes(id) ? [] : [id];
            }
        });
    };

    const isItemActive = (id: string) => activeItems.includes(id);

    return (
        <AccordionContext.Provider
            value={{ activeItems, toggleItem, isItemActive }}
        >
            <div className={`space-y-4 ${className}`}>{children}</div>
        </AccordionContext.Provider>
    );
};

interface AccordionItemProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
                                                                id,
                                                                children,
                                                                className = "",
                                                            }) => {
    const { isItemActive } = useAccordion();
    const isActive = isItemActive(id);

    return (
        <div className={cn(
            "group overflow-hidden transition-all duration-500 ease-in-out",
            isActive 
                ? "shadow-xl scale-[1.01] border-2 border-blue-200" 
                : "shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300",
            className
        )}>
            {children}
        </div>
    );
};

interface AccordionHeaderProps {
    itemId: string;
    children: ReactNode;
    className?: string;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
                                                                    itemId,
                                                                    children,
                                                                    className = "",
                                                                    icon,
                                                                    iconPosition = "right",
                                                                }) => {
    const { toggleItem, isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    const defaultIcon = (
        <div className="relative">
            {/* Background glow effect */}
            <div className={cn(
                "absolute inset-0 rounded-full blur-md opacity-0 transition-opacity duration-300",
                isActive ? "opacity-30 bg-blue-400" : "group-hover:opacity-20 group-hover:bg-purple-400"
            )}></div>
            
            {/* Icon container */}
            <div className={cn(
                "relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                isActive 
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-blue-200" 
                    : "bg-white text-gray-600 group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-purple-50 group-hover:text-blue-600"
            )}>
                <svg
                    className={cn("w-5 h-5 transition-all duration-300", {
                        "rotate-180 scale-110": isActive,
                        "group-hover:scale-110": !isActive
                    })}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </div>
    );

    const handleClick = () => {
        toggleItem(itemId);
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "w-full px-8 py-6 text-left focus:outline-none transition-all duration-300 flex items-center justify-between cursor-pointer relative overflow-hidden group",
                isActive 
                    ? "bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50" 
                    : "bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50",
                className
            )}
        >
            {/* Animated background effect */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 transition-opacity duration-300",
                isActive ? "opacity-100" : "group-hover:opacity-50"
            )}></div>
            
            <div className="relative z-10 flex items-center space-x-4 flex-1">
                {iconPosition === "left" && (icon || defaultIcon)}
                <div className="flex-1 min-w-0">
                    {children}
                </div>
            </div>
            
            {iconPosition === "right" && (
                <div className="relative z-10 ml-4">
                    {icon || defaultIcon}
                </div>
            )}
            
            {/* Ripple effect on click */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
        </button>
    );
};

interface AccordionContentProps {
    itemId: string;
    children: ReactNode;
    className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
                                                                      itemId,
                                                                      children,
                                                                      className = "",
                                                                  }) => {
    const { isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    return (
        <div
            className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out",
                isActive 
                    ? "max-h-[2000px] opacity-100" 
                    : "max-h-0 opacity-0",
                className
            )}
        >
            <div className={cn(
                "transition-all duration-300",
                isActive ? "transform translate-y-0" : "transform -translate-y-4"
            )}>
                {children}
            </div>
        </div>
    );
};