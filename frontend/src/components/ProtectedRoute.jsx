import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/login/verify`)
    .then(res => {
      if (res.data.status === "Success") {
        setAuth(true);
      };
    })
  }, []);

  if (auth === null)
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Carregando...
      </div>
    );

  return auth ? children : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
