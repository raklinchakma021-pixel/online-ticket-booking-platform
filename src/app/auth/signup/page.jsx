"use client";

import { useState } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input, FieldError } from "@heroui/react";
import { Description, Radio, RadioGroup } from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole } from "@gravity-ui/icons";
import {signIn, signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";


export default function SignupPage() {
    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const searchParams = useSearchParams();
        const redirectTo = searchParams.get("redirect") || "/";
   const [role, setRole] = useState("admin");
    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);
const handleGoogleSignup = async () => {
  try {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  } catch (error) {
    console.error(error);
    setError("Failed to sign in with Google");
  }
};
    const handleSignup = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const { data, error: authError } = await signUp.email({
                email,
                password,
                name,
             
                
            });

            if (authError) {
                setError(authError.message || "Something went wrong during signup.");
            } else {
                setSuccess("Account created successfully! Welcome.");
                setName("");
                setEmail("");
                setPassword("");
                  router.push(redirectTo);
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">

                {/* Header Container */}
                <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Create an account</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Fill in the fields below to get started</p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSignup} className="flex flex-col gap-5">

                    {/* Name Field */}
                    <TextField isRequired name="name" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <Person className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Email Field */}
                    <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <At className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Password Field */}
                    <TextField isRequired name="password" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="Choose a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                            <button
                                className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </InputGroup>
                    </TextField>
    {/* Role Selection */}
                    {/* <div className="flex flex-col gap-4">
                        <Label>Account Role</Label>
                        <RadioGroup defaultValue="admin" name="role" className="flex" onChange = {value => setRole(value)} orientation="horizontal">
                            <Radio value="user">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label>User</Label>
                                </Radio.Content>
                            </Radio>
                            <Radio value="vendor">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label>Vendor</Label>
                                </Radio.Content>
                            </Radio>
                            <Radio value="admin">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label>Admin</Label>
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div> */}
                    {/* Dynamic Status Badges */}
                    {error && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                            <span className="font-semibold">Success:</span> {success}
                        </div>
                    )}

                    {/* Action Button */}
                   <Button
  type="submit"
  color="primary"
  className="w-full h-12 rounded-xl bg-primary text-blue text-sm font-semibold shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
  isLoading={isLoading}
  isDisabled={isLoading}
>
  Sign Up
</Button>

<Button
  type="button"
  variant="bordered"
  className="w-full h-12 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-medium flex items-center justify-center gap-3"
  onClick={handleGoogleSignup}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="20"
    height="20"
    className="shrink-0"
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.193 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.053 6.053 29.277 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 12 24 12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.053 6.053 29.277 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.177 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.145 35.091 26.671 36 24 36c-5.173 0-9.627-3.329-11.287-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 01-4.084 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>

  <span>Continue with Google</span>
</Button>

                    {/* Navigation Option */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Already have an account?{" "}
                        <Link href={`/auth/signin?redirect=${redirectTo}    `} className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400">
                            Sign in instead
                        </Link>
                    </div>

                </form>
            </Card>
        </div>
    );
}