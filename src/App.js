import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom'

import './App.css';
import Movies from './components/Movies';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {

  return (
    <main className="container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/movies' />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movies/:id' element={<MovieForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm/>} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/rentals' element={<Rentals />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/*' element={<Navigate to='/not-found' />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
