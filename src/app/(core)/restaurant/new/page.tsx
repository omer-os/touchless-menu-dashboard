import React from "react";
import CreateRestaurantForm from "~/components/custom/forms/create-restaurant-form";

export default function page() {
  return (
    <div className="p-4">
      <div className="text-2xl font-bold">Add a new restaurant</div>
      <CreateRestaurantForm />
    </div>
  );
}
