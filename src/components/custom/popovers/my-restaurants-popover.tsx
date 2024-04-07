import { Prisma, Restaurant, RestaurantUser } from "@prisma/client";
import { ArrowUpDown, ChevronsUpDown } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import SelectRestaurantButton from "../buttons/select-restaurant-button";

export default function MyRestaurantsPopover({
  myRestaurants,
  currentSelectedRestaurantId,
}: {
  myRestaurants: Restaurant[];
  currentSelectedRestaurantId: number | null | undefined;
}) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex w-full items-center gap-2 rounded-lg border p-2 hover:bg-muted/30">
            <div className="h-10 w-10 rounded-full bg-secondary"></div>
            <div className="flex flex-1 flex-col items-start text-sm">
              <p className="line-clamp-1 font-semibold">
                current restaurant name
              </p>
              <p className="line-clamp-1 text-xs text-muted-foreground">
                current restaurant address
              </p>
            </div>

            <div className="p-1">
              <ChevronsUpDown size={16} />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent className="p-2">
          <div className="flex flex-col gap-2">
            {myRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className={cn(
                  "flex w-full items-center gap-2 rounded p-2 hover:bg-muted/30",
                  {
                    "bg-muted/30":
                      restaurant.id === currentSelectedRestaurantId,
                  },
                )}
              >
                <div className="h-10 w-10 rounded-full bg-secondary"></div>
                <div className="flex flex-1 flex-col text-start text-sm">
                  <p className="line-clamp-1 font-semibold">
                    {restaurant.name}
                  </p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {restaurant.location}
                  </p>
                </div>

                <div className="p-1">
                  <SelectRestaurantButton restaurantId={restaurant.id} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2"></div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
