import { redirect } from "next/navigation";
import HomePage from "~/components/screens/home-page";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <div className="p-4">
      <HomePage session={session} />
    </div>
  );
}
