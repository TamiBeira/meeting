import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Bem-vindo à página inicial</h1>
      <div className="flex space-x-4">
        <Link
          to="/form1"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Formulário 1
        </Link>
        <Link
          to="/form2"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Formulário 2
        </Link>
      </div>
      <div className="mt-8">
        <Link
          to="/meetings"
          className="bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ver Reuniões
        </Link>
      </div>
    </div>
  );
};

