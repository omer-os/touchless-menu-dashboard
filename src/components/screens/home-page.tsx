import { Session } from "next-auth";
import React from "react";
import RestaurantUsersCard from "../custom/cards/restaurant-users-card";

export default function HomePage({ session }: { session: Session }) {

  return (
    <div>
      <div className="text-xl font-bold">Welcome back, {session.user.name}</div>

      <RestaurantUsersCard session={session} />
    </div>
  );
}
