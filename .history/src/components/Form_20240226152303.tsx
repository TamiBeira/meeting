import { useFormContext } from "../contexts/FormContext";
import { ToastContainer } from 'react-toastify';

export const Form = () => {
  const {
    data,
    hora,
    imagem,
    title,
    emails,
    emailInput,
    handleDataChange,
    handleImagemChange,
    handleTitleChange,
    handleHoraChange,
    handleEmailInputChange,
    handleAddEmail,
    handleSubmit,
  } = useFormContext();

  return (
    <main className="flex justify-center mt-8">
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
            type="datetime-local" 
            name="data" 
            id="data" 
            value={data} 
            onChange={handleDataChange} 
            className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
          />
          <input 
            type="file" 
            name="imagem" 
            id="imagem" 
            value={imagem} 
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
              <div key={index}>{email}</div>
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
