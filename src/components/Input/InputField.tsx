interface InputFieldProps {
  label: string;
  id: string;
  name?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  isDropdown?: boolean;
  required?: boolean;
  listDropdown?: {
    key: string;
    value: string;
  }[];
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "text",
  isDropdown = false,
  required = true,
  listDropdown,
}) => {
  return (
    <div>
      <div className="flex flex-row gap-x-1">
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        {required && <label className="text-red-600">*</label>}
        {!required && (
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            (Optional)
          </label>
        )}
      </div>
      {!isDropdown && (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 ${disabled ? "text-gray-400" : "text-gray-900"}`}
        />
      )}
      {isDropdown && (
        <select
          id={id}
          value={value}
          name={name}
          disabled={disabled}
          className="pr- block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option value="">Pilih {name}</option>
          {listDropdown?.map((item) => (
            <option value={item.value}>{item.key}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default InputField;
