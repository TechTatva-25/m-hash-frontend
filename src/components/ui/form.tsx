import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
	Controller,
	ControllerProps,
	FieldError,
	FieldPath,
	FieldValues,
	FormProvider,
	useFormContext,
} from "react-hook-form";

import { useTheme } from "@/components/ThemeProvider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Form = FormProvider;

interface FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
	name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>): React.ReactElement => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

interface FieldT {
	invalid: boolean;
	isDirty: boolean;
	isTouched: boolean;
	error?: FieldError | undefined;
	id: string;
	name: string;
	formItemId: string;
	formDescriptionId: string;
	formMessageId: string;
}

const useFormField = (): FieldT => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

interface FormItemContextValue {
	id: string;
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const id = React.useId();

		return (
			<FormItemContext.Provider value={{ id }}>
				<div ref={ref} className={cn("space-y-2", className)} {...props} />
			</FormItemContext.Provider>
		);
	}
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
	const { formItemId } = useFormField();
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<Label
			ref={ref}
			className={cn(className, "font-medium")}
			htmlFor={formItemId}
			style={{
				color: `${isDark ? "rgba(220, 200, 255, 0.9)" : "rgba(103, 80, 164, 0.9)"}`,
			}}
			{...props}
		/>
	);
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
	({ ...props }, ref) => {
		const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

		return (
			<Slot
				ref={ref}
				id={formItemId}
				aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
				aria-invalid={!!error}
				{...props}
			/>
		);
	}
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => {
		const { formDescriptionId } = useFormField();
		const { theme } = useTheme();
		const isDark = theme === "dark";

		return (
			<p
				ref={ref}
				id={formDescriptionId}
				className={cn("text-sm", className)}
				style={{
					color: `${isDark ? "rgba(200, 180, 240, 0.7)" : "rgba(103, 80, 164, 0.7)"}`,
				}}
				{...props}
			/>
		);
	}
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	({ className, children, ...props }, ref) => {
		const { error, formMessageId } = useFormField();
		const { theme } = useTheme();
		const isDark = theme === "dark";

		const body = error ? String(error?.message) : children;

		if (!body) {
			return null;
		}

		return (
			<p
				ref={ref}
				id={formMessageId}
				className={cn("text-sm font-medium tracking-tight", className)}
				style={{
					color: `${isDark ? "rgba(255, 150, 150, 0.9)" : "rgba(220, 50, 50, 0.9)"}`,
					textShadow: `0 0 1px ${isDark ? "rgba(255, 0, 0, 0.2)" : "rgba(255, 0, 0, 0.1)"}`,
				}}
				{...props}>
				{body}
			</p>
		);
	}
);
FormMessage.displayName = "FormMessage";

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField };
