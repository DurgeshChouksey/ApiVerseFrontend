import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery } from "@/features/user/userApi";

const Profile = () => {
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successEmailMessage, setSuccessEmailMessage] = useState("");
	const [errorEmailMessage, setErrorEmailMessage] = useState("");
	const [isBioDisabled, setBioDisabled] = useState(true);
	const bioRef = React.useRef<HTMLTextAreaElement>(null);
	const navigate = useNavigate();

	const { data: user, isLoading, refetch } = useGetMeQuery(undefined);

	const handleAddEmail = async () => {
		if (!email.trim()) return alert("Please enter a valid email.");

		try {
			const res = await fetchWithAuth("/api/v1/auth/add-email", {
				method: "POST",
				data: { email },
			});

			console.log(res);

			setErrorEmailMessage("");
			setSuccessEmailMessage(res.message);

			setTimeout(() => {
				navigate("/verify-email");
			}, 2000);
		} catch (error) {
			console.log(error);
			setSuccessEmailMessage("");
			setErrorEmailMessage(error?.response?.data.message);
		}
	};

	const handleUpdateBio = async () => {
		if (!bio.trim()) return alert("Bio cannot be empty.");

		await fetchWithAuth("/api/v1/user/update-profile", {
			method: "PATCH",
			data: { bio },
		});

		setBioDisabled(!isBioDisabled);
		refetch(); // refresh user data
	};

	const handleChangePassword = async () => {
		try {
			const res = await fetchWithAuth("/api/v1/auth/change-password", {
				method: "POST",
			});
			setErrorMessage("");
			setSuccessMessage(res.message);
		} catch (error) {
			setSuccessMessage("");
			setErrorMessage(error?.response?.data.message);
		}
	};

	useEffect(() => {
		if (user) {
			setBio(user.bio || "");
		}
	}, [user]);

	useEffect(() => {
		if (!isBioDisabled) {
			// When bio becomes editable, focus the textarea
			bioRef.current?.focus();
		}
	}, [isBioDisabled]);

	if (isLoading) return <Loading />;

	if (!user) return <div className="text-center py-10">No user data found</div>;

	return (
		<div className="min-h-screen mt-10 flex justify-center items-center bg-gray-50 dark:bg-[#0d0d0d] py-10">
			<div className="bg-white dark:bg-[#1a1a1a] shadow-xl rounded-lg p-8 w-[90%] sm:w-[600px]">
				{/* Profile Image Section */}
				<div className="flex flex-col items-center text-center">
					{user.profileImage ? (
						<img
							src={user.profileImage}
							alt="Profile"
							className="w-28 h-28 rounded-full border-4 border-primary object-cover"
						/>
					) : (
						<div className="w-28 h-28 flex items-center justify-center rounded-full border-4 border-primary bg-gray-300 dark:bg-gray-700 text-3xl font-bold text-white">
							{user.username ? user.username.charAt(0).toUpperCase() : "U"}
						</div>
					)}

					<h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
						{user.firstName} {user.lastName}
					</h2>
					<p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
				</div>

				{/* Email Section */}
				<div className="mt-8 border-t pt-4">
					<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
						Email
					</h3>

					{user.isVerified ? (
						<div className="flex items-center justify-between mt-2">
							<p className="text-gray-600 dark:text-gray-300">{user.email}</p>
							<span className="text-sm px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300">
								Verified
							</span>
						</div>
					) : (
						<div className="flex flex-col gap-2 mt-3">
							<p className="text-gray-400 dark:text-gray-500">
								You haven’t verified your email yet.
							</p>
							<input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="border dark:border-gray-600 bg-transparent px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-gray-100"
							/>
							<button
								onClick={handleAddEmail}
								className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
							>
								Add Email
							</button>
							<div>
								{successEmailMessage && (
									<p className="text-xl text-green-500">
										{successEmailMessage}
									</p>
								)}
								{errorEmailMessage && (
									<p className="text-xl text-red-500">{errorEmailMessage}</p>
								)}
							</div>
						</div>
					)}
				</div>

				{/* Bio Section */}
				<div className="mt-6 border-t pt-4">
					<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
						Bio
					</h3>

					<textarea
						ref={bioRef}
						className="w-full mt-2 border dark:border-gray-600 bg-transparent rounded-md px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
						rows={3}
						placeholder="Write something about yourself..."
						disabled={isBioDisabled}
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>

					<button
						onClick={() => setBioDisabled((prev) => !prev)}
						className="mt-3 mr-2 bg-primary text-white px-4 py-1 rounded-md hover:bg-opacity-90 transition"
					>
						{isBioDisabled ? "Edit Bio" : "Cancel Edit"}
					</button>

					{!isBioDisabled && (
						<button
							onClick={handleUpdateBio}
							className="mt-3 bg-primary text-white px-4 py-1 rounded-md hover:bg-opacity-90 transition"
						>
							Update Bio
						</button>
					)}
				</div>

				{/* reset password and logout */}

				<div>
					<div className="mt-6 border-t pt-4 text-gray-600 dark:text-gray-400 text-sm flex gap-5">
						<a
							onClick={handleChangePassword}
							className="text-[1.1rem] hover:text-red-700 border-1 hover:border-red-700 px-2 py-1 rounded-md"
						>
							Change Password
						</a>
						<a
							href=""
							className="text-[1.1rem] hover:text-red-700 border-1 hover:border-red-700 px-2 py-1 rounded-md"
						>
							Logout
						</a>
					</div>
					<div className="mt-5">
						{successMessage && (
							<p className="text-xl text-green-500">{successMessage}</p>
						)}
						{errorMessage && (
							<p className="text-xl text-red-500">{errorMessage}</p>
						)}
					</div>
				</div>

				{/* Account Info */}
				<div className="mt-6 border-t pt-4 space-y-2 text-gray-600 dark:text-gray-400 text-sm">
					<p>
						<strong>Account created:</strong>{" "}
						{new Date(user.createdAt).toLocaleDateString()}
					</p>
					<p>
						<strong>Last login:</strong>{" "}
						{new Date(user.lastLogin).toLocaleString()}
					</p>
					<p>
						<strong>Auth Provider:</strong> {user.provider || "Email/Password"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
