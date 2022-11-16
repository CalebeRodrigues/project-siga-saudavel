import P from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useAuth } from '../../context/Auth/useAuth';
import { Api } from '../../services/api';

import { ConvertDate } from '../../util/convertDates';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  text-align: center;
`;

const Th = styled.th`
  padding: 14px 12px;

  text-align: center;
  background-color: #04AA6D;
  color: white;
`;

const Tr = styled.tr`
  padding: 10px;

  td {
    padding: 12px;
    font-size: 16px;
    font-weight: 525;
  }

  :hover {
    transition: 0.1s;

    cursor: pointer;
    background-color: #dddddd6b;
  }
`;

export const TablePublications = () => {
  const auth = useAuth();
  const [pubs, setPubs] = useState(null);

  const navigate = useNavigate();

  const FindPubs = async (id) => {
    await Api.get(`/pub/user/${id}`)
      .then(resp => setPubs(resp.data));
  };

  useEffect(() => {
    FindPubs(auth.token);
  }, []);

  return (
    <Table>
      <Tr>
        <Th>ID</Th>
        <Th>Titulo</Th>
        <Th>Descrição</Th>
        <Th>Publicado</Th>
        <Th></Th>
      </Tr>
      {
        (pubs && pubs.length > 0) ?
            pubs.map((obj) =>
              (
                <Tr key={obj.ID} onClick={() => navigate(`/pub/${obj.ID}`)}>
                  <td>{obj.ID}</td>
                  <td>{obj.titulo}</td>
                  <td>{obj.descricao}</td>
                  <td>{ConvertDate(obj.createdAt)}</td>
                  <td><Link to={`/pub/${obj.ID}`}>Ver</Link></td>
                </Tr>
              )
            )
            :
            <Tr>
              <td colSpan={4}>
                <h3 style={{ textAlign: 'center' }}>Não existe nenhum publicação realizada pelo usuário.</h3>
              </td>
            </Tr>
      }
    </Table>
  );
};
