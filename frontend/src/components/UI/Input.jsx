import React from "react";

const Input = React.forwardRef(({ type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
});

export default Input;

  