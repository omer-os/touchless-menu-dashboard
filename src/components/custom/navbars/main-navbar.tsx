import { Session } from "@auth/core/types";
import React from "react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import SignoutButton from "../buttons/signout-button";
import NotificationsCenterPopover from "../popovers/notifications-center-popover";
import { api } from "~/trpc/server";

export default async function MainNavbar({
  session,
}: {
  session: Session | null;
}) {
  const mynotifications = await api.notification.getMyNotifications();

  return (
    <div className="border-b bg-background p-4">
      <nav className="flex items-center justify-between">
        <p className="text-lg font-bold">Dashboard</p>

        <div className="flex items-center gap-4">
          <NotificationsCenterPopover mynotifications={mynotifications} />

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
                  {session?.user?.name ??
                    session?.user?.email ??
                    "Unknown User"}
                </p>

                <div className="text-muted-foreground">
                  {session?.user?.email ?? "Unknown Email"}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </div>
  );
}
