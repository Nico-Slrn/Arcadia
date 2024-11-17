"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {

  const [carouselItems, setCarouselItems] = useState([]);
  const [animaux, setAnimaux] = useState([]);
  const [service, setService] = useState([]);

useEffect(() => {

  async function fecthAnimal() {
    const response = await fetch("http://localhost:3001/animal");
    const  animaux = await response.json();
    setAnimaux(animaux);
  }

  fecthAnimal();

  async function fetchHabitat() {
    const response = await fetch("http://localhost:3001/habitat");
    const carouselItems = await response.json();
    setCarouselItems(carouselItems);
  }
fetchHabitat()
  
async function fecthService() {
  const response = await fetch("http://localhost:3001/service");
  const  services = await response.json();
  setService(services);
}
fecthService();
})

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };


  return (
    <div className="container">
      <div className="container-image">
        <img src="/vue-zoo.webp" alt="Vue du Zoo" className="image-style" />
        <div className="texte-overlay">
          <h1>Bienvenue au Zoo Arcadia</h1>
          <p>
            Le Zoo Arcadia est un sanctuaire de la biodiversité, dédié à la conservation des espèces animales et à
            l'éducation du public.
          </p>
        </div>
      </div>

{ carouselItems.length > 0 ? (
        <div className="carousel">
        <h2>Différents Habitats</h2>
        <div className="carousel-slide carousel-full-width">
          <button className="carousel-arrow left" onClick={prevSlide}>
            &lt;
          </button>
          <img src={carouselItems[currentIndex].image} alt={carouselItems[currentIndex].title} className="carousel-image" />
          <button className="carousel-arrow right" onClick={nextSlide}>
            &gt;
          </button>
        </div>
        <h3>{carouselItems[currentIndex].title}</h3>
        <p>{carouselItems[currentIndex].description}</p>
      </div>
) : (<></>) }

      <section className="zoo-animals">
        <h2>Animaux du Zoo</h2>
        <div className="animal-section">
          {animaux.map((animal) => (
            <div key={animal.id} className="animal-card">
              <h3>{animal.name}</h3>
              <div className="animal-images">
                  <img key={animal.id} src={animal.image} alt={animal.name} />
              </div>
              <Link href={`/animal/${animal.id}`}
              className="more-info">En savoir plus
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="services">
        <h2>Services Offerts</h2>
        <p>Le Zoo Arcadia propose divers services pour enrichir l'expérience des visiteurs :</p>
        <ul>
        {service.map((service) =>( 
          <li>{service.title}</li>
        ))}
        </ul>
      </section>

      <section className="visitor-reviews">
        <h2>Avis des Visiteurs</h2>
        <blockquote>"Un lieu incroyable pour découvrir des animaux et en apprendre davantage sur la conservation !" — <strong>Marie D.</strong></blockquote>
        <blockquote>"Les habitats des animaux sont magnifiques. Mes enfants ont adoré !" — <strong>Jean R.</strong></blockquote>
        <blockquote>"Une expérience éducative et amusante, je recommande vivement !" — <strong>Sophie T.</strong></blockquote>
      </section>
    </div>
  );
}
