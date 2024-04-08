"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { inviteUserSchema } from "~/server/api/z/restaurant";
import { api } from "~/trpc/react";

export default function InviteUserDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  console.log(session);

  const form = useForm<z.infer<typeof inviteUserSchema>>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      restaurantId: 0,
      senderId: "",
      message: "",
    },
  });

  const mutation = api.restaurant.inviteUser.useMutation({
    onSuccess: (data) => {
      console.log(data);

      toast.success("Restaurant created successfully");
    },
  });

  async function onSubmit(values: z.infer<typeof inviteUserSchema>) {
    mutation.mutate({
      email: values.email,
      restaurantId: session.data?.user.currentSelectedRestaurantId ?? 0,
      message: values.message,
      senderId: session.data?.user.id ?? "",
    });
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>{children}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>user email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>message for the user</FormLabel>
                    <FormControl>
                      <Input placeholder="write msg here...   " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-2 flex gap-2">
                <Button
                  onClick={() => {
                    console.log(form.getValues());
                  }}
                  loading={mutation.isPending}
                  type="submit"
                >
                  Invite
                </Button>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
