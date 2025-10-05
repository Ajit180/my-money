// "currentUser" is a Clerk server function that securely fetches
// the currently logged-in user's details on the server
import { currentUser } from "@clerk/nextjs/server";

// "redirect" is a Next.js helper for server-side redirects
import { redirect } from "next/navigation";

export default async function AuthPage() {
  // Fetch the authenticated user (works only in server components)
  const user = await currentUser();

  // If user is not logged in, redirect them to /login
  if (!user) {
    redirect("/login");
  }

  // If user exists, show the dashboard
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto mt-20">
        {/* Greet user with their name */}
        <h1 className="text-3xl font-bold">
          Hello, {user.firstName || user.username || "User"} 👋
        </h1>

        {/* Optional text */}
        <p className="text-gray-600 mt-2">
          Welcome to your finance dashboard. You are successfully authenticated.
        </p>

        {/* Placeholder for dashboard content */}
        <section className="mt-10">
          <p className="text-gray-500">Protected content goes here.</p>
        </section>
      </div>
    </main>
  );
}
