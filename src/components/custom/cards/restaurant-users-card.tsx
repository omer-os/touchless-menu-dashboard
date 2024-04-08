import { Session } from "next-auth";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/server";
import InviteUserDialog from "../dialogs/invite-user-dialog";
export default async function RestaurantUsersCard({
  session,
}: {
  session: Session;
}) {
  const users = session.user.currentSelectedRestaurantId
    ? await api.restaurant.getUsers(session.user.currentSelectedRestaurantId)
    : null;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.userId}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.restaurantId}</TableCell>
                  <TableCell className="text-right">Actions</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <InviteUserDialog>Invite User</InviteUserDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
