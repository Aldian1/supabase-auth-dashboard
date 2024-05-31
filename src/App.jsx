import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { supabase } from "./supabaseClient";
import { useEffect, useState } from "react";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={session ? <Dashboard /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;