import CardBoutique from "./CardBoutique";
import CardDetail from "./CardDetails";

export default function Home() {
    return (
    <>
    <Filter />
    <div className="flex">
        <CardBoutique/>
        <CardBoutique/>
    </div>
      <CardBoutique/>
      <CardDetail/>
      
    </>
  )
}