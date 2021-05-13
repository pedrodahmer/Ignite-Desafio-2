import { useEffect, useState } from 'react';
import { MovieCard } from '../components/MovieCard'

import { api } from '../services/api'

import {MovieProps, GenreResponseProps} from '../interfaces'

interface ContentProps {
  GenreId: number;
}

export function Content({ GenreId }: ContentProps) {
  // Complete aqui
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${GenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${GenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [GenreId]);

  return(
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}