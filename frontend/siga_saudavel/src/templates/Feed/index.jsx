import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from '../../components/Card';
import { Api } from '../../services/api';
import './style.css';

export const Feed = () => {
  const [publications, setPublication] = useState(null);

  useEffect(() => {
    const getPublications = async () => {
      await Api.get('/pub/all/').then(response => {
        console.log(response.data)
        setPublication(response.data);
      }).catch(err => {
        setPublication(null);
      });
    }

    getPublications();
  }, []);

  return (
    <div className="container" style={{ minHeight: '30vh', marginBottom: '20px' }}>
      <h2>Publicações</h2>
        {
          publications ?
            (
              <section className="people-cards">
                {publications.map(pub => {
                  return (<Card key={pub.ID} obj={{ ...pub }} />)
                })}
              </section>
            ) :
            <h3>Nenhuma publicação realizada até o momento</h3>
        }
    </div>
  );
};
