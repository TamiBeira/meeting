import { Link } from 'react-router-dom';
import { useFormContext } from '../contexts/FormContext';
import { ToastContainer } from 'react-toastify';

export const Form = () => {
  const {
    data,
    hora,
    title,
    emails,
    emailInput,
    handleDataChange,
    handleTitleChange,
    handleHoraChange,
    handleEmailInputChange,
    handleImagemChange,
    handleAddEmail,
    handleRemoveEmail,
    handleSubmit,
  } = useFormContext();

  return (
    <main className="flex flex-col items-center mt-8">
      <div className="mt-4 mb-4">
        <Link to="/meetings" className="w-40 inline-block text-center border border-solid border-blue-500 text-blue-500 font-bold mr-2 px-4 py-2 rounded">Reuniões</Link>
        <Link to="/" className="w-40 inline-block text-center border border-solid border-blue-500 text-blue-500 font-bold px-4 py-2 rounded">Home</Link>
      </div>
      <div className="mx-auto max-w-md p-6 bg-gray-100 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="reuniao" className="block text-sm font-medium text-gray-700">Agendar Reunião</label>
          <input 
            type="text" 
            placeholder="Objetivo da reunião" 
            id="reuniao" 
            value={title} 
            onChange={handleTitleChange} 
            className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
          />
          <input 
            type="date" 
            name="data" 
            id="data" 
            value={data} 
            onChange={handleDataChange} 
            className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
          />
          <input 
            type="time" 
            name="hora" 
            id="hora" 
            value={hora} 
            onChange={handleHoraChange} 
            className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
          />
          <input 
            type="file" 
            name="imagem" 
            id="imagem" 
            accept="image/*"
            onChange={handleImagemChange}
            className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
          />
          <div className="flex">
            <input 
              type="text" 
              placeholder="E-mail" 
              value={emailInput} 
              onChange={handleEmailInputChange} 
              className="block flex-1 w-full px-4 py-2 border rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
            />
            <button 
              type="button" 
              onClick={handleAddEmail} 
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              Adicionar
            </button>
          </div>
          <div>
            {emails.map((email, index) => (
              <div key={index} className="flex items-center">
                <div>{email}</div>
                <button 
                  type="button" 
                  onClick={() => handleRemoveEmail(index)}
                  className="ml-2 text-red-500"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
          <button 
            type="submit" 
            className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            Cadastrar Reunião
          </button>
        </form>
        <ToastContainer />
      </div>
    </main>
  );
};
