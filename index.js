import React from 'react'
import { formatWithValidation } from 'next/dist/next-server/lib/utils'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

function ItemDaLista(props){
  return(
    <>
    <li key={props.myKey}>{props.myKey} - {props.name}</li>
    </>
  )
}
function FooterMessage(props){
  return <p>teste...{props.message}</p>
}

export default function Home() {
  const objeto1 = {
    id: '1234',
    nome: 'item 1',
  }
  // lista 1 contem os itens inseridos no UL
  //const lista = [];
  const lista1 = [objeto1];
  const [lista,setLista] = React.useState(lista1);

  // lista 2 sera alimentada de um site externo...
  const [lista2,setLista2] = React.useState([]);
  React.useEffect(
    function(){
      // como exemplo peguei o Paulo Silveira da Alura...
      fetch('https://api.github.com/users/peas/followers').then(
        function (respostaDoServidor){
          return respostaDoServidor.json();
        }
      ).then(
        function (respostaCompleta){
          setLista2(respostaCompleta);
        }
      )
    }
  )

  return (
   <>
    <Title>Hello world...</Title>
    <p>teste bla bla bla... this is a paragraph</p>
    <form  onSubmit={function handleTeste1(e){
      e.preventDefault();

      const dadosForm = new FormData(e.target);

      const nome = dadosForm.get('teste');
      if(nome == ""){
        //alert('preencha o nome...');
        throw new Error('preencha o nome do item...');
      }

      const objeto2 = {
        id: new Date().toISOString(),
        nome: nome,
      }
    
      //lista.push('item...');
      const novaLista = [...lista, objeto2];
      setLista(novaLista);

      console.log(lista);

    } } >
      <input type="text" name="teste" aria-label="bla bla bla" placeholder="item name..."/>
      <button>
        insert item on list
        </button>
    </form>
    <h2>Items list ({lista.length})</h2>
    <ul>
      {lista.map((itemDaLista) => {
        return (
          <ItemDaLista key={itemDaLista.id} myKey={itemDaLista.id} name={itemDaLista.nome}/>
          //<li key={itemDaLista.id}>{itemDaLista.nome}</li>
        )
      })}
    </ul>
    <h2>Lista 2 - followers</h2>
    <ul>
      {lista2.map((itemDaLista2) => {
        return <ItemDaLista key={itemDaLista2.id} myKey={itemDaLista2.id} name={itemDaLista2.login}/>
      })}
    </ul>
    <FooterMessage message="footer 1"/>
    <FooterMessage message="footer 2"/>
  </>
  )
}
