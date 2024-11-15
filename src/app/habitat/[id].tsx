import { useRouter } from "next/router";

export default function HabitatDetail() {
  const router = useRouter();
  const { id } = router.query; // Récupère l'ID depuis l'URL

  return (
    <div>
      <h1>Détails de l'Habitat</h1>
      <p>Vous visitez l'habitat avec l'ID : {id}</p>
    </div>
  );
}
