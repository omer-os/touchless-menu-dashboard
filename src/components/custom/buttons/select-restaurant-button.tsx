"use client";
import { Restaurant } from "@prisma/client";
import { VariantProps } from "class-variance-authority";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  restaurantId: number;
}

export default function SelectRestaurantButton({
  children,
  restaurantId,
  ...props
}: ButtonProps) {
  const { update, data } = useSession();

  const mutateHook = api.user.selectRestaurant.useMutation({
    onSuccess: async () => {
      await update();
    },
  });

  return (
    <Button
      onClick={async () => {
        mutateHook.mutate(restaurantId);
      }}
      loading={mutateHook.isPending}
      disabled={
        mutateHook.isPending ||
        data?.user.currentSelectedRestaurantId === restaurantId
      }
      {...props}
    >
      {children
        ? children
        : data?.user.currentSelectedRestaurantId === restaurantId
          ? "Selected"
          : "Select"}
    </Button>
  );
}
