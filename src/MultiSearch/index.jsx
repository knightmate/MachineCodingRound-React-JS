import React, { useEffect, useState } from 'react';
import "./index.css";

const MultiSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [seggestions,setSuggestions]=useState([]);
    
     
    console.log("seggestions",seggestions);


    useEffect(handleSearch, [searchTerm]);

    async function handleSearch(){

        if(searchTerm && !searchTerm.length)return;

        const users=await getSearch(searchTerm);
         
        setSuggestions(users.users);
        
        



    }

    const getSearch = (userName) => {

         
        const url=`https://dummyjson.com/users/search?q=${userName}`
         
       return fetch(url)
            .then(res => res.json())
            .then((users)=>{

                return users;

            });
    }
    const handleInputChange = (event) => {
        
         
        setSearchTerm(event.target.value);

    };

    const handleAddItem = () => {
        if (searchTerm.trim() !== '' && !selectedItems.includes(searchTerm)) {
            setSelectedItems([...selectedItems, searchTerm]);
            setSearchTerm('');
        }
    };

    const handleRemoveItem = (item) => {
        const updatedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
        setSelectedItems(updatedItems);
    };

    return (
        <div className="multi-search-container">
          <div className="search-bar">
              {seggestions.map((seggestion) => (
                 <div>{seggestion.firstName}</div>
              ))}
          
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button onClick={handleAddItem}>Add</button>
          </div>
          <div className="selected-items">
            <ul>
              {selectedItems.map((item) => (
                <li key={item}>
                  {item}
                  <button onClick={() => handleRemoveItem(item)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    
};


export default MultiSearch;
