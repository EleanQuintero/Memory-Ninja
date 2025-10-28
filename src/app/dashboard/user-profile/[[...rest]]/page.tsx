import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => {
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
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
