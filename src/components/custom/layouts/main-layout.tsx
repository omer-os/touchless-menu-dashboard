import React from "react";
import MainSidebar from "../sidebars/main-sidebar";
import MainNavbar from "../navbars/main-navbar";
import { getServerAuthSession } from "~/server/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <div className="flex h-screen overflow-hidden">
      <MainSidebar />

      <div className="flex h-full flex-1 flex-col">
        <MainNavbar session={session} />

        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
