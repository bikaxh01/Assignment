import CreateEventDialog from "../atom/CreateEventDialog";
import { Link } from "react-router";
import { useStore } from "../../../store/user.store";

function NavBar() {
  const user = useStore((state) => state.user);

  return (
    <div className="  flex justify-between  p-1 items-center">
      <div className=" font-bold flex gap-1  text-xl ">
        <span>Hive </span>
        <span className="  text-[#7848F4]">Event</span>
      </div>

      <div className=" flex gap-3">
        {!user && (
          <>
            <Link to={"/sign-in"}>
              <button className="h-9 w-[128px] text-xs rounded-lg  hover:bg-[#7848F4] hover:text-white   ">
                Sign In
              </button>
            </Link>
            <Link to={"/sign-up"}>
              <button className="  h-9 bg-[#7848F4] w-[128px] rounded-lg  text-xs text-white">
                Sign up
              </button>
            </Link>
          </>
        )}
        {user && user.type == "ADMIN" && <CreateEventDialog />}
      </div>
    </div>
  );
}

export default NavBar;
