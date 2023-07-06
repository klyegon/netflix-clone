import React from 'react'
import { isEmpty } from 'lodash'
import MovieCard from './MovieCard';

type Props = {
    movies: Record<string, any>[];
    title: string;
}

const MovieList: React.FC<Props> = ({ movies, title }: Props) => {
    return (
        isEmpty(movies) ? null :
            <div className='px-4 md:px-12 mt-4 space-y-8'>
                <div className=''>
                    <p className="text-white text-md md:text-x lg:text-2xl font-semibold mb-4">
                        {title}
                    </p>
                    <div className='grid grid-cols-4 gap-2'>
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default MovieList