import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { AppContext } from '../app/app';

function SearchForm({handleGetProducts}) {
    const [searchState, setSearchState] = useContext(AppContext);
    const[query, setQuery] = useState("");
    const handleSearch =(event)=>{
        event.preventDefault(); // eviter de rafraichir (vider) le formulaire
        handleGetProducts(query,1,searchState.pageSize);
    }
  return (
    <form onSubmit={handleSearch}>
        <div className='row g-2'>
            <div className='col-auto'>
                <input className='form-control'
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}>
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
  )
}

export default SearchForm