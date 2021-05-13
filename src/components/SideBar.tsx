import { useEffect, useState } from 'react';
import { Button } from '../components/Button'

import { api } from '../services/api'

import { GenreResponseProps, SideBarProps } from '../interfaces'

export function SideBar({GenreId, ClickFunction}: SideBarProps) {
  // Complete aqui
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, [])

  return(
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => ClickFunction(genre.id)}
              selected={GenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}