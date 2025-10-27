import { Navigate, NavLink, Route, Routes, useParams } from "react-router-dom";
import UserAnalytics from "./user_analytics";
import TrafficAnalytics from "./traffic_analytics";

const Analytics = () => {

    const { apiId } = useParams();

    return (
        <div>
            <div>
                <ul className="px-3 py-5 flex gap-6 text-xl">
                    <li>
                        <NavLink
                            to={`/studio/${apiId}/analytics/traffic_analytics`}
                            className={({ isActive }) =>
                                `pb-2 ${isActive ? "border-b-2 border-primary" : "border-b-2 border-transparent"}`
                            }
                        >
                            Traffic Analytics
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/studio/${apiId}/analytics/user_analytics`}
                            className={({ isActive }) =>
                                `pb-2 ${isActive ? "border-b-2 border-primary" : "border-b-2 border-transparent"}`
                            }
                        >
                            User Analytics
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div>
                <Routes>
                    <Route path="/" element={<Navigate to={`traffic_analytics`} replace />} />

                    <Route path="traffic_analytics" element={<TrafficAnalytics />} />
                    <Route path="user_analytics" element= {<UserAnalytics />} />
                </Routes>
            </div>
        </div>
    )
}

export default Analytics;
