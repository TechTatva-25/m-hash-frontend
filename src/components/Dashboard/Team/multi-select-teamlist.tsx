"use client";

import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { BeatLoader, HashLoader } from "react-spinners";
import { toast } from "react-toastify";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import MultipleSelector, { MultipleSelectorRef, Option } from "@/components/ui/multi-select"; // Import Option type
import { useTheme } from "@/components/ThemeProvider";
import { User } from "@/hooks/useSession";
import { Team } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

export default function MultiSelectTeamList({
	className,
	team,
	onChange,
}: {
	className: string;
	team: Team;
	onChange: () => void;
}): React.ReactElement {
	const selectRef = React.useRef<MultipleSelectorRef>(null);
	const [disabled, setDisabled] = React.useState(team.members.length >= 5);
	const [usersMap, setUsersMap] = React.useState<Map<string, User>>(new Map());
	const { theme } = useTheme();
	const isDark = theme === "dark";

	const fetchUsers = async (search: string): Promise<Option[]> => {
		try {
			const response = await axios.get<{
				users: User[];
				offset: number;
				hasMore: boolean;
				limit: number;
				total: number;
			}>(getEndpoint(Endpoints.LIST_USERS), {
				withCredentials: true,
				params: {
					username: search,
					email: search,
					offset: 0,
					limit: 100,
				},
			});
			const usersMap = new Map(response.data.users.map((user) => [user._id, user]));
			setUsersMap(usersMap);

			return response.data.users
				.filter((user) => !team.members.map((member) => member._id).includes(user._id))
				.map((user) => ({
					value: user._id,
					label: `${user.username}`,
					email: user.email,
				}));
		} catch (error) {
			toast.error((error as AxiosError<{ message: string }>).response?.data.message);
			return [];
		}
	};

	const handleSendRequest = async (): Promise<void> => {
		setDisabled(true);
		for (const user of selectRef.current?.selectedValue ?? []) {
			try {
				await axios.post(
					getEndpoint(Endpoints.INVITE_USER),
					{ teamId: team._id, userId: user.value },
					{ withCredentials: true }
				);
				toast.success(`Invited ${user.label} to the team.`);
			} catch (error) {
				toast.error((error as AxiosError<{ message: string }>).response?.data.message);
			}
		}
		onChange();
		setDisabled(false);
		selectRef.current?.clear();
	};

	return (
		<div className={className}>
			<div 
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					borderRadius: '16px',
					position: 'relative',
					backgroundColor: `${isDark ? 'rgba(30, 41, 59, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`,
					border: `1px solid ${isDark ? 'rgba(51, 65, 85, 0.7)' : 'rgba(226, 232, 240, 0.7)'}`,
					boxShadow: `0 4px 20px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'}`,
					backdropFilter: 'blur(12px)'
				}}
			>
				{/* Subtle purple accent overlay */}
				<div style={{
					position: 'absolute',
					inset: 0,
					pointerEvents: 'none',
					background: `${isDark 
						? 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.02))' 
						: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(79, 70, 229, 0.04))'}`
				}}></div>
				
				{/* Enhanced inner glow with subtle highlights */}
				<div style={{
					position: 'absolute',
					inset: 0,
					pointerEvents: 'none',
					background: `linear-gradient(135deg, ${isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.1)'}, transparent)`,
					mixBlendMode: 'overlay'
				}}></div>
				
				{/* Accent edge */}
				<div style={{
					position: 'absolute',
					inset: 0,
					borderRadius: '16px',
					overflow: 'hidden',
					pointerEvents: 'none'
				}}>
					<div style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: '1px',
						background: `linear-gradient(to right, transparent, ${isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.5)'}, transparent)`
					}}></div>
					<div style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: '1px',
						background: `linear-gradient(to right, transparent, ${isDark ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.4)'}, transparent)`
					}}></div>
				</div>
				
				<div style={{
					position: 'relative',
					zIndex: 10,
					padding: '1.5rem',
					paddingBottom: '1rem'
				}}>
					<h3 style={{
						fontSize: '1.5rem',
						fontWeight: 600,
						fontFamily: 'var(--font-playfair-display)',
						color: `${isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)'}`
					}}>Select Team Members</h3>
					<p style={{
						color: `${isDark ? 'rgba(148, 163, 184, 1)' : 'rgba(100, 116, 139, 1)'}`
					}}>Select team members to invite to your team</p>
				</div>
				
				<div style={{
					position: 'relative',
					zIndex: 10,
					display: 'flex',
					flexGrow: 1,
					flexDirection: 'column',
					alignItems: 'center',
					padding: '0 1.5rem 1.5rem'
				}}>
					<MultipleSelector
						ref={selectRef}
						disabled={disabled}
						className="max-h-96 w-full"
						delay={250}
						maxSelected={5 - team.members.length}
						hidePlaceholderWhenSelected
						hideClearAllButton
						badgeClassName="rounded-md bg-transparent text-foreground border border-accent py-1.5"
						triggerSearchOnFocus
						inputProps={{
							className: "border-0 focus:ring-0 focus:border-0",
							style: {
								color: `${isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)'}`,
							}
						}}
						commandProps={{
							className: "relative"
						}}
						optionNode={(option): React.JSX.Element => (
							<div
								key={option.value}
								data-fixed={option.fixed}
								data-disabled={option.disable ?? undefined}
								className="flex w-full flex-row items-center justify-between p-2"
								style={{
									transition: 'all 0.2s ease',
									backgroundColor: `${isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.4)'}`,
									backdropFilter: 'blur(8px)',
									margin: '4px 0',
									borderRadius: '8px',
									border: `1px solid ${isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.5)'}`
								}}>
								<Avatar className="h-10 w-10">
									<BoringAvatar
										name={usersMap.get(option.value)?.username ?? ""}
										variant="beam"
										size={40}
										colors={generateColorPalette(option.value)}
									/>
								</Avatar>
								<div className="ml-2 flex w-full flex-row items-center justify-between">
									<div className="flex flex-col items-start justify-center text-start">
										<p className="text-sm font-semibold" style={{ color: `${isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)'}` }}>
											{usersMap.get(option.value)?.username}
										</p>
										<p className="text-xs" style={{ color: `${isDark ? 'rgba(148, 163, 184, 1)' : 'rgba(100, 116, 139, 1)'}` }}>
											{usersMap.get(option.value)?.email}
										</p>
									</div>
									<Button 
										disabled={disabled} 
										variant={"ghost"} 
										className="border-none p-0 hover:bg-transparent"
										style={{
											color: `${isDark ? 'rgba(139, 92, 246, 0.9)' : 'rgba(139, 92, 246, 0.8)'}`,
											transition: 'all 0.2s ease'
										}}>
										<IoMdAdd className="h-5 w-5" />
									</Button>
								</div>
							</div>
						)}
						onSearch={(search: string): Promise<Option[]> => fetchUsers(search)}
						placeholder="Search for a user..."
						loadingIndicator={
							<div className="my-10 flex items-center justify-center text-center">
								<BeatLoader color="#a457f7" size={12} />
							</div>
						}
						emptyIndicator={
							<div 
								className="my-5 flex w-full items-center justify-center"
								style={{
									padding: '1rem',
									borderRadius: '8px',
									backgroundColor: `${isDark ? 'rgba(30, 41, 59, 0.3)' : 'rgba(255, 255, 255, 0.3)'}`,
									backdropFilter: 'blur(8px)',
									border: `1px solid ${isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.5)'}`,
									color: `${isDark ? 'rgba(148, 163, 184, 1)' : 'rgba(100, 116, 139, 1)'}`
								}}>
								<FaUsers className="mr-2 h-5 w-5" style={{ color: `${isDark ? 'rgba(139, 92, 246, 0.8)' : 'rgba(139, 92, 246, 0.7)'}` }} />
								<p className="text-center font-semibold">No users found</p>
							</div>
						}
					/>
					<Button
						onClick={handleSendRequest}
						disabled={disabled}
						className="mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
						style={{
							backgroundImage: `linear-gradient(to right, ${isDark ? 'rgba(124, 58, 237, 0.8)' : 'rgba(124, 58, 237, 0.9)'}, ${isDark ? 'rgba(79, 70, 229, 0.8)' : 'rgba(79, 70, 229, 0.9)'})`,
							boxShadow: `0 4px 15px ${isDark ? 'rgba(124, 58, 237, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
							border: 'none',
							borderRadius: '10px',
							color: 'white',
							fontWeight: 600,
							padding: '0.75rem',
							transition: 'all 0.2s ease',
							position: 'relative',
							overflow: 'hidden'
						}}>
						<div style={{
							position: 'absolute',
							inset: 0,
							backgroundImage: `linear-gradient(to right, ${isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)'}, ${isDark ? 'rgba(79, 70, 229, 0.15)' : 'rgba(79, 70, 229, 0.1)'})`,
							opacity: 0.5,
							mixBlendMode: 'overlay'
						}}></div>
						{disabled ? <HashLoader color="#ffffff" size={20} /> : "Send Invites"}
					</Button>
				</div>
			</div>
		</div>
	);
}
