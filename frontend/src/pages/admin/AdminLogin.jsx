import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logotipo.png';
import { BsKey, BsPerson } from "react-icons/bs";

const API_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const res = await fetch(`${API_URL}/csrf_token.php`, {
          method: "GET",
          credentials: "include"
        });

        const text = await res.text();
        const contentType = res.headers.get('content-type') || '';

        if (!contentType.includes('application/json')) {
          console.error('Resposta CSRF não é JSON:', text);
          throw new Error('Resposta inválida do servidor');
        }

        const data = JSON.parse(text);
        if (!data.csrf_token) throw new Error('Token CSRF não encontrado');

        setCsrfToken(data.csrf_token);
      } catch (err) {
        console.error('Erro ao obter CSRF token:', err);
        setError('Erro ao obter token CSRF. Atualize a página.');
      }
    };

    fetchCsrfToken();
  }, []);

  const handleInputChange = (e, type) => {
    if (type === "user") setUser(e.target.value);
    if (type === "pass") setPass(e.target.value);
  };

  const loginSubmit = async () => {
    setError("");
    setMsg("");

    if (!user.trim() || !pass.trim()) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    if (!csrfToken) {
      setError("Token CSRF não está disponível. Atualize a página.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        },
        credentials: "include",
        body: JSON.stringify({ user, pass })
      });

      const text = await res.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Resposta inválida do servidor:', e, text);
        throw new Error('Resposta inválida do servidor');
      }

      if (!res.ok) {
        setError(data.error || `Erro do servidor (${res.status})`);
        return;
      }
      if (data.csrf_token) {
        setCsrfToken(data.csrf_token);
        sessionStorage.setItem("csrf_token", data.csrf_token);
      }

      setMsg(data.result || "Login efetuado com sucesso!");

      setTimeout(() => navigate('/admin/painel'), 1000);

    } catch (err) {
      console.error("Erro no login:", err);
      setError("Erro de conexão com o servidor");
    }
  };

  return (
    <main className="bg-gray-50 h-screen w-screen flex items-center justify-center">
      <section className="bg-white lg:w-[402px] 2xl:w-1/4 h-fit rounded-2xl shadow-md/20 border px-5 py-8 border-gray-300 flex flex-col">
        <header className='w-full flex items-center justify-center mb-6'>
          <img src={Logo} className='w-2/5' alt="Logotipo" />
        </header>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {msg && <p className="text-green-600 text-center mb-2">{msg}</p>}

        <form className='w-full text-gray-800 text-lg flex flex-col gap-5 mt-auto' onSubmit={(e) => e.preventDefault()}>
          <div className='w-full flex flex-row justify-between items-center shadow-md lg:p-2.5 2xl:p-3 rounded-lg border border-gray-300'>
            <BsPerson className='lg:text-2xl 2xl:text-3xl text-blue-900 p-0.5' />
            <input
              className='w-[90%] outline-none text-right'
              placeholder='Usuário'
              type='text'
              value={user}
              onChange={(e) => handleInputChange(e, "user")}
            />
          </div>
          <div className='w-full flex flex-row justify-between items-center shadow-md lg:p-2.5 2xl:p-3 rounded-lg border border-gray-300'>
            <BsKey className='lg:text-2xl 2xl:text-3xl text-blue-900 p-0.5 rotate-45' />
            <input
              className='w-[90%] outline-none text-right'
              placeholder='Senha'
              type='password'
              value={pass}
              onChange={(e) => handleInputChange(e, "pass")}
            />
          </div>
          <button
            type="button"
            className='cursor-pointer bg-gradient-to-l from-blue-700 to-blue-900 lg:p-4 2xl:p-5 text-white rounded-xl hover:scale-y-105 duration-300 mt-5'
            onClick={loginSubmit}
          >
            Acessar
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminLogin;
