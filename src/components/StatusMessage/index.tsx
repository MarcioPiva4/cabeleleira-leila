interface StatusMessageProps {
  status: string;
  type?: "success" | "error";
}

export const StatusMessage = ({
  status,
  type = "success",
}: StatusMessageProps) => {
  const colorClass = type === "success" ? "text-green-600" : "text-red-600";
  return (
    <p className={`mt-4 text-center ${colorClass} font-medium`}>{status}</p>
  );
};
