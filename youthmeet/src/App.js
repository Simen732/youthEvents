import { Routes ,Route} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Events from "./pages/Events";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage></LandingPage>}></Route>
      <Route path="/events" element={<Events></Events>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signUp" element={<SignUp></SignUp>}></Route>
    </Routes>
  );
}

export default App;
