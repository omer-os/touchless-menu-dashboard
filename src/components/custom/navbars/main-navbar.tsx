import { Session } from "@auth/core/types";
import React from "react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import SignoutButton from "../buttons/signout-button";

export default function MainNavbar({ session }: { session: Session | null }) {
  return (
    <div className="border-b bg-background p-4">
      <nav className="flex items-center justify-between">
        <p className="text-lg font-bold">Dashboard</p>

        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src={session?.user?.image ?? ""} />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col">
              <div className="flex items-start justify-between">
                <Avatar>
                  <AvatarImage src={session?.user?.image ?? ""} />
                </Avatar>

                <SignoutButton size="sm">Sign Out</SignoutButton>
              </div>
              <p className="mt-2 text-lg font-bold">
                {session?.user?.name ?? session?.user?.email ?? "Unknown User"}
              </p>

              <div className="text-muted-foreground">
                {session?.user?.email ?? "Unknown Email"}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </nav>
    </div>
  );
}
