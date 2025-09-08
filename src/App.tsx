import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/not-found";
import { useAuthInit } from "./hook/use-auth";

function App() {
  useAuthInit();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
