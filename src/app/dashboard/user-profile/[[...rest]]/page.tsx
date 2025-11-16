"use client";
import { UserProfile, useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

const UserProfilePage = () => {
  const { signOut } = useClerk();

  return (
    <div className="flex flex-wrap items-start justify-center w-full min-h-screen p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <UserProfile
          path="/dashboard/user-profile"
          routing="path"
          appearance={{
            elements: {
              rootBox: {
                width: "100%",
              },
              card: {
                width: "100%",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              },
            },
          }}
        >
          <UserProfile.Page
            label="Cerrar Sesión"
            labelIcon={<LogOut size={16} />}
            url="sign-out"
          >
            <div className="flex flex-col items-center justify-center p-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">¿Cerrar sesión?</h2>
                <p className="text-muted-foreground">
                  ¿Estás seguro de que quieres cerrar tu sesión?
                </p>
              </div>
              <button
                onClick={() => signOut({ redirectUrl: "/" })}
                className="px-6 py-3 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </UserProfile.Page>
        </UserProfile>
      </div>
    </div>
  );
};

export default UserProfilePage;
