import React from "react";
import MainSidebarMenu from "../menus/main-sidebar-menu";
import MyRestaurantsPopover from "../popovers/my-restaurants-popover";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import { Separator } from "~/components/ui/separator";

export default async function MainSidebar() {
  const myRestaurants = await api.user.listRestaurants();
  const session = await getServerAuthSession();

  return (
    <div className="flex w-[20em] flex-col border-e bg-background">
      <div className="p-4">
        <div className="text-xl font-bold">Touchless Menu</div>
      </div>

      <div className="p-4">
        <div className="mb-1 text-sm font-semibold text-muted-foreground">
          My Restaurants
        </div>
        <MyRestaurantsPopover
          currentSelectedRestaurantId={
            session?.user.currentSelectedRestaurantId
          }
          myRestaurants={myRestaurants}
        />
      </div>
      <Separator />

      <div className="flex flex-col p-4">
        <MainSidebarMenu />
      </div>
    </div>
  );
}
