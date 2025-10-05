"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    // Full-screen centered container
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {/* Clerk’s prebuilt SignUp component handles everything:
          - Email/password sign-up
          - OAuth (Google, GitHub, etc.)
          - Magic links / passwordless login
      */}
      <SignUp
        path="/sign-up"          // URL base path for this page
        routing="path"           // Use "path" routing for clean URLs
        signInUrl="/login"       // If user already has an account, link to login
        redirectUrl="/auth"      // After successful sign-up → redirect here
        appearance={{
          elements: {
            // Add Tailwind styling for a custom theme look
            formButtonPrimary:
              "bg-indigo-600 hover:bg-indigo-700 text-white font-medium",
            card: "shadow-md border border-gray-100",
          },
          layout: {
            // Optional: make Clerk UI match your design system
            socialButtonsVariant: "iconButton",
          },
        }}
      />
    </div>
  );
}
