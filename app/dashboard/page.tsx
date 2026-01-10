import { redirect } from "next/navigation";
import { getUserProfile } from "./actions";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardPage() {
  const profile = await getUserProfile();

  if (!profile) {
    redirect("/login");
  }

  return <DashboardContent profile={profile} />;
}
