import { useState } from "react";

export const Form = () =>{
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [imagem, setImagem] = useState();
    const [title, setTitle] = useState();

    return(
        <main>
            <div>
                <label htmlFor="reuniao">Assunto reunião</label>
                <input type="text" placeholder="Reunião" id="reuniao"/>
                <input type="datetime-local" name="" id="" />
                <input type="file" name="" id="" />
                <button>Cadastrar Reunião</button>
            </div>
        </main>
    )
}