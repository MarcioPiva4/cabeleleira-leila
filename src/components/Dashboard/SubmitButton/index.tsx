"use client";

interface SubmitButtonProps {
  onClick: () => void;
  label: string;
}

export const SubmitButton = ({ onClick, label }: SubmitButtonProps) => {
  return (
    <button
      type="button"
      className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-all w-full font-semibold mt-4"
      onClick={onClick}
    >
      {label}
    </button>
  );
};