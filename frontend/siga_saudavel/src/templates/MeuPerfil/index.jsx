import { useAuth } from "../../context/Auth/useAuth";

import styled from 'styled-components';
import { useState } from "react";

import { TablePublications } from "../../components/TablePublications";
import { useEffect } from "react";

const Title = styled.h2`
  padding-top: 10%;

  @media screen and (max-width: 770px) {
    padding-top: 2%;
    font-size: 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
  margin-top: 10px;
  width: 100%;
`;

const GridItem = styled.div`
  padding: 10px;
  margin: 0 5px;
  font-size: 26px;

  text-align: center;

  border-bottom: 1px solid #00000023;

  cursor: pointer;

    :hover {
      transition: 0.1s;
      color: #1db309;
      transform: scale(1.1);
      border-bottom: none;
    }
`;

export const MeuPerfil = () => {
  const auth = useAuth();

  // 0- Nada, 1- Lista Publicações, 2- dados perfil
  const [op, setOp] = useState(0);

  return (
    <>
      <div className="container">
        <Title>Meu perfil ({auth.nome})</Title>
        <Grid>
          <GridItem onClick={() => setOp(1)}>
            Minhas publicações
          </GridItem>

          <GridItem onClick={() => setOp(2)}>
            Atualizar dados
          </GridItem>

          <GridItem onClick={() => setOp(3)}>
            Criar Publicação
          </GridItem>
        </Grid>

        <br />

      {
        op === 1 && <TablePublications />
      }

      </div>
    </>
  )
};
