import { Feed } from '../Feed';
import './style.css';

export const Home = () => {
  return (
    <>
    <section className="hero">
          <h1 className="hero__title" data-aos="fade-up">
            ENCONTRE AS MELHORES RECEITAS AQUI
          </h1>
          <p className="hero__text" data-aos="fade-in" data-aos-delay="200">“Na vida saudável, não há medo ou culpa, apenas alegria e equilíbrio”</p>
    </section>

    <Feed />
    </>
  );
};
