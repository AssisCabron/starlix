import { getUserProfile, getBillingHistory } from "../actions";
import { redirect } from "next/navigation";
import { SubscriptionContent } from "./subscription-content";

export default async function SubscriptionPage() {
  const profile = await getUserProfile();
  const paymentHistory = await getBillingHistory();

  if (!profile) {
    redirect("/login");
  }

  return <SubscriptionContent profile={profile} paymentHistory={paymentHistory} />;
}
