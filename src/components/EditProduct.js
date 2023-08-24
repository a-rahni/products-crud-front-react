import React, { useEffect, useState } from 'react'
import { getProductById, saveProduct, updateProduct } from '../app/app'
import { useParams } from 'react-router-dom'

function EditProduct() {
  const {id} = useParams();  // destruction de param et reciperer l'id passer en url
  // id utiliser pour recuperer le product a editer
  const [name,setName]=useState("")
  const [price,setPrice]=useState(0)
  const [checked,setChecked]=useState(false)

// hook executé au demarrage en absence de paramètres a surveiller
useEffect(()=>{
  handleGetProductById(id);
},[]);

const handleGetProductById = (id)=>{
  getProductById(id).then(resp=>{
    let product = resp.data;
    setName(product.name);
    setPrice(product.price);
    setChecked(product.checked);
  });
}
const handleUpdateProduct = (event)=>{
  // intercepter l'event pour eviter de rafraichir le formulaire apres le save (ne pas reprendre val par defaut)
  event.preventDefault();
  //let product = {name:name, price:price, checked:checked}
  let product = {id, name, price, checked}; // en update on doit envoyer le id
  updateProduct(product).then(resp=>{
    alert(JSON.stringify(resp.data));
  });
}

  return (
    <div className='row p-1'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            {/* {name}  // pour tester le binding entre champ et state*/}
            <form onSubmit={handleUpdateProduct}>
              <div className='mb-3'>
                <label className='form-label'>Name :</label>
                <input className='form-control'
                  onChange={(e)=>setName(e.target.value)}
                  value={name} ></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Price :</label>
                <input className='form-control'
                  onChange={(e)=>setPrice(e.target.value)}
                  value={price}></input>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='checkbox' 
                  onChange={(e)=>setChecked(e.target.value)}
                  checked={checked}/>
                <label className='form-check-label' for='flexCheckChecled'>
                  Checked
                </label>
              </div>
              <button className='btn btn-success'>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct