interface SubmitButtonProps {
  loading: boolean;
  label: string;
  loadingLabel: string;
}

export const SubmitButton = ({
  loading,
  label,
  loadingLabel,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="w-full bg-orange-400 text-white px-6 py-3 rounded-full shadow-md hover:bg-orange-500 transition-all font-medium disabled:opacity-70"
      disabled={loading}>
      {loading ? loadingLabel : label}
    </button>
  );
};
