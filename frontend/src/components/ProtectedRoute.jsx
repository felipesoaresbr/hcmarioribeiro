import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch(`${API_URL}/verify_session.php`, {
          method: "GET",
          credentials: "include", // envia cookie JWT
        });

        const data = await res.json();

        if (res.ok && data.authenticated) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setAuth(true);
        } else {
          localStorage.removeItem("user");
          setAuth(false);
        }
      } catch (err) {
        console.error("Erro ao verificar sessão:", err);
        setAuth(false);
      }
    };

    verifySession();
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
