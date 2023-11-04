import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Joi from 'joi-browser'
import { Form } from './Form'
import { getMovie, saveMovie } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'


export default function MovieForm() {

    const [accounts, setAccounts] = useState({ title: '', genreId: '', numberInStock: '', dailyRentalRate: '' })

    const [genres, setGenres] = useState([])
    const [errors, setErrors] = useState({})

    const schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
        genreId: Joi.string().required().label("Genre"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate')
    }

    const doSubmit = () => {
        saveMovie(accounts)
        navigate('/movies')
    }

    const { handleSubmit, renderButton, renderInput, renderSelect } = Form(schema, accounts, setAccounts, errors, setErrors, doSubmit)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setGenres(getGenres())

        const movieId = params.id
        if (movieId === 'new') {
            return
        }
        const movie = getMovie(movieId)
        if (!movie) {
            return navigate('./not-found')
        }
        setAccounts(mapToViewModel(movie))
    }, [])

    const mapToViewModel = (movie) => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    return (
        <div>
            {/* <h1>id : {params.id}</h1>
            <button className='btn btn-primary'
                onClick={() => navigate('/movies')}>
                Save
            </button> */}
            <h1>Movie Form</h1>
            <form onSubmit={handleSubmit}>
                {renderInput('title', 'Title', 'text', true)}
                {renderSelect('genreId', 'Genre', genres)}
                {renderInput('numberInStock', 'Number in Stock', 'number')}
                {renderInput('dailyRentalRate', 'Rate', 'number')}
                {renderButton('Save')}
            </form>
        </div>
    )
}
