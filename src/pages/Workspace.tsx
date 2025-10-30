import MyApi from "@/components/my-api";
import Sidebar from "@/components/sidebar";
import SubscribedApi from "../components/Subscribed";

const Workspace = () => {
	return (
		<div>
			<div className="md:mt-12">
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
