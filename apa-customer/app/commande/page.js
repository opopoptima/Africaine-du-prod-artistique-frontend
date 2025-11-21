import HeroGeneral from '../components/HeroGeneral';
import FormulaireCommande from './FormulaireCommande';

export default function Commande() {
  return (
    <div>
      <HeroGeneral title="Formulaire de commande" />
      <FormulaireCommande />
    </div>
  );
}