import axios from "axios";
import React from "react";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

export interface User {
	_id: string;
	email: string;
	username: string;
	mobile_number: string;
	college: string;
	createdAt: Date;
	updatedAt: Date;
	role: string;
	gender: string;
	collegeState?: string;
	collegeOther?: string;
	problem_statement: string[];
}

export interface Session {
	id?: string;
	userId?: string;
	email?: string;
	username?: string;
	expires_at?: string;
	user?: User;
	loading?: boolean;
}

export const getUser = async (): Promise<User | undefined> => {
	try {
		const response = await axios.get<User>(getEndpoint(Endpoints.ME), {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		return undefined;
	}
};

export const getSession = async (): Promise<Session | null> => {
	try {
		const response = await axios.get<Session>(getEndpoint(Endpoints.GET_SESSION), {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return { ...response.data, loading: false, user: await getUser() };
	} catch (error) {
		return null;
	}
};

export const useSession = (): Session | null => {
	const [session, setSessionState] = React.useState<Session | null>({ loading: true });

	React.useEffect(() => {
		setSessionState((prev) => ({ ...prev, loading: true }));
		void getSession().then((session) => {
			setSessionState(session);
		});
	}, []);

	return session;
};
