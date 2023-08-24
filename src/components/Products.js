import { faCheckCircle, faCircle, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { checkProduct, deleteProduct, getProducts } from '../app/app';
import { useNavigate } from 'react-router-dom';

function Products() {
    const[query, setQuey] = useState(""); // quand on navigue entre les page, le keyword est perdu
    // ==> faut utiliser un state globale: de contexte
    const navigate = useNavigate(); // hook pour utiliser le system de route

    // liste vide au demarrage
    //const [products,setProducts] = useState([])

    // state recherche produit
    const [searchState,setSearchState] = useState({
        products:[],
        currentPage: 1,
        pageSize: 4,
        keyword: "",
        totalPages: 0, // a calculer
    });

    // useeffect est excecuté une fois le rendu del page est terminé (demarrage)
    useEffect(()=>{
        //handleGetProducts();
        // recherche avec valeur par defaut de demarrage
        handleGetProducts(searchState.keyword,searchState.currentPage,searchState.pageSize);
    },[]);

    const handleGetProducts = (keyword,page,size)=>{
        getProducts(keyword,page,size).then(resp=>{
            // recuperer les données de searchState et changer seulement products list
           // setSearchState({...searchState, products:resp.data})
           // changer toutes les données de state
           let totalElements = resp.headers['x-total-count']; // dans les api rest, nombre d'element envoyé dans body
           let totalPages = Math.floor(totalElements/size);
           if(totalElements%size !==0) ++totalPages;

           setSearchState({
            ...searchState,
            products:resp.data, keyword:keyword, currentPage:page, pageSize:size, totalPages:totalPages
        })
        })
        .catch((err)=>{
            console.error();
        })

        // axios.get("http://localhost:9000/products")
        // .then(resp=>{
        //     const products = resp.data;
        //     setProducts(products);

        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    }

    const handleCheckProduct = (product)=>{
        checkProduct(product).then(resp=>{
            // au lieu de recharger la liste de produit, changer seulement de l'etat (single page)
            const newProducts = searchState.products.map(p=>{
                if(p.id === product.id){ p.checked = !p.checked}
                return p;
            })
           // setProducts(newProducts);           
           setSearchState({...searchState, products:newProducts})
        })
        // const newProducts = products.map(p=>{
        //     if(p.id === product.id){ p.checked = !p.checked}
        //     return p;
        // })
        // setProducts(newProducts);
    }

    const handleDeleteProduct=(product)=>{
        deleteProduct(product).then(resp=>{
           // handleGetProducts();
           // au lieu de recharger la liste de produit, supprimer seulement de l'etat de l'affichage (single page)
           //const newProducts = products.filter(p=>p.id !== product.id);
           //setProducts(newProducts);
           const newProducts = searchState.products.filter(p=>p.id !== product.id);           
           setSearchState({...searchState, products:newProducts})
        })
        // const newProducts = products.filter(p=>p.id != product.id);
        // setProducts(newProducts);
    }

    const handleGoToPage =(page)=>{
        handleGetProducts(searchState.keyword, page, searchState.pageSize);
    }
    
    const handleSearch =(event)=>{
        event.preventDefault(); // eviter de rafraichir (vider) le formulaire
        handleGetProducts(query,1,searchState.pageSize);
    }

    return (
        <div className='p-1 m-1'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card m-1'>
                        <div className='card-body'>
                                <form onSubmit={handleSearch}>
                                    <div className='row g-2'>
                                        <div className='col-auto'>
                                            <input className='form-control'
                                                value={query}
                                                onChange={(e)=>setQuey(e.target.value)}>
                                            </input>
                                        </div>
                                        <div className='col-auto'>
                                            <button className='btn btn-success'>
                                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                                Search
                                            </button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    <div className='card m-1'>
                        <div className='card-body'>
                           <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th> <th>Name</th> <th>Price</th> <th>Checked</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    { searchState.products.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    <button onClick={()=>handleCheckProduct(product)} className='btn btn-outline-success'>
                                                        <FontAwesomeIcon
                                                            icon={product.checked? faCheckCircle : faCircle}>
                                                        </FontAwesomeIcon>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={()=>handleDeleteProduct(product)} className='btn btn-outline-danger'>
                                                        <FontAwesomeIcon
                                                            icon={faTrash}>
                                                        </FontAwesomeIcon>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className='btn btn-outline-success'
                                                    onClick={()=>navigate(`/editProduct/${product.id}`)}>
                                                        <FontAwesomeIcon
                                                            icon={faEdit}>
                                                        </FontAwesomeIcon>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                           </table>

                           <ul className='nav nav-pills'>
                            {
                                (new Array(searchState.totalPages).fill(0)).map((v,index)=>(
                                    <li>
                                        <button 
                                        onClick={()=>handleGoToPage(index+1)}
                                        className={
                                            index+1==searchState.currentPage?'btn btn-info ms-1':'btn btn-outline-info ms-1'}>
                                            {index+1}

                                        </button>
                                    </li>
                                ))
                            }
                            </ul>
                           



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products