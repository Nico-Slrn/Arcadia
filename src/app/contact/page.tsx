export default function Contact() {
    return  (
    <div className="contact">
      <h1>Nous Contacter</h1>
      
      <h2>Avez-vous des questions ?</h2>
      <p>N'hésitez pas à nous écrire, nous sommes là pour vous aider.</p>
      <form>
        <div>
          <label htmlFor="name">Votre Nom :</label>
          <input type="text" id="name" name="name" required placeholder="Votre nom ici" />
        </div>
        <div>
          <label htmlFor="email">Votre E-mail :</label>
          <input type="email" id="email" name="email" required placeholder="Votre e-mail ici" />
        </div>
        <div>
          <label htmlFor="message">Votre Message :</label>
          <textarea id="message" name="message" required placeholder="Votre message ici" />
        </div>
        <button type="submit">Envoyer</button>
      </form>

      <p>Une fois votre demande envoyée, elle sera traitée par notre équipe et vous recevrez une réponse par e-mail.</p>
    </div>
    )
    
}

