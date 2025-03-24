"use client";

interface DateSuggestionProps {
  suggestedDate: string;
  onAccept: () => void;
  onCancel: () => void;
}

export const DateSuggestion = ({ 
  suggestedDate, 
  onAccept, 
  onCancel 
}: DateSuggestionProps) => {
  return (
    <div className="mt-2 p-3 bg-purple-100 rounded-lg">
      <p className="text-purple-800">
        Sugerimos o horário: {new Date(suggestedDate).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={onAccept}
          className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors"
        >
          Usar esta data
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
        >
          Manter minha escolha
        </button>
      </div>
    </div>
  );
};