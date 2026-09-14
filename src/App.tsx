import Button from './components/Button.tsx'
import CategoryPicker from './components/CategoryPicker.tsx'
import EmptyState from './components/EmptyState.tsx'
import Header from './components/Header.tsx'
import MemeGallery from './components/MemeGallery.tsx'
import Spinner from './components/Spinner.tsx'
import { CATEGORIES } from './data/categories.ts'
import { useMemeGenerator } from './hooks/useMemeGenerator.ts'

export default function App() {
  const { memes, activeCategory, loading, error, generate } = useMemeGenerator()

  const hasMemes = memes.length > 0
  const activeLabel = CATEGORIES.find((category) => category.id === activeCategory)?.label

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <section className="pitch">
          <h2 className="pitch__title">Instant memes, zero effort</h2>
          <p className="pitch__text">Choose a vibe and get five ready-to-share memes in seconds.</p>
        </section>

        <CategoryPicker activeCategory={activeCategory} disabled={loading} onSelect={generate} />

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        {loading && <Spinner label={`Cooking up ${activeLabel ?? ''} memes…`} />}

        {!loading && hasMemes && (
          <>
            <div className="results-bar">
              <h2 className="results-bar__title">{`${activeLabel} memes`}</h2>
              <Button variant="ghost" onClick={() => activeCategory && generate(activeCategory)}>
                🔀 Shuffle again
              </Button>
            </div>
            <MemeGallery memes={memes} />
          </>
        )}

        {!loading && !hasMemes && !error && <EmptyState />}
      </main>

      <footer className="app-footer">
        Built for the Naukri AI Bootcamp · Captions by AI via OpenRouter · Images by memegen.link
      </footer>
    </div>
  )
}
