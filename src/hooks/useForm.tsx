import { useState } from "react";

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return { values, setValues, handleChange };
}
