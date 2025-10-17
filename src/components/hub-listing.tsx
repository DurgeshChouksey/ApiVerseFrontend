import { Route, Routes, useParams, NavLink, Navigate } from "react-router-dom";
import General from "./general";
import Definition from "./definition";
import Docs from "./docs";

const HubListing = () => {

    const { apiId } = useParams();

    return (
        <div>
            <div>
                <ul className="px-3 py-5 flex gap-6 text-xl">
                    <li>
                        <NavLink
                            to={`/studio/${apiId}/publish/general`}
                            className={({ isActive }) =>
                                `pb-2 ${isActive ? "border-b-2 border-primary" : "border-b-2 border-transparent"}`
                            }
                        >
                            General
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/studio/${apiId}/publish/definition`}
                            className={({ isActive }) =>
                                `pb-2 ${isActive ? "border-b-2 border-primary" : "border-b-2 border-transparent"}`
                            }
                        >
                            Definition
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/studio/${apiId}/publish/docs`}
                            className={({ isActive }) =>
                                `pb-2 ${isActive ? "border-b-2 border-primary" : "border-b-2 border-transparent"}`
                            }
                        >
                            Docs
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div>
                <Routes>
                    <Route path="/" element={<Navigate to={`general`} replace />} />

                    <Route path="general" element={<General/>} />
                    <Route path="definition" element= {<Definition/>} />
                    <Route path="docs" element= {<Docs />} />
                </Routes>
            </div>
        </div>
    )
}

export default HubListing;
