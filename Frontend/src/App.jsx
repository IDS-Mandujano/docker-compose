import React, { useState, useEffect } from 'react';
import { User, Menu, Image, Film, Facebook, Twitter, Instagram, Phone, Mail } from 'lucide-react';
import {fetchUserData} from './services/apiService'

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetchUserData()
      .then(data => {
        setUserData(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
        <div className="text-xl font-semibold text-gray-700">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 font-inter">
        <div className="text-xl font-semibold text-red-700">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter text-gray-800">

      <nav className='menu-container sticky top-0 z-50 flex items-center justify-between w-full p-4 px-6 bg-white shadow-sm border-b border-gray-200'>
        <div className="text-2xl font-bold text-gray-900">
          MiLogo
        </div>
        <ul className='hidden md:flex items-center space-x-6'>
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Inicio</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Productos</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Nosotros</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contacto</a></li>
        </ul>
        <div className='flex items-center space-x-3'>
          <div className='flex items-center space-x-2 text-gray-700'>
            <User size={20} className="text-gray-500" />
            <p className="font-medium">{userData.nombreCompleto}</p>
          </div>
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center px-6 py-24 text-center bg-gray-50">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Diseño Minimalista y Moderno
        </h1>
        <p className="max-w-2xl text-lg text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, totam? Quia, sed? Nemo ipsam cum accusamus omnis modi veniam tempora nam eos.
        </p>
        <button className="mt-8 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors">
          Empezar Ahora
        </button>
      </section>

      <section className='carousel-container py-20 bg-white'>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Galería de Productos</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>

            <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md overflow-hidden">
              <img src="https://placehold.co/400x400/e2e8f0/334155?text=Producto+1" alt="Producto 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md overflow-hidden">
              <img src="https://placehold.co/400x400/cbd5e1/334155?text=Producto+2" alt="Producto 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md overflow-hidden">
              <img src="https://placehold.co/400x400/94a3b8/334155?text=Producto+3" alt="Producto 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md overflow-hidden">
              <img src="https://placehold.co/400x400/e2e8f0/334155?text=Producto+4" alt="Producto 4" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className='video-container max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
          <div className="aspect-video bg-gray-900 rounded-lg shadow-xl flex items-center justify-center text-gray-400">
            <Film size={64} />
            <span className="ml-4 text-xl font-medium">Video Placeholder</span>
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-4">Descubre Nuestro Proceso</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className='max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12'>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">MiLogo</h3>
            <p className="text-gray-400">
              Creando soluciones minimalistas para problemas complejos.
            </p>
          </div>

          <div className='social-network'>
            <h3 className="text-xl font-semibold text-white mb-4">Síguenos</h3>
            <ul className='flex space-x-4'>
              <li><a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"><Facebook size={20} /></a></li>
              <li><a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"><Twitter size={20} /></a></li>
              <li><a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"><Instagram size={20} /></a></li>
            </ul>
          </div>

          <div className='contact'>
            <h3 className="text-xl font-semibold text-white mb-4">Contacto</h3>
            <div className="space-y-3">
              <p className="flex items-center">
                <Phone size={18} className="mr-3 text-gray-400" />
                <a href="tel:+529613059364" className="hover:text-white transition-colors">(+52) 961-305-9364</a>
              </p>
              <p className="flex items-center">
                <Mail size={18} className="mr-3 text-gray-400" />
                <a href="mailto:233325ids.upchiapas.edu.mx" className="hover:text-white transition-colors break-all">233325ids.upchiapas.edu.mx</a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MiEmpresa. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

export default App;
