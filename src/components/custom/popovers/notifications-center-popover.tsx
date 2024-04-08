"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import SignoutButton from "../buttons/signout-button";
import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { Bell } from "lucide-react";
import { Notification, User } from "@prisma/client";
import { api } from "~/trpc/react";

export default function NotificationsCenterPopover({
  mynotifications,
}: {
  mynotifications: (Notification & { User: User })[];
}) {
  const session = useSession();
  const [isOpen, setisOpen] = useState(false);
  const invitationMutation = api.invitation.acceptInvitation.useMutation();
  const notificationMutation = api.notification.delete.useMutation();
  const markAllAsReadMutation = api.notification.markAllAsRead.useMutation();

  useEffect(() => {
    const markAllAsRead = async () => {
      const result = await markAllAsReadMutation.mutateAsync();
    };

    if (isOpen) {
      markAllAsRead();
    }
  }, []);

  return (
    <Popover
      onOpenChange={(open) => {
        if (open) {
          markAllAsReadMutation.mutateAsync();
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          size={"icon"}
          className="relative rounded-full"
          variant={"outline"}
          onClick={() => setisOpen(!isOpen)}
        >
          <Bell size={16} />
          {mynotifications.filter((notification) => !notification.read).length >
            0 && (
            <div className="absolute -end-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
              {
                mynotifications.filter((notification) => !notification.read)
                  .length
              }
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[22em]" side="bottom" align="end">
        <div className="flex flex-col gap-2">
          {mynotifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-4">
              <img
                alt="Avatar"
                className="rounded-full object-cover"
                height="40"
                src={notification.User.image ?? ""}
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="grid gap-1 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-lg font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-muted-foreground">{notification.message}</p>

                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={async () => {
                      await invitationMutation.mutateAsync({
                        invitationId: notification.id,
                      });
                    }}
                    variant={"secondary"}
                    size={"sm"}
                  >
                    Accept Invitation
                  </Button>
                  <Button
                    onClick={async () => {
                      await notificationMutation.mutateAsync({
                        id: notification.id,
                      });
                    }}
                    variant={"destructive"}
                    size={"sm"}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
