import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Maternity from './pages/Maternity';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPainel from './pages/admin/AdminPainel';
import RootLayout from './components/layout/RootLayout';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import NewsReader from './pages/NewsReader';
import AllNews from './pages/AllNews';
import Academic from './pages/Academic';
import Despesas from './pages/Despesas';
import CorpoClinico from './pages/CorpoClinico';
import { MantineProvider } from '@mantine/core';
import '@mantine/tiptap/styles.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/corpoclinico' element={<CorpoClinico />} />
        <Route path='/academic' element={<Academic />} />
        <Route path='/despesas' element={<Despesas />} />
        <Route path='/maternity' element={<Maternity />} />
        <Route path="/news" element={<AllNews />} />
        <Route path='/news/:id' element={<NewsReader />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>

      <Route path='/admin'>
        <Route index element={<AdminLogin />} />
        <Route
          path='painel'
          element={
            <ProtectedRoute>
              <AdminPainel />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;