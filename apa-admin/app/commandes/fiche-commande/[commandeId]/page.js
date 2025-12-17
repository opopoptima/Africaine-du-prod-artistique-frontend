// app/commandes/fiche-commande/[commandeId]/page.js
import AjoutCommande from "../../components/Form";

export default async function Page({ params }) {
    const { commandeId } = await params; // "new" ou un ID réel
    return <AjoutCommande commandeId={commandeId} />;
}