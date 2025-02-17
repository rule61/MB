"use client";

import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { set, useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/src/components/ui/input";
import { register } from "@/actions/register"

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

export const RegisterForm = () => {
    const[isPending, startTransition] = useTransition();
    const [error, setError] = useState< string | undefined>("");
    const [success, setSuccess] = useState< string | undefined>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const onSubmit= (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        
        startTransition(() => {
            register(values)
                .then((data)=> {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
    }

    return(
        <CardWrapper 
        headerLabel="Create an account" 
        backButtonHref="/auth/login" 
        backButtonLabel="Already have an account? Login here"
        showSocial>
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                    <div className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Name"
                                        />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
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
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full bg-customBlue shadow-customBlue-500/50 hover:bg-white hover:text-customBlue">
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};