import { useState } from "react";

export const Form = () => {
    const [data, setData] = useState('');
    const [imagem, setImagem] = useState('');
    const [title, setTitle] = useState('');

    const handleDataChange = (event) => {
        setData(event.target.value);
    };

    const handleImagemChange = (event) => {
        setImagem(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(title, data, imagem)
    };

    return (
        <main className="flex justify-center mt-8">
            <div className="mx-auto max-w-md p-6 bg-gray-100 rounded-lg shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label htmlFor="reuniao" className="block text-sm font-medium text-gray-700">Agendar Reunião</label>
                    <input 
                        type="text" 
                        placeholder="Assunto" 
                        id="reuniao" value={title} 
                        onChange={handleTitleChange} 
                        className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    />
                    <input 
                        type="datetime-local" 
                        name="" 
                        id="" 
                        value={data} 
                        onChange={handleDataChange} 
                        className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    />
                    <input 
                        type="file" 
                        name="" 
                        id="" 
                        value={imagem} 
                        onChange={handleImagemChange} 
                        className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    />
                    <button 
                        type="submit" 
                        className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        Cadastrar Reunião
                    </button>
                </form>
            </div>
        </main>
    )
}
