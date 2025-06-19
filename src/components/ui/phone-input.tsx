import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input, InputProps } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> &
	Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
		onChange?: (value: RPNInput.Value) => void;
	};

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
	React.ElementRef<typeof RPNInput.default>,
	PhoneInputProps
>(({ className, onChange, ...props }, ref) => {
	return (
		<RPNInput.default
			ref={ref}
			className={cn("flex", className)}
			flagComponent={FlagComponent}
			countrySelectComponent={CountrySelect}
			inputComponent={InputComponent}
			/**
			 * Handles the onChange event.
			 *
			 * react-phone-number-input might trigger the onChange event as undefined
			 * when a valid phone number is not entered. To prevent this,
			 * the value is coerced to an empty string.
			 *
			 * @param {E164Number | undefined} value - The entered value
			 */
			onChange={(value): void => onChange?.(value ?? ("" as RPNInput.Value))}
			{...props}
		/>
	);
});
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
	<Input
		className={cn(
			"rounded-e-lg rounded-s-none bg-black/20 border-gray-500/30 text-white placeholder:text-gray-400",
			className
		)}
		{...props}
		ref={ref}
	/>
));
InputComponent.displayName = "InputComponent";

interface CountrySelectOption {
	label: string;
	value: RPNInput.Country;
}

interface CountrySelectProps {
	disabled?: boolean;
	value: RPNInput.Country;
	onChange: (value: RPNInput.Country) => void;
	options: CountrySelectOption[];
}

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps): React.JSX.Element => {
	const handleSelect = React.useCallback(
		(country: RPNInput.Country) => {
			onChange(country);
		},
		[onChange]
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant={"outline"}
					className={cn(
						"flex gap-1 rounded-e-none rounded-s-lg px-3 bg-black/20 border-gray-500/30 hover:bg-black/30 hover:border-gray-500/50"
					)}
					disabled={disabled}>
					<FlagComponent country={value} countryName={value} />
					<ChevronsUpDown className={cn("-mr-2 h-4 w-4 opacity-50", disabled ? "hidden" : "opacity-100")} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0 bg-gray-900/95 border-gray-700 backdrop-blur-md">
				<Command className="bg-transparent">
					<CommandInput placeholder="Search country..." className="text-gray-200" />
					<CommandEmpty className="text-gray-400">No country found.</CommandEmpty>
					<CommandList>
						<CommandGroup>
							{options
								.filter((x) => x.value)
								.map((option) => (
									<CommandItem
										className="gap-2 text-gray-200 hover:bg-gray-800"
										key={option.value}
										onSelect={(): void => handleSelect(option.value)}>
										<FlagComponent country={option.value} countryName={option.label} />
										<span className="flex-1 text-sm">{option.label}</span>
										{option.value && (
											<span className="text-sm text-gray-400">
												{`+${RPNInput.getCountryCallingCode(option.value)}`}
											</span>
										)}
										<CheckIcon
											className={cn(
												"ml-auto h-4 w-4",
												option.value === value ? "opacity-100" : "opacity-0"
											)}
										/>
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps): React.JSX.Element => {
	const Flag = flags[country];

	return (
		<span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
			{Flag && <Flag title={countryName} />}
		</span>
	);
};
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };
