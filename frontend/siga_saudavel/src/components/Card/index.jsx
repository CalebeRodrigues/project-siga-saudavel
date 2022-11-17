import { Link, useNavigate } from 'react-router-dom';
import './style.css';

import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid #c9c9c9;

  border-radius: 10px;

  margin: 10px 0;
  padding: 15px;
`;

const Button = styled.button`
  border: 1px solid #c9c9c9;

  :hover {
    transition: 0.2s;
    scale: calc(1.01);
    background-color: #c9c9c9;
  }
`;

export const Card = (obj) => {
  const navigate = useNavigate();
  const { ID, titulo, ingredientes, descricao } = obj.obj;

  // return (
  //   <Link style={{ textDecoration: 'none' }} to={`/pub/${ID}`}>
  //     <article className="people-cards__card" data-aos-duration="600" data-aos="zoom-out-up">

  //       <img src="img/culinaria/receita-mingau-de-tapioca.jpg" alt="Carousel Img" className="people-cards__image" />

  //       <div className="people-cards__content">
  //         <h2 className="people-cards__title">{titulo}</h2>
  //         {/* <p className="people-cards__ingrediente">Ingredientes: {ingredientes}</p> */}
  //         <p className="people-cards__text">{descricao}</p>
  //       </div>
  //     </article>
  //   </Link>
  // );

    return (
      <Container className='container' data-aos="fade-in" data-aos-duration="400">
        <div className="row">
          <div className="col-md-4">
            <img src="img/culinaria/receita-mingau-de-tapioca.jpg" alt="Imagem demonstrativa" className="img-fluid w-100" />
          </div>
          <div className="col-md-8">
            <h3>{titulo}</h3>
            <p>Ingredientes: {ingredientes}</p>
            <p>{descricao}</p>

            <Button className='btn' onClick={() => navigate(`/pub/${ID}`)}>Ver mais</Button>
          </div>
        </div>
      </Container>
    );
}
