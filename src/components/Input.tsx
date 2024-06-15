import React, { ReactElement, forwardRef } from "react";

type InputProps = {
  type: "text" | "number" | "email" | "password";
  placeholder: string;
  icon: ReactElement;
  errors?: string | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  function InputCompontent ({ type, placeholder, icon, errors, ...rest }, ref) {
    return (
      <div>
        <div className="w-full my-3 flex items-center gap-2 border rounded-md p-2">
          <p className="text-gray-400">{icon}</p>
          <input
            className="outline-none text-gray-600 w-full"
            type={type}
            placeholder={placeholder}
            {...rest}
            ref={ref}
          />
        </div>
        <p className="text-red-600 text-sm w-100">{errors}</p>
      </div>
    );
  }
);

export default Input;
