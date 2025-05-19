import { ChangeEvent } from "react";

export function Select({
  value,
  onChange,
  options,
  label,
  isDisabled,
}: {
  value: string | number;
  label: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; name: string }[];
  isDisabled?: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-1 min-w-[180px] sm:min-w-[200px]">
      <label
        className="text-sm font-medium text-white tracking-wide ml-1"
        htmlFor={label}
      >
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        className={`
          bg-gray-900 text-white
          px-4 py-2
          rounded-xl shadow-sm
          focus:outline-none focus:ring-2 focus:ring-sky-500
          disabled:bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed
          hover:bg-gray-700
          transition-all duration-150 ease-in-out
          w-full
        `}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-900"
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}