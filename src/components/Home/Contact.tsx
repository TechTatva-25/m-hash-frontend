"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as z from "zod";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

import { BorderBeam } from "../ui/border-beam";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface ContactPerson {
	name: string;
	phone: string;
	role: string;
}

const contactPersons: ContactPerson[] = [
	{ name: "Anshu Kantipudi", phone: "+91 98660 56570", role: "Core Committee" },
	{ name: "Dillon Almeida", phone: "+91 86686 33682", role: "Core Committee" },
	{ name: "Mustafa Haji", phone: "+91 97738 88772", role: "Core Committee" },
	{ name: "Nishtha Singh", phone: "+91 70134 93752", role: "MIT Student Council" },
	{ name: "Ananya Parashar", phone: "+91 74001 25968", role: "MIT Student Council" },
	{ name: "Dishita Mohan", phone: "+91 82406 72604", role: "MIT Student Council" },
];

const ContactFormSchema = z.object({
	email: z.string().email(),
	message: z.string().min(1, "Message is required"),
});

export default function ContactForm(): React.JSX.Element {
	// const router = useRouter();
	const [disabled, setDisabled] = useState(false);
	const form = useForm<z.infer<typeof ContactFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(ContactFormSchema),
	});

	const contactGroups = React.useMemo(() => {
		const groups: Record<string, ContactPerson[]> = {};
		contactPersons.forEach((person) => {
			if (groups[person.role]) {
				groups[person.role].push(person);
			} else {
				groups[person.role] = [person];
			}
		});
		return groups;
	}, [contactPersons]);

	const onSubmit = async (data: z.infer<typeof ContactFormSchema>): Promise<void> => {
		setDisabled(true);
		try {
			const response = await axios.post<{ message: string }>(getEndpoint(Endpoints.CONTACT), data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			toast.success(response.data.message);
			setTimeout((): void => window.location.reload(), 3000);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error((error as AxiosError<{ message: string }>).response?.data.message ?? error.message);
			} else {
				toast.error("An error occurred while submitting your query");
			}
			setDisabled(false);
		}
	};

	return (
		<Card className="relative max-w-full border-none shadow-md dark:shadow-none sm:mx-auto sm:w-[610px]">
			<BorderBeam size={400} duration={12} delay={9} />
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Have Questions or Feedback?</CardTitle>
				<CardDescription>We'd Love to Hear from You!</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4 pb-2">
				<Form {...form}>
					{}
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }): React.JSX.Element => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="email"
											placeholder="Enter your email"
											className="w-full"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="message"
							render={({ field }): React.JSX.Element => (
								<FormItem>
									<FormLabel>Message</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder="Enter your message" className="w-full" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={disabled} className="mt-6 w-full">
							{disabled ? <HashLoader color="#a457f7" size={20} /> : "Send"}
						</Button>
					</form>
				</Form>
				<Card className="col-span-1 mb-3">
					<CardHeader className="space-y-1">
						<CardTitle className="text-xl">Contact Persons</CardTitle>
						<CardDescription>Feel free to reach out to us!</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{Object.entries(contactGroups).map(([role, contacts], index) => (
							<div key={index} className="mb-5">
								<span className="text-lg font-semibold">{role}</span>
								<div key={role} className="mt-3 flex flex-wrap gap-3">
									{contacts.map((contact, index) => (
										<Card
											key={index}
											className="col-span-1 cursor-pointer transition-all duration-300 ease-in-out hover:bg-accent/50">
											<CardContent className="space-y-1">
												<CardTitle className="mt-6 text-base">{contact.name}</CardTitle>
												<CardDescription>
													<Link href={`tel:${contact.phone}`}>{contact.phone}</Link>
												</CardDescription>
											</CardContent>
										</Card>
									))}
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</CardContent>
		</Card>
	);
}
