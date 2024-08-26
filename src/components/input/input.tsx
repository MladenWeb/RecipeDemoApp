import { InputProps } from "@/app/types";

export default function CustomInput({ register, name, type }: InputProps) {
  return (
    <input
      style={{ width: "100%" }}
      className="border-solid border-2 border-grey-600 rounded-2xl p-2"
      placeholder="Enter recipe name..."
      type={type}
      id={name}
      name={name}
      {...register}
    />
  );
}
