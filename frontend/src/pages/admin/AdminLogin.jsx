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

  useEffect(() => {
    const initCsrfToken = async () => {
      try {
        const res = await axios.get(`${API_URL}/csrf-token`);
        axios.defaults.headers.common["X-CSRF-Token"] = res.data.csrfToken;
      } catch (e) {
        console.error("Erro ao buscar CSRF token", e)
      }
    }

    initCsrfToken();
  }, []);

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/login`, values)
      .then(res => {
        if (res.data.status === "Success") {
          console.log(res.data.status);
          navigate("/admin/painel")
        } else {
          alert(res.data.error);
        }
      })
      .catch(err => console.log(err));
  }

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
              onChange={e => setValues({ ...values, nome: e.target.value })}
            />
          </div>
          <div className='w-full flex flex-row justify-between items-center shadow-md lg:p-2.5 2xl:p-3 rounded-lg border border-gray-300'>
            <BsKey className='lg:text-2xl 2xl:text-3xl text-blue-900 p-0.5 rotate-45' />
            <input
              className='w-[90%] outline-none text-right'
              placeholder='Senha'
              type='password'
              onChange={e => setValues({ ...values, senha: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className='cursor-pointer bg-gradient-to-l from-blue-700 to-blue-900 lg:p-4 2xl:p-5 text-white rounded-xl hover:scale-y-105 duration-300 mt-5'
          >
            Acessar
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminLogin;
