import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Card } from '../../components/Card';
import { Api } from '../../services/api';

import './style.css';


const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Feed = () => {
  const [publications, setPublication] = useState(null);

  useEffect(() => {
    const getPublications = async () => {
      await Api.get('/pub/all/').then(response => {
        setPublication(response.data);
      }).catch(err => {
        setPublication(null);
      });
    }

    getPublications();
  }, []);

  return (
    <div id="feed" className="container" style={{ minHeight: '30vh', marginBottom: '20px' }}>
      <br />
      <br />
      <h2>Confira abaixo as receitas mais recentes</h2>
      <br />
        {
          publications ?
            (
              // <section className="people-cards">
              <Container>
                {publications.map(pub => {
                  return (<Card key={pub.ID} obj={{ ...pub }} />)
                })}
              </Container>
            ) :
            <h3>Nenhuma publicação realizada até o momento</h3>
        }
    </div>
  );
};
