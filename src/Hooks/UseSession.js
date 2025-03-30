import { useContext } from "react";
import { SessionContext } from "../Context/SessionContext";
const useSession = () => {
  const context = useContext(SessionContext);  

  if (!context) {
    throw new Error("useSession must be used within a SessionContextProvider");
  }

  return context;  
};

export default useSession;
