import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import LoginButton from "~/components/custom/buttons/login-button";
import { getServerAuthSession } from "~/server/auth";

export default async function page() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoginButton variant={"secondary"}>Login</LoginButton>
    </div>
  );
}
