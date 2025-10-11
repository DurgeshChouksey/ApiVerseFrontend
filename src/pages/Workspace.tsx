import MyApi from "@/components/my-api";
import Sidebar from "@/components/sidebar";
import SubscribedApi from "@/components/subscribed";
import React from "react";

const Workspace = () => {
	return (
		<div>
			<div className="mt-30 md:mt-12">
				<Sidebar />

				<div>
                    <MyApi></MyApi>
                    <SubscribedApi></SubscribedApi>
                </div>
			</div>
		</div>
	);
};

export default Workspace;
