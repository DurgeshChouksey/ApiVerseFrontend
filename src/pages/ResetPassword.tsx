import AnimatedBtn1 from "@/components/mvpblocks/animated-btn1";

import { Card, CardContent } from "@/components/ui/card";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const resetPasswordToken = queryParams.get("token");
    console.log(resetPasswordToken)

	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");


	async function handleForgotPassword() {
		try {
			const res = await fetchWithAuth("/api/v1/auth/reset-password", {
				method: "POST",
				data: { resetPasswordToken, password },
			});
			setErrorMessage("");
			setSuccessMessage(res.message);
			setTimeout(() => {
				navigate('/signin')
			}, 2000);
		} catch (error: any) {
			setSuccessMessage("");
			setErrorMessage(error?.response?.data.message);
		}
	}

	return (
		<div className="rose-gradient bg-background h-screen grid justify-center items-center">
			<div className="from-background absolute -top-10 left-0 h-1/2 w-full rounded-b-full bg-gradient-to-b to-transparent blur"></div>
			<div className="from-primary/80 absolute -top-64 left-0 h-1/2 w-full rounded-full bg-gradient-to-b to-transparent blur-3xl"></div>
			<Card
				className={`border-border/70 bg-card/20 w-full shadow-[0_10px_26px_#e0e0e0a1] backdrop-blur-lg dark:shadow-none`}
			>
				<CardContent className="space-y-6 p-8">
					<div className="flex flex-col items-center px-3 sm:px-10 py-5 rounded-sm">
						<h1 className="mb-2 text-2xl font-bold text-foreground dark:">
							Reset Password
						</h1>
						<label htmlFor="">Enter new password</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							className="px-2 py-1 rounded-md mt-2 mb-5 border-1 border-gray-200"
							type="text"
						/>
						<AnimatedBtn1 action={handleForgotPassword}>Submit</AnimatedBtn1>
						<div className="mt-5">
							{successMessage && (
								<p className="text-xl text-green-500">{successMessage}</p>
							)}
							{errorMessage && (
								<p className="text-xl text-red-500">{errorMessage}</p>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ResetPassword;
