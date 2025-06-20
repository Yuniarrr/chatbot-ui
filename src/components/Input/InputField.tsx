import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface InputFieldProps {
  label: string;
  id: string;
  name?: string;
  value: string | Date | null;
  onChange?: (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | Date
      | null,
  ) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  isDropdown?: boolean;
  isBase?: boolean;
  isTextarea?: boolean;
  isDate?: boolean;
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
  isBase = true,
  isDropdown = false,
  isTextarea = false,
  isDate = false,
  required = true,
  listDropdown,
}) => {
  return (
    <div className="min-w-full">
      <div className="flex w-full flex-row gap-x-1">
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        {required && <label className="text-red-600">*</label>}
        {!required && (
          <label className="mb-2 block text-sm font-medium text-gray-900">
            (Optional)
          </label>
        )}
      </div>
      {isTextarea && (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          placeholder={placeholder}
          rows={4}
          disabled={disabled}
          required={required}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      )}
      {isBase && (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${disabled ? "text-gray-400" : "text-gray-900"}`}
        />
      )}
      {isDate && (
        <DatePicker
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${disabled ? "text-gray-400" : "text-gray-900"}`}
          selected={
            value && !isNaN(new Date(value).getTime()) ? new Date(value) : null
          }
          onChange={(date) => onChange?.(date)}
          placeholderText={placeholder}
          dateFormat="dd/MM/yyyy"
          disabled={disabled}
          id={id}
          name={name}
          required={required}
          showYearDropdown
          yearDropdownItemNumber={50}
          scrollableYearDropdown
        />
      )}
      {isDropdown && (
        <select
          id={id}
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          className="pr- block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
