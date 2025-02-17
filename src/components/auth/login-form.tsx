"use client";

import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { set, useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { Input } from "@/src/components/ui/input";
import { login } from "@/actions/login"

import * as z from "zod";

import {
    Form,
    FormControl,
    FormField, 
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form"
import { Button } from "../ui/button";
import { on } from "events";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email is already in use with different provider!" : "";

    const[isPending, startTransition] = useTransition();
    const [error, setError] = useState< string | undefined>("");
    const [success, setSuccess] = useState< string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit= (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        
        startTransition(() => {
            login(values)
                .then((data)=> {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        });
    }

    return(
        <CardWrapper 
        headerLabel="Welcome back!" 
        backButtonHref="/auth/register" 
        backButtonLabel="Don't have an account? Sign up"
        showSocial>
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                    <div className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="email"
                                            placeholder="example@gmail.com"
                                        />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="password"
                                            placeholder="********"
                                        />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full bg-customBlue shadow-customBlue-500/50 hover:bg-white hover:text-customBlue">
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};