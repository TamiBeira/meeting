import { useState } from "react";

export const Form = () =>{
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [imagem, setImagem] = useState();
    const [title, setTitle] = useState();
    
    return(
        <main>
            <div>
                <input type="text" placeholder="Reunião" />
                <input type="date" name="" id="" />
                <input type="datetime" name="" id="" />
                <input type="file" name="" id="" />
            </div>
        </main>
    )
}