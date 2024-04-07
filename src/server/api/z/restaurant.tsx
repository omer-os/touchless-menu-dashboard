import { RestaurantStatus } from "@prisma/client";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  emailVerified: z.date().optional(),
  image: z.string().optional(),
});

const restaurantSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  phoneNumber: z.string().min(1).optional(),
  status: z.nativeEnum(RestaurantStatus),
});

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  order: z.number(),
  restaurantId: z.number(),
});

const categorySchema = z.object({
  name: z.string(),
  order: z.number(),
  pageId: z.number(),
});

const itemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  order: z.number(),
  categoryId: z.number(),
});

const restaurantUserSchema = z.object({
  userId: z.string(),
  restaurantId: z.number(),
});

export {
  userSchema,
  restaurantSchema,
  pageSchema,
  categorySchema,
  itemSchema,
  restaurantUserSchema,
};
