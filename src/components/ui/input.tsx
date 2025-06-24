import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, value = "", ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400/40 focus-visible:ring-offset-0 focus-visible:border-purple-400/50 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			value={value}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = "Input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<div className="relative">
			<Input type={showPassword ? "text" : "password"} ref={ref} className={className} {...props} />
			<Button
				variant={"ghost"}
				type="button"
				size={"sm"}
				className="absolute right-2 top-1/2 -translate-y-1/2 transform hover:bg-transparent"
				onClick={(): void => setShowPassword((prev) => !prev)}>
				{showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
				<span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
			</Button>
		</div>
	);
});

export { Input, PasswordInput };
