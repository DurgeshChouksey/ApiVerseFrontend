import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Menu, LogIn, UserPlus, Heart, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import AnimatedBtn1 from "./mvpblocks/animated-btn1";
import { ModeToggle } from "./mode-toggle";
import Shuffle from "./ui/shadcn-io/shuffle";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { logoutUser } from "@/features/user/userSlice";
import SearchBar from "../components/search-bar";

interface NavbarProps {
	isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentPage = location.pathname;
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	// logout logic
	const dispatch = useDispatch<AppDispatch>();
	const handleLogout = async () => {
		const res = await dispatch(logoutUser());
		console.log(res?.payload);
		navigate("/signin");
	};

	const Logo = () => (
		// <h1 className='text-xl sm:text-3xl font-bold font-logo bg-primary'>API'Verse</h1>
		<div className="cursor-pointer" onClick={() => navigate("/")}>
			<Shuffle
				text="API'VERSE"
				shuffleDirection="right"
				duration={1}
				animationMode="evenodd"
				shuffleTimes={1.5}
				ease="power3.out"
				loop={true}
				stagger={0.05}
				threshold={0.1}
				triggerOnce={false}
				triggerOnHover={true}
				respectReducedMotion={true}
				className="text-primary"
				style={{
					fontSize: "1.8rem",
					fontFamily: "Silkscreen",
				}}
			/>
		</div>
	);

	const LeftSide = () => (
		<div className="flex gap-5 items-center">
			<Logo />
			<div className="hidden sm:block">
				<AnimatedBtn1 action={() => navigate("/about")}>About Us</AnimatedBtn1>
			</div>
		</div>
	);

	const RightSide = () => {
		// Desktop view
		return (
			<div className="hidden md:flex gap-3 items-center">
				{!isLoggedIn && (
					<>
						<ModeToggle></ModeToggle>
						<Button
							title="SignUp"
							size={"sm"}
							onClick={() => navigate("/signup")}
						>
							<UserPlus />
						</Button>
						<Button
							title="SignIn"
							size={"sm"}
							onClick={() => navigate("/signin")}
						>
							<LogIn />
						</Button>
						<AnimatedBtn1 action={() => navigate("/support")}>
							Support
						</AnimatedBtn1>
					</>
				)}
				{isLoggedIn &&
					currentPage !== "/public" &&
					currentPage !== "/workspace" && (
						<>
							<ModeToggle></ModeToggle>
							<Button onClick={() => navigate("/public")}>API Hub</Button>
							<Button
								onClick={() => handleLogout()}
								title="LogOut"
								size={"icon"}
							>
								<LogOut />
							</Button>
						</>
					)}
				{isLoggedIn &&
					(currentPage === "/public" || currentPage === "/workspace") && (
						<>
							<ModeToggle></ModeToggle>
							<SearchBar />
							<Button onClick={() => navigate("/studio")}>Studio</Button>
							<Button
								onClick={() => navigate("/bookmarks")}
								title="Favorite"
								size={"icon"}
							>
								<Heart />
							</Button>
							<Button
								onClick={() => handleLogout()}
								title="LogOut"
								size={"icon"}
							>
								<LogOut />
							</Button>
							<Button
								onClick={() => navigate("/profile")}
								title="Profile"
								size={"icon"}
								className="rounded-full"
							>
								<User />
							</Button>
						</>
					)}
			</div>
		);
	};

	const MobileMenu = () => (
		<div
			className={`md:hidden rounded-xl absolute w-fit h-fit top-full right-2 backdrop-blur-2xl bg-black/40 p-4 shadow-lg flex flex-col items-center gap-3 ${mobileMenuOpen ? "block" : "hidden"}`}
		>
			{!isLoggedIn && (
				<div className="flex gap-2">
					<ModeToggle></ModeToggle>
					<Button onClick={() => navigate("/signup")}>
						<UserPlus />
					</Button>
					<Button onClick={() => navigate("/signin")}>
						<LogIn />
					</Button>
					<Button onClick={() => navigate("/support")}>Support</Button>
				</div>
			)}
			{isLoggedIn &&
				currentPage !== "/public" &&
				currentPage !== "/workspace" && (
					<>
						<div className="flex gap-2">
							<ModeToggle></ModeToggle>
							<Button onClick={() => navigate("/public")}>API Hub</Button>
							<Button
								onClick={() => handleLogout()}
								title="LogOut"
								size={"icon"}
							>
								<LogOut />
							</Button>
							<Button
								onClick={() => navigate("/profile")}
								size={"icon"}
								className="rounded-full"
							>
								<User />
							</Button>
						</div>
					</>
				)}
			{isLoggedIn &&
				(currentPage === "/public" || currentPage === "/workspace") && (
					<>
						<div className="flex gap-2 w-full">
							<Button onClick={() => navigate("/studio")}>Studio</Button>
							<Button onClick={() => navigate("/bookmarks")} size={"icon"}>
								<Heart />
							</Button>
						</div>
						<div className="flex flex-col gap-2 w-full">
							{currentPage !== "/workspace" && (
								<Button onClick={() => navigate("/workspace")}>
									Workspace
								</Button>
							)}
							{currentPage !== "/public" && (
								<Button onClick={() => navigate("/public")}>Discover</Button>
							)}
						</div>
						<div className="flex gap-2 w-full">
							<ModeToggle></ModeToggle>
							<Button
								onClick={() => handleLogout()}
								title="LogOut"
								size={"icon"}
							>
								<LogOut />
							</Button>
							<Button
								onClick={() => navigate("/profile")}
								size={"icon"}
								className="rounded-full"
							>
								<User />
							</Button>
						</div>
					</>
				)}
		</div>
	);

	return (
		<div>
			<div className="border-b-2 fixed top-0 left-0 right-0 z-50 backdrop-blur-xs h-16 flex items-center px-4 justify-between">
				<LeftSide />
				<RightSide />
				{/* Mobile hamburger */}
				<div className="md:hidden flex items-center">
					<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
						<Menu size={24} className="text-primary" />
					</button>
					<MobileMenu />
				</div>
			</div>
			{/* Search bar on public mobile view */}
			{isLoggedIn &&
				(currentPage === "/public" || currentPage === "/workspace") && (
					<div className="md:hidden mt-2 pb-2 w-full flex justify-center">
						<div className="w-[90%]">
							<SearchBar />
						</div>
					</div>
				)}
		</div>
	);
};

export default React.memo(Navbar);
