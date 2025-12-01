import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

interface HoverContextType {
    isHovered: boolean;
    setIsHovered: (hovered: boolean) => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export const HoverProvider = ({ children }: { children: ReactNode }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <HoverContext.Provider value={{ isHovered, setIsHovered }}>
            {children}
        </HoverContext.Provider>
    );
};

export const useHover = () => {
    const context = useContext(HoverContext);
    if (context === undefined) {
        throw new Error('useHover must be used within a HoverProvider');
    }
    return context;
};
