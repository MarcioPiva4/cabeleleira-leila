interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

export const TextAreaField = ({
  label,
  value,
  onChange,
  required = false,
  rows = 4,
}: TextAreaFieldProps) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={label}
        value={value}
        onChange={onChange}
        className="w-full text-black p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        required={required}
        rows={rows}
      />
    </div>
  );
};
