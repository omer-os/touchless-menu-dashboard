import { RestaurantStatus } from "@prisma/client";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  emailVerified: z.date().optional(),
  image: z.string().optional(),
});

const restaurantSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  location: z.string().optional(),
  phoneNumber: z.string().optional(),
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

const inviteUserSchema = z.object({
  email: z.string().email(),
  restaurantId: z.number(),
  senderId: z.string(),
  message: z.string().optional(),
});

const notificationSchema = z.object({
  userId: z.string(),
  message: z.string(),
  type: z.string(),
});

export {
  userSchema,
  restaurantSchema,
  pageSchema,
  categorySchema,
  itemSchema,
  restaurantUserSchema,
  inviteUserSchema,
  notificationSchema,
};
