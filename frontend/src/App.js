import { useEffect, useState } from "react";
import { AdminContext, UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
require("dotenv").config();

function App() {
  const [uid, setUid] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setUid(sessionStorage.getItem("userID"));
    setAdmin(sessionStorage.getItem("admin"));
  }, [uid, admin]);

  // PAGE APP QUI REDIRIGE VERS LA PAGE ROUTES INDEX + INITIALISATION DES DIFFERENTS CONTEXTS
  return (
    <UidContext.Provider value={uid}>
      <AdminContext.Provider value={admin}>
        <Routes />
      </AdminContext.Provider>
    </UidContext.Provider>
  );
}

export default App;
