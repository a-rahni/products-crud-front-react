import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Products from './components/Products';
import Home from './components/Home';
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react';
import NewProduct from './components/NewProduct';
import EditProduct from './components/EditProduct';
import { AppContext, useAppState } from './app/app';
import Stats from './components/Stats';

function App() {
  // use state: pour gerer l'etat de bouton menu activé
  const [currentRoute, setCurrentRoute] = useState();

  // use event: pour gerer au demarrage l'etat de bouton menu activé
  // traitement a la fin de rendu de composant
  useEffect(()=>{
    const path = window.location.pathname.toLocaleLowerCase();
    console.log(path);
    setCurrentRoute(path.slice(1,path.length))
  }, []);

  return (  
    <AppContext.Provider value={useAppState()}>
      <BrowserRouter>
        <nav className='m-1 p-1 border border-info navbar navbar-expand-lg navbar-light bg-light'>
          <ul className='nav na-pills'>
            <li>
              <Link 
                onClick={()=>setCurrentRoute("home")}
                className={currentRoute==="home"? "btn btn-info ms-1": "btn btn-outline-info ms-1"} 
                to={"/home"}>Home
              </Link>
            </li>
            <li>
              <Link
                onClick={()=>setCurrentRoute("products")}
                className={currentRoute==="products"? "btn btn-info ms-1": "btn btn-outline-info ms-1"} 
                to={"/products"}>Products
              </Link>
            </li>
            <li>
              <Link
                onClick={()=>setCurrentRoute("newProduct")}
                className={currentRoute==="newProduct"? "btn btn-info ms-1": "btn btn-outline-info ms-1"} 
                to={"/newProduct"}>NewProduct
              </Link>
            </li>
          </ul>
          <ul className='nav navbar-nav'>
            <li>
              <Stats></Stats>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/newProduct' element={<NewProduct />}></Route>
          <Route path='/editProduct/:id' element={<EditProduct />}></Route>

        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
