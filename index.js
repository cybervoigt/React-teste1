import React from 'react'
import { formatWithValidation } from 'next/dist/next-server/lib/utils'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

function ListaTeste2(props){
  return <p>teste...{props.message}</p>
}

export default function Home() {
  const objeto1 = {
    id: '1234',
    nome: 'item 1',
  }
  //const lista = [];
  const lista1 = [objeto1];
  const [lista,setLista] = React.useState(lista1);

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
        throw new Error('preencha o nome...');
      }else{
        const objeto2 = {
          id: new Date().toISOString(),
          nome: nome,
        }
      
        //lista.push('item...');
        const novaLista = [...lista, objeto2];
        setLista(novaLista);
      }

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
          <li key={itemDaLista.id}>{itemDaLista.nome}</li>
        )
      })}
    </ul>
    <ListaTeste2 message="footer 1"/>
    <ListaTeste2 message="footer 2"/>
  </>
  )
}
