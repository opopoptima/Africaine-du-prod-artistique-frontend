export default function AproposActu({ news }) {
  return (
    <section className="px-4 py-8 md:px-16 max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
      
      {/* Titres */}
      <h2 className="text-2xl md:text-3xl text-primary-100 font-bold">Connaitre plus</h2>
      <h1 className="text-3xl md:text-5xl text-primary-500 font-bold">À propos de cette actualité</h1>

      {/* Ligne décorative */}
      <div className="h-1.5 w-24 md:w-32 bg-primary-100 rounded mb-4"></div>

      {/* Paragraphes */}
      <p className="text-primary-500 text-lg md:text-xl leading-relaxed max-w-3xl">
        {news.description}
      </p>
      <p className="text-gray-700 text-md md:text-lg leading-relaxed max-w-3xl">
        {news.content}
      </p>
      
    </section>
  );
}
