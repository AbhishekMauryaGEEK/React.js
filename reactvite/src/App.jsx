import './App.css'

const movies = [
  {
    title: 'Deadpool & Wolverine',
    image: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Dune: Part Two',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Furiosa: A Mad Max Saga',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Joker: Folie a Deux',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Alien: Romulus',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'The Substance',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Civil War',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Beetlejuice Beetlejuice',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Kingdom of the Planet of the Apes',
    image: 'https://images.unsplash.com/photo-1535338454770-8be927b5a00b?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Longlegs',
    image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=900&q=85',
  },
]

function App() {
  return (
    <main className="movie-page">
      <header className="movie-header">
        <div className="imdb-badge" aria-label="IMDb Best Of 2024">
          <span>IMDb</span>
          <strong>Best Of</strong>
          <b>2024</b>
        </div>
        <div className="header-copy">
          <p>Most Popular</p>
          <h1>Movies</h1>
        </div>
      </header>

      <section className="movie-list" aria-label="Most popular movies of 2024">
        {movies.map((movie, index) => (
          <article className="movie-card" key={movie.title}>
            <span className="movie-rank">{index + 1}</span>
            <h2>{movie.title}</h2>
            <div
              className="movie-image"
              style={{ backgroundImage: `url(${movie.image})` }}
              role="img"
              aria-label={movie.title}
            />
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
