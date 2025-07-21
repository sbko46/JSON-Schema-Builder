import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white  focus:ring-blue-500"
        ref={ref}
        {...props}
      />
    );
  }
);

export { Input };
