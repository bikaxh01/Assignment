
import { Routes, Route } from "react-router";
import EventPage from "./pages/events/EventPage";
import SignInPage from "./pages/siginIn/SignInPage";
import SignUpPage from "./pages/signUp/SignUpPage";
import UpdatePage from "./pages/update/UpdatePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EventPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/update" element={<UpdatePage/>}/>
      </Routes>

    </>
  );
}

export default App;
