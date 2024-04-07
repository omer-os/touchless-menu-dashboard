"use client";
import { type VariantProps } from "class-variance-authority";
import { signIn } from "next-auth/react";
import React from "react";
import { Button, buttonVariants } from "~/components/ui/button";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function LoginButton({ children, ...props }: ButtonProps) {
  return (
    <Button onClick={() => signIn()} {...props}>
      {children}
    </Button>
  );
}
