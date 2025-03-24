import { LogoutButton } from "@/components/Auth/LogoutButton";

export const UserLayout = ({ 
  title,
  children 
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-purple-600">{title}</h1>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
};