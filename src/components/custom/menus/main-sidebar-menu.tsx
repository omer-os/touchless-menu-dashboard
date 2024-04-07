"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import Link from "next/link";

export default function MainSidebarMenu() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      {[
        {
          name: "Dashboard",
          href: "/",
        },
        {
          name: "Menu",
          href: "/menu",
        },
      ].map((item, index) => (
        <Link
          href={item.href}
          className={cn(
            "flex items-start rounded p-2 transition-all hover:bg-muted",
            {
              "bg-muted text-foreground": pathname === item.href,
              "bg-card text-muted-foreground": pathname !== item.href,
            },
          )}
          key={index}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
