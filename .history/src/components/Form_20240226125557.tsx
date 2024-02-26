import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Form = () => {
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [imagem, setImagem] = useState('');
    const [title, setTitle] = useState('');
    const [emails, setEmails] = useState([]);
    const [emailInput, setEmailInput] = useState('');

    const handleDataChange = (event) => {
        setData(event.target.value);
    };

    const handleImagemChange = (event) => {
        setImagem(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleHoraChange = (event) => {
        setHora(event.target.value);
    };

    const handleEmailInputChange = (event) => {
        setEmailInput(event.target.value);
    };

    const handleAddEmail = () => {
        setEmails([...emails, emailInput]);
        setEmailInput('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedDate = new Date(data).toLocaleDateString('pt-BR');
        const formattedTime = hora.split(':').map((val, index) => index === 0 ? val.padStart(2, '0') : val.padEnd(2, '0')).join(':');
        const formattedDateTime = `${formattedDate} ${formattedTime}`;
        const meetingData = {
            title,
            data: formattedDate,
            hora: formattedTime,
            imagem,
            emails
        };
        localStorage.setItem('meetingData', JSON.stringify(meetingData));
        console.log(`Dados da reunião: ${JSON.stringify(meetingData)}`);

        // Exibe o toast de sucesso
        toast.success('Reunião cadastrada com sucesso!');

        // Limpa os campos
        setData('');
        setHora('');
        setImagem('');
        setTitle('');
        setEmailInput('');
        setEmails([]);
    };

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
                {/* Componente ToastContainer para renderizar os toasts */}
                <ToastContainer />
            </div>
        </main>
    )
}
