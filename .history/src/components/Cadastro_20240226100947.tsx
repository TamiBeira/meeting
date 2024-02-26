import { useState } from 'react';
import GlobalStyles from './GlobalStyles';


function App() {
  // Use o estado local para rastrear os valores dos campos de entrada
  const [nomeEvento, setNomeEvento] = useState('');
  const [dataDesejada, setDataDesejada] = useState('');
  const [horaNaoAntesDe, setHoraNaoAntesDe] = useState('');
  const [horaNaoDepoisDe, setHoraNaoDepoisDe] = useState('');

  const handleFinalizarClick = () => {
    // Aqui você pode fazer algo com os valores dos campos de entrada
    console.log('Nome do Evento:', nomeEvento);
    console.log('Data Desejada:', dataDesejada);
    console.log('Hora Não Antes De:', horaNaoAntesDe);
    console.log('Hora Não Depois De:', horaNaoDepoisDe);
  };

  return (
    <>
      <GlobalStyles />
      <W100>
        <Header>
          <InputText
            type="text"
            placeholder="Nome do Evento"
            value={nomeEvento}
            onChange={(e) => setNomeEvento(e.target.value)}
          />
        </Header>
        <SectionW2>
          <TextW100>Selecione a data desejada</TextW100>
          <InputData
            type="date"
            value={dataDesejada}
            onChange={(e) => setDataDesejada(e.target.value)}
          />
        </SectionW2>
        <SectionW2>
          <TextW100>Selecione o horário desejado</TextW100>
          <TextW2>Não antes de:</TextW2>
          <InputTime
            type="time"
            value={horaNaoAntesDe}
            onChange={(e) => setHoraNaoAntesDe(e.target.value)}
          />
          <TextW2>Não depois de:</TextW2>
          <InputTime
            type="time"
            value={horaNaoDepoisDe}
            onChange={(e) => setHoraNaoDepoisDe(e.target.value)}
          />
        </SectionW2>
      </W100>
      <W100>
        <button onClick={handleFinalizarClick}>Finalizar</button>
      </W100>
    </>
  );
}

export default App;