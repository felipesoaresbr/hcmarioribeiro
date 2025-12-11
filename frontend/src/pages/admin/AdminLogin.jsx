import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logotipo.png';
import { BsKey, BsPerson } from "react-icons/bs";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    nome: "",
    senha: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const initCsrfToken = async () => {
      try {
        const res = await axios.get(`${API_URL}/csrf-token`);
        axios.defaults.headers.common["X-CSRF-Token"] = res.data.csrfToken;
      } catch {
        setErrorMessage("Erro ao conectar ao servidor.");
      }
    };
    initCsrfToken();
  }, []);

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axios.post(`${API_URL}/login`, values);

      if (res.data.status === "Success") {
        navigate("/admin/painel");
      } else {
        setErrorMessage(res.data.error || "Erro ao fazer login.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setErrorMessage("Usuário ou senha incorretos.");
      } else {
        setErrorMessage("Ocorreu um erro ao tentar fazer login.");
      }
    }
  };

  return (
    <main className="bg-gray-50 h-screen w-screen flex items-center justify-center">
      <section className="bg-white lg:w-[402px] 2xl:w-1/4 h-fit rounded-2xl shadow-md/20 border px-5 py-8 border-gray-300 flex flex-col">
        <header className='w-full flex items-center justify-center mb-6'>
          <img src={Logo} className='w-2/5' alt="Logotipo" />
        </header>

        <form className='w-full text-gray-800 text-lg flex flex-col gap-5 mt-auto' onSubmit={handleSubmit}>
          <div className='w-full flex flex-row justify-between items-center shadow-md lg:p-2.5 2xl:p-3 rounded-lg border border-gray-300'>
            <BsPerson className='lg:text-2xl 2xl:text-3xl text-blue-900 p-0.5' />
            <input
              className='w-[90%] outline-none text-right'
              placeholder='Usuário'
              type='text'
              value={values.nome}
              onChange={e => setValues({ ...values, nome: e.target.value })}
            />
          </div>
          <div className='w-full flex flex-row justify-between items-center shadow-md lg:p-2.5 2xl:p-3 rounded-lg border border-gray-300'>
            <BsKey className='lg:text-2xl 2xl:text-3xl text-blue-900 p-0.5 rotate-45' />
            <input
              className='w-[90%] outline-none text-right'
              placeholder='Senha'
              type='password'
              value={values.senha}
              onChange={e => setValues({ ...values, senha: e.target.value })}
            />
          </div>

          {errorMessage && (
            <p className="text-red-600 text-center text-md">{errorMessage}</p>
          )}

          <button
            type="submit"
            className='cursor-pointer bg-gradient-to-l from-blue-700 to-blue-900 lg:p-4 2xl:p-5 text-white rounded-xl hover:scale-y-105 duration-300 mt-2'
          >
            Acessar
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminLogin;
