import React, { useEffect, useState } from 'react'
import { getMovies } from '../services/fakeMovieService'
import Pagination from './Pagination'
import { pagination } from '../util/pagination'
import ListGroup from './ListGroup'
import { getGenres } from '../services/fakeGenreService'
import MoviesTable from './MoviesTable'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'

export default function Movies() {

    const [allMovies, setAllMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState('')
    const [pageSize, setPageSize] = useState(4)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })

    useEffect(() => {
        const genre = [{ name: 'All Genre', _id: '' }, ...getGenres()]
        setAllMovies(getMovies())
        setGenres(genre)
    }, [])

    // const {length : count} = allMovies

    const handleDelete = (movie) => {
        setAllMovies(allMovies.filter(m => m._id !== movie._id))
    }

    const handleLike = (movie) => {
        const movies = [...allMovies]
        const index = movies.indexOf(movie)
        movies[index] = { ...movies[index] }
        movies[index].liked = !movies[index].liked
        setAllMovies(movies)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleGenreSelect = (genre) => {
        setSelectedGenres(genre)
        setSearchQuery('')
        setCurrentPage(1)
    }

    const handleSort = (prevSortColumn) => {

        setSortColumn(prevSortColumn)
    }

    const handleSearch = (query) => {
        setSearchQuery(query)
        setSelectedGenres('')
        setCurrentPage(1)
    }

    const getMoviesData = () => {
        let filtred = allMovies
        if (searchQuery) {
            filtred = allMovies.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase()))
        } else if (selectedGenres && selectedGenres._id) {
            filtred = allMovies.filter(m => m.genre._id === selectedGenres._id)
        }
        const sorted = _.orderBy(filtred, [sortColumn.path], [sortColumn.order])

        const movies = pagination(sorted, currentPage, pageSize)

        return { totalCount: sorted.length, data: movies }
    }

    const { totalCount, data: movies } = getMoviesData()

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-3">
                    <ListGroup items={genres} onItemSelect={handleGenreSelect}
                        textProperty="name" valueProperty="_id"
                        selectedGenres={selectedGenres} />
                </div>
                <div className="col">
                    <Link to='/movies/new' className='btn btn-primary'
                        style={{ marginBottom: "20px" }}>
                        New Movie
                    </Link>
                    {totalCount === 0 &&
                        <p>There are no movies in tht database</p>
                    }
                    <SearchBox value={searchQuery} onChange={handleSearch} />
                    {totalCount > 0 &&
                        <React.Fragment>
                            <p>Showing {totalCount} movies in the database</p>
                            <MoviesTable movies={movies} handleLike={handleLike}
                                handleDelete={handleDelete} onSort={handleSort}
                                sortColumn={sortColumn} />
                        </React.Fragment>
                    }
                    <Pagination itemsCount={totalCount} pageSize={pageSize}
                        onPageChange={handlePageChange} currentPage={currentPage} />
                </div>
            </div>
        </React.Fragment>
    )
}
