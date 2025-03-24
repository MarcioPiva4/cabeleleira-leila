"use client";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  showSuggestion: (show: boolean, data: string) => void;
}

export const DateInput = ({ value, onChange, showSuggestion }: DateInputProps) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    onChange(newDate);
    
    // Lógica para verificar sugestão
    const date = new Date(newDate);
    const today = new Date();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 0 = Domingo, 6 = Sábado
    
    if (isWeekend) {
      const nextMonday = new Date(date);
      nextMonday.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7));
      showSuggestion(true, nextMonday.toISOString().split('T')[0]);
    } else {
      showSuggestion(false, "");
    }
  };

  return (
    <div className="mb-4">
      <label className="block mt-4 mb-2 font-medium text-gray-700">Data do Agendamento:</label>
      <input
        type="datetime-local"
        value={value}
        onChange={handleDateChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
};