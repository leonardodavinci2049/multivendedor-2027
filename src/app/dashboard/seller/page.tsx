// Next.js
import { redirect } from "next/navigation";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// DB


export default async function SellerDashboardPage() {
  // Fetch the current user. If the user is not authenticated, redirect them to the home page.
  const user = await currentUser();
  if (!user) {
    redirect("/");
    return; // Ensure no further code is executed after redirect
  }

  // If the user has stores, redirect them to the dashboard of their first store.
//   redirect(`/dashboard/seller/stores/${stores[0].url}`);

  return <div>Seller Dashboard</div>;
}
