"use client"

import {Header}from "./header";
import { Social } from "./social";
import { 
    Card,
    CardContent,
    CardHeader,
    CardFooter
 } from "@/src/components/ui/card";
import { BackButton } from "./back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children, 
    headerLabel,
    backButtonHref, 
    backButtonLabel, 
    showSocial
} : CardWrapperProps) => {
    return(
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social/>
                </CardFooter>
            )}
            <CardFooter>
                <BackButton href={backButtonHref} label={backButtonLabel} /> 
            </CardFooter>
        </Card>
    );
};
