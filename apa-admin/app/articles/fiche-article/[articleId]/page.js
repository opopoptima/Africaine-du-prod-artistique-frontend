// app/articles/fiche-article/[articleId]/page.js
import AjoutArticle from "../../components/Form";

export default async function Page({ params }) {
  const { articleId } = await params; // "new" ou un ID réel
  return <AjoutArticle articleId={articleId} />;
}
