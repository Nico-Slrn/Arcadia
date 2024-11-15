"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
  const carouselItems = [
    {
      title: "Savanne",
      description: "Habitat des grands mammifères comme les lions et les girafes.",
      image: "/savanne.webp",
    },
    {
      title: "Jungle",
      description: "Zone humide pour les oiseaux tropicaux et les reptiles.",
      image: "/jungle.webp",
    },
    {
      title: "Désert",
      description: "Environnement aride pour certains reptiles.",
      image: "/désert.webp",
    },
    {
      title: "Forêt tropicale",
      description: "Espaces ombragés pour les oiseaux et petits mammifères.",
      image: "/foret-tropicale.webp",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  const habitats = [
    { id: 1, title: "Savanne", animals: [{ id: 1, race: "Lion", name: "Symba", image: "/lion.webp" }] },
    { id: 2, title: "Jungle", animals: [{ id: 3, race: "Tigre", name: "Tigrou", image: "/tigre.webp" }] },
    { id: 3, title: "Désert", animals: [{ id: 5, race: "Serpent", name: "Snake", image: "/serpent.webp" }] },
    { id: 4, title: "Forêt tropicale", animals: [{ id: 7, race: "Singe", name: "Jungo", image: "/singe.webp" }] },
  ];

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

      <section className="zoo-animals">
        <h2>Animaux du Zoo</h2>
        <div className="habitat-section">
          {habitats.map((habitat) => (
            <div key={habitat.id} className="habitat-card">
              <h3>{habitat.title}</h3>
              <div className="habitat-images">
                {habitat.animals.map((animal) => (
                  <img key={animal.id} src={animal.image} alt={animal.name} />
                ))}
              </div>
              <Link href={`/habitats/${habitat.id}`} className="more-info">En savoir plus</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="services">
        <h2>Services Offerts</h2>
        <p>Le Zoo Arcadia propose divers services pour enrichir l'expérience des visiteurs :</p>
        <ul>
          <li>Visites guidées</li>
          <li>Visite du Zoo en petit train</li>
          <li>Restauration sur place</li>
          <li>Magasin de souvenirs</li>
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
