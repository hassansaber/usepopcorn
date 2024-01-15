import { useState, useEffect } from "react"

const KEY = 'a55d4b56'


export function useMovies(query) {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')






  useEffect(function () {

    // callback?.()

    const controller = new AbortController()

    async function fetchMovies() {
      try {
        // reset states
        setIsLoading(true)
        setError('')

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error("Something went wrong while fetching data");

        const data = await res.json()
        if (data.Response === 'False') throw new Error("Movie not found");

        setMovies(data.Search)
        setError("")

      } catch (err) {

        if (err.name !== "AbortError") {
          setError(err.message)
          console.log(err.message);
        }

      } finally {
        setIsLoading(false)
      }

      // reset List
      if (query.length < 3) {
        setError('')
        setMovies([])
        return
      }

    }
    // handleCloseMovie() ==> callback
    fetchMovies()

    return function () {
      controller.abort()
    }
  }, [query])

  return { movies, error, isLoading }
}