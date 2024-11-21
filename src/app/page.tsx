"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Habitat = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type Animal = {
  id: number;
  name: string;
  image: string;
};

type Service = {
  id: number;
  title: string;
};

export default function Home() {
  const [carouselItems, setCarouselItems] = useState<Habitat[]>([]);
  const [animaux, setAnimaux] = useState<Animal[]>([]);
  const [service, setService] = useState<Service[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        // Charger les habitats pour le carrousel
        const habitatsResponse = await fetch("/api/habitats");
        const habitatsData: Habitat[] = await habitatsResponse.json();
        setCarouselItems(habitatsData);

        // Charger les animaux
        const animauxResponse = await fetch("/api/animals");
        const animauxData: Animal[] = await animauxResponse.json();
        setAnimaux(animauxData);

        // Charger les services
        const servicesResponse = await fetch("/api/services");
        const servicesData: Service[] = await servicesResponse.json();
        setService(servicesData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    }

    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  return (
    <div className="container">
      <div className="container-image">
        <Image
          src="/vue-zoo.webp"
          alt="Vue du Zoo"
          className="image-style"
          width={1200}
          height={800}
        />
        <div className="texte-overlay">
          <h1>Bienvenue au Zoo Arcadia</h1>
          <p>
            Le Zoo Arcadia est un sanctuaire de la biodiversité, dédié à la
            conservation des espèces animales et à l&apos;éducation du public.
          </p>
        </div>
      </div>

      {carouselItems.length > 0 && (
        <div className="carousel">
          <h2>Différents Habitats</h2>
          <div className="carousel-slide carousel-full-width">
            <button className="carousel-arrow left" onClick={prevSlide}>
              &lt;
            </button>
            <Image
              src={carouselItems[currentIndex]?.image}
              alt={carouselItems[currentIndex]?.title}
              className="carousel-image"
              width={800}
              height={400}
            />
            <button className="carousel-arrow right" onClick={nextSlide}>
              &gt;
            </button>
          </div>
          <h3>{carouselItems[currentIndex]?.title}</h3>
          <p>{carouselItems[currentIndex]?.description}</p>
        </div>
      )}

      <section className="zoo-animals">
        <h2>Animaux du Zoo</h2>
        <div className="animal-section">
          {animaux.slice(0, 3).map((animal) => (
            <div key={animal.id} className="animal-card">
              <h3>{animal.name}</h3>
              <div className="animal-images">
                <Image
                  src={animal.image}
                  alt={animal.name}
                  width={400}
                  height={300}
                />
              </div>
              <Link href={`/animal/${animal.id}`} className="more-info">
                En savoir plus
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="services">
        <h2>Services Offerts</h2>
        <p>
          Le Zoo Arcadia propose divers services pour enrichir l&apos;expérience des
          visiteurs :
        </p>
        <ul>
          {service.map((service) => (
            <li key={service.id}>{service.title}</li>
          ))}
        </ul>
      </section>

      <section className="visitor-reviews">
        <h2>Avis des Visiteurs</h2>
        <blockquote>
          &quot;Un lieu incroyable pour découvrir des animaux et en apprendre
          davantage sur la conservation !&quot; — <strong>Marie D.</strong>
        </blockquote>
        <blockquote>
          &quot;L&apos;habitat des animaux est magnifique. Mes enfants ont adoré !&quot; —{" "}
          <strong>Jean R.</strong>
        </blockquote>
        <blockquote>
          &quot;Une expérience éducative et amusante, je recommande vivement !&quot; —{" "}
          <strong>Sophie T.</strong>
        </blockquote>
      </section>
    </div>
  );
}
