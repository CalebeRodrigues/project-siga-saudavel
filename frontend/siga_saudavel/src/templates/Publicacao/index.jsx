import P from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Api } from '../../services/api';

import background from './backgroud2.jpg';


const List = styled.ul`
  padding-left: 30px;
  li {
    list-style-type: circle;
  }
`;

export const Publicacao = () => {
  const [data, setData] = useState({});
  const [autor, setAutor] = useState('');

  const { titulo, descricao, conteudo, ingredientes } = data;
  // const { titulo, descricao, conteudo, imagem } = data;

  const { id } = useParams();

  const FindPub = async (id) => {
    try {
      const obj = await Api.get(`/pub/${id}`);
      setData(obj.data);
    }
    catch {
      setData(null);
    }
  };

  const findUser = async (id) => {
    try {
      const { nick } = await (await Api.get(`/user/${id}`)).data;

      setAutor(nick.toLowerCase());
    }
    catch {
      setAutor("desconhecido");
    }
  }

  useEffect(() => {
    FindPub(id);
  },[]);

  useEffect(() => {
    findUser(data.IDUser);
  }, [data]);

  return (
    <>
      <img src={background} className="img-fluid w-100" alt="" />
      <div className='container'>
        <br />
        <div className="row">
          <center><h1>{titulo}</h1></center>
          <center><p>{descricao}</p></center>
          <h4 style={{ margin: '20px 0 15px 0' }}>Ingredientes:</h4>

            <List>
          {
            (ingredientes && ingredientes.length > 0) &&
              ingredientes.split(',').map(value =>
                (
                  <li key={value}>{value}</li>
                )
              )
          }
            </List>
          <h4 style={{ marginTop: '20px' }}>Modo de Preparo</h4>
          <p>{conteudo}</p>

          <p style={{ fontSize: '12px' }}>Publicação feita por @{autor}</p>
        </div>
      </div>
    </>
  )
}

Publicacao.propTypes = {
  data: P.object
}
