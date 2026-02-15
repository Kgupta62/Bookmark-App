"use client";

import { SignIn } from "./SignIn";

export function SignInWithErrorHint({ hasAuthError }: { hasAuthError: boolean }) {
  return (
    <div>
      {hasAuthError && (
        <p className="mb-4 text-sm text-red-600">
          Sign-in failed. Open DevTools (F12) → Console to see the error, then try again.
        </p>
      )}
      <SignIn />
    </div>
  );
}
