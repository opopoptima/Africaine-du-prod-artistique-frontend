export default function VideoSection({ videoUrl }) {
    if (!videoUrl) return null;

    // Function to extract video ID from YouTube URL
    const getYoutubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYoutubeId(videoUrl);

    if (!videoId) return null;

    return (
        <section className="px-4 py-12 md:px-16 max-w-5xl mx-auto">
            <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-100">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    );
}
