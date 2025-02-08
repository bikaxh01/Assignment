import { getGuestEvents } from "@/apis/events.api";
import EvenComponent from "@/components/common/EvenComponent";
import FilterComponent from "@/components/common/FilterComponent";
import HeroSection from "@/components/common/HeroSection";
import NavBar from "@/components/common/NavBar";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../../store/user.store";
import { useEffect } from "react";
import { getUserData } from "@/apis/user.api";
function EventPage() {
  const addUser = useStore((state) => state.addUser);



  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();

      addUser(user);
    };
    fetchUser();
  }, [addUser]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getGuestEvents,
    staleTime: 1000 * 60 * 5,
  });


  if (error) {
    return (
      <>
        <h1>Something went wrong</h1>
      </>
    );
  }

  return (
    <div className="p-6 ">
      <div>
        <NavBar />
      </div>
      <div className=" relative  ">
        <HeroSection />
      </div>

      <div className=" absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  px-4">
        <FilterComponent />
      </div>
      <div>
        <EvenComponent data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default EventPage;
