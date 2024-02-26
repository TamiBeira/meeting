import { useState } from "react";

export const Form = () => {
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [imagem, setImagem] = useState();
    const [title, setTitle] = useState();

    return (
        <main className="flex justify-center mt-8">
            <div className="mx-auto bg-gray-100 rounded-lg shadow-xl p-6 space-y-4">
                <label htmlFor="reuniao" className="block text-sm font-medium text-gray-700">Assunto reunião</label>
                <input type="text" placeholder="Reunião" id="reuniao" className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                <input type="datetime-local" name="" id="" className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                <input type="file" name="" id="" className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500">Cadastrar Reunião</button>
            </div>
        </main>
    )
}
