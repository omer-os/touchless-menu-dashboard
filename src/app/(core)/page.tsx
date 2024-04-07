import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/api/auth/login");
  }

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
      accusantium doloremque voluptatum saepe placeat quod aspernatur cum
      deleniti ipsam? Laborum perferendis corporis distinctio ipsam natus
      officia excepturi suscipit eveniet ratione?
    </div>
  );
}
