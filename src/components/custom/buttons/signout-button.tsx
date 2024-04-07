"use client";
import React from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { signOut } from "next-auth/react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function SignoutButton({ children, ...props }: ButtonProps) {
  return (
    <Button onClick={() => signOut()} {...props}>
      {children}
    </Button>
  );
}
