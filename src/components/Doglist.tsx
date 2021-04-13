import React, { useState, useEffect } from 'react';
import Dogdetails from './Dogdetails';
import '../index.css';

const Doglist = (props: any) => {
  const {dogs} = props;
  const [dog, setDog] = useState('');
  
  const [searchResults, setSearchResults] = useState<Array<string>>([]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (searchTerm:string) => {
    setSearchTerm(searchTerm);
  };

  const onClick = (e: any) => {
    const elements = document.getElementsByClassName('active');

    Array.prototype.map.call(elements,
      element => { element.className = '' });
    e.currentTarget.className = 'active';

    setDog(e.currentTarget.innerText);
  }

  useEffect(() => {
    const results = (searchTerm === '') ? dogs :
      dogs.filter( (dog: string) => {
        return dog.toLowerCase().includes(searchTerm);
      });

    setSearchResults(results);

  }, [searchTerm, dogs]);

  return (
    <>
      <main>
        <header>
          <h1>Dogs!</h1>
          <form>
            <div className="react-search-field " >
              <input 
                className="react-search-field-input" placeholder="Search item" type="text" 
                value={searchTerm} 
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement>,
              ): void => handleChange(e.target.value)} />
            </div>
          </form>
        </header>

        <div className='wrapper'>
          {Object.values(searchResults).slice(0, 12).map((dog) => 
            <button 
              id={dog}
              key={dog} 
              onClick={onClick}>
                {dog}                  
            </button>
          )}
        </div>

        {searchResults.length === 0 && <h3>No breed matches found.</h3>}
        
        {searchResults && <Dogdetails breed={dog} />}
      </main>
    </>
  )
}

export default Doglist;
