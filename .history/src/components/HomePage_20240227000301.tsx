import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Bem-vindo ao meeting</h1>
      <div className="flex space-x-4">
        <Link
          to="/form"
          className="w-60 text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cadastrar Reuniões
        </Link>
      </div>
      <div className="mt-8">
        <Link
          to="/meetings"
          className="w-60 text-center "
        >
          Ver Reuniões
        </Link>
      </div>
    </div>
  );
};

