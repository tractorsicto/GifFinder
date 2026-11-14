import { useState } from 'react';

interface searchBarProps {
    type: string;
    placeholder?:string;
    onSearch: (request: string) => void;
}

interface previousSearchProps{
    terms: string[];
    onLabelClicked: (term: string) => void
}

export const SearchBar = ( {type, placeholder ="", onSearch}: searchBarProps ) => {
    const [request, setRequest] = useState ("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" ? handleInputEnd() : "";
    };

    const handleInputEnd = () => {
        onSearch(request);
        setRequest("");
    };

  return (
    <div className="search-container">
        <input type={ type } placeholder={ placeholder } value={ request }
        onChange={ (event) => setRequest(event.target.value) }
        onKeyDown={ handleKeyDown }
        />
        <button onClick={ handleInputEnd }>Buscar</button>
    </div>
  );
}

export const PreviousSearch = ( {terms, onLabelClicked}: previousSearchProps ) => {
  return (
    <div className="previous-searches">
        <h2>Busquedas previas</h2>
        <ul className="previous-searches-list">
            { terms.map( (term) => (<li key={ term } onClick={ () => onLabelClicked(term) }>{ term } </li>) ) }
        </ul>
        </div>
  );
}
