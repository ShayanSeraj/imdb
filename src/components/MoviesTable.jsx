import { Link } from "react-router-dom"
import Like from "./Like"
import Table from "./Table"


export default function MoviesTable({ movies, handleLike, handleDelete, onSort, sortColumn }) {

    const columns = [
        { path: 'title', lable: 'Title' , content : movie =><Link style={{textDecoration : 'none' , color : 'black'}} to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: 'genre.name', lable: 'Genre' },
        { path: 'numberInStock', lable: 'Stock' },
        { path: 'dailyRentalRate', lable: 'Rate' },
        { key: 'like', content:movie=>(<Like liked={movie.liked} onLike={() => handleLike(movie)} />)},
        { key: 'delete', content:movie=>(<button onClick={() => handleDelete(movie)} className='btn btn-danger btn-sm'>Delete</button>)}
    ]

    return (
        <Table data={movies} onSort={onSort} sortColumn={sortColumn} columns={columns} />
    )
}
