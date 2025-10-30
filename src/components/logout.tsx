import { logoutUser } from "@/features/user/userSlice";
import type { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux"


const Logout = () => {

    const dispatch = useDispatch<AppDispatch>();

    async () => {
        await dispatch(logoutUser());
    }

    return (
        <></>
    )
}

export default Logout;
