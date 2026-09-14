import { useState } from 'react'
import { generateMemes } from '../api/memes.ts'
import type { CategoryId, Meme } from '../types.ts'

export function useMemeGenerator() {
  const [memes, setMemes] = useState<Meme[]>([])
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function generate(category: CategoryId) {
    setLoading(true)
    setError('')
    setActiveCategory(category)
    try {
      setMemes(await generateMemes(category))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return { memes, activeCategory, loading, error, generate }
}
