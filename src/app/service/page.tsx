export default function Service() {
    return (
        <div className="services-page">
            <h2>Nos Services</h2>
            <p>Découvrez tous les services que nous proposons pour rendre votre visite encore plus agréable :</p>

            <ul>
                <li>
                    <img src="/visite-guider.webp" alt="Visite guidé du zoo" />
                    <div>
                    <h3>Visite des Habitats avec un Guide </h3>
                    <p>
                        Partez à la découverte de nos différents habitats accompagnés de l'un de nos guides passionnés.
                        Ils partageront avec vous des anecdotes et des informations fascinantes sur nos animaux.
                    </p>
                    </div>
                </li>
                <li>
                        <img src="/petit-train.webp" alt="Visite du Zoo en Petit train" />
                    <div>
                    <h3>Visite du Zoo en Petit Train</h3>
                    <p>
                        Montez à bord de notre petit train pour une visite relaxante du zoo. 
                        C'est une manière amusante de découvrir les différents espaces tout en profitant des paysages.
                    </p>
                    </div>
                </li>
                <li>
                    <img src="/restaurant.webp" alt="Restaurant du Zoo" />
                    <div>
                    <h3>Restauration</h3>
                    <p>
                        Profitez de notre large choix de plats et boissons dans nos restaurants et points de restauration.
                        Que vous ayez envie d'un snack rapide ou d'un repas complet, il y en a pour tous les goûts !
                    </p>
                    </div>
                </li>
                <li>
                    <img src="/magasin-souvenir.webp" alt="Magasin de souvenir du Zoo" />
                    <div>
                    <h3>Magasin de souvenirs</h3>
                    <p>
                    Découvrez une variété unique de souvenirs dans notre boutique ! Peluches, vêtements, accessoires, et plus encore pour prolonger la magie de votre visite au Zoo Arcadia.
                    </p>
                    </div>
                </li>
            </ul>
        </div>
    )
}
