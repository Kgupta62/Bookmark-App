"use client";

import { SignIn } from "./SignIn";

export function SignInWithErrorHint({
  hasAuthError,
  authErrorMsg,
}: {
  hasAuthError: boolean;
  authErrorMsg?: string | null;
}) {
  return (
    <div>
      {hasAuthError && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          Sign-in failed.
          {authErrorMsg ? (
            <>
              {" "}
              <span className="font-medium">{decodeURIComponent(authErrorMsg)}</span>
            </>
          ) : (
            " Try again or check Supabase redirect URL settings."
          )}
        </p>
      )}
      <SignIn />
    </div>
  );
}
