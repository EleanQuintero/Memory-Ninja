"use client";

import SignIn from "@/components/sign-in/SignIn";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-background to-muted text-foreground flex flex-col">
      <section className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignIn />
        </div>
      </section>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-purple-900/20 to-transparent -z-10" />
    </main>
  );
}
