"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 mb-4">
          Please sign in to continue to your dashboard
        </p>

        {/* Clerk's prebuilt SignIn component */}
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/sign-up"
          redirectUrl="/auth"
          appearance={{
            elements: {
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700",
            },
          }}
        />
      </div>
    </div>
  );
}
