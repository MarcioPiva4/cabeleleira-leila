interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-orange-400">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm mx-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};
