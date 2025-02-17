import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { signOut } from "@/src/auth";
  

export default function Header() {
    return (
        <div className="bg-customBlue w-full text-white font-[Roboto] pr-10 pl-10 h-[10vh] flex items-center justify-between sm:text-sm md:text-md lg:text-lg xl:text-xl">
            <a href="/" className="text-[24px] font-extrabold">MindBridge</a>
            <div className="flex items-center">
                <Link href="../pages/courses">
                    <Button className="!bg-transparent !shadow-none text-lg font-black rounded-s border-none hover:underline hover:underline-offset-4">
                        Courses
                    </Button>
                </Link>
                <Link href="../pages/podcasts">
                    <Button className="!bg-transparent !shadow-none text-lg font-black rounded-s border-none hover:underline hover:underline-offset-4">
                        Podcasts
                    </Button>
                </Link>
                <Link href="../pages/forum">
                    <Button className="!bg-transparent !shadow-none text-lg font-black rounded-s border-none hover:underline hover:underline-offset-4">
                        Forum
                    </Button>
                </Link>
                <Link href="/services">
                    <Button className="!bg-transparent !shadow-none text-lg font-black rounded-s border-none hover:underline hover:underline-offset-4">
                        Services
                    </Button>
                </Link>
                <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button size="icon" className="bg-transparent !shadow-none hover:bg-white group">
                                <Menu className="h-25 w-25 text-white group-hover:text-customBlue" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                Account
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href="">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/pages/settings">Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="">Support</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <form action={
                                    async () => {
                                        "use server"

                                        await signOut();
                                    }
                                }>
                                    <button type="submit">Log Out</button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}