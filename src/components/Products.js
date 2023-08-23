import { faCheckCircle, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { checkProduct, deleteProduct, getProducts } from '../app/app';

function Products() {

    // liste vide au demarrage
    const [products,setProducts] = useState([])

    // useeffect est excecuté une fois le rendu est terminé
    useEffect(()=>{
        handleGetProducts();
    },[]);

    const handleGetProducts = ()=>{
        getProducts().then(resp=>{
            setProducts(resp.data)
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
            const newProducts = products.map(p=>{
                if(p.id === product.id){ p.checked = !p.checked}
                return p;
            })
            setProducts(newProducts);
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
           const newProducts = products.filter(p=>p.id !== product.id);
           setProducts(newProducts);
        })
        // const newProducts = products.filter(p=>p.id != product.id);
        // setProducts(newProducts);
    }

    return (
        <div className='p-1 m-1'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                           <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th> <th>Name</th> <th>Price</th> <th>Checked</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    { products.map((product) => (
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
                                            </tr>
                                        ))}
                                </tbody>
                           </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products