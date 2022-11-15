import './style.css';

export const Card = (obj) => {
  const { titulo, ingredientes, descricao } = obj.obj;

  console.log(obj)

  return (
    <article className="people-cards__card" data-aos-duration="600" data-aos="zoom-out-up">

      <img src="img/culinaria/receita-mingau-de-tapioca.jpg" alt="Carousel Img" className="people-cards__image" />

      <div className="people-cards__content">
        <h2 className="people-cards__title">{titulo}</h2>
        <p className="people-cards__ingrediente">Ingredientes: {ingredientes}</p>
        <p className="people-cards__text">{descricao}</p>
      </div>
    </article>
  );
}
