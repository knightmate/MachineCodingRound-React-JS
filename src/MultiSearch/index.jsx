import React, { useEffect, useState } from 'react';
import "./index.css";

const MultiSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [seggestions,setSuggestions]=useState([]);
    
     
    console.log("seggestions",seggestions);


    useEffect(handleSearch, [searchTerm]);

    async function handleSearch(){

        setSuggestions([])
        if(searchTerm=="" || !searchTerm.length)return;

         
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
        const value=event.target.value         
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

    const onBackPress=()=>{

       const udpatedList= selectedItems.pop()
       setSelectedItems(udpatedList)

    }

    const removeSelected=(id)=>{

         
       const udpated= selectedItems.filter((item)=>item.id!=id);

       setSelectedItems(udpated);


    }

    return (
        <div className="multi-search-container">
         <div style={{margin:'30px'}}>
      <div style={{ flexWrap:'wrap',flex:1,maxWidth:'700px',display: 'flex', alignItems: 'center', 
      marginBottom: '10px' ,border:'2px solid grey',
      borderRadius:'10px'}}>
        {selectedItems.map((item) => (
          <div key={item.id} style={{color:'white',backgroundColor:'black',margin:'3px',padding:'5px',borderRadius:'5px',border:'1px solid'}} key={item.id}>
            {item.firstName}
            <span onClick={()=>{
           removeSelected(item.id)
            }} style={{padding:'5px',cursor:'pointer'}}>❌</span>
           </div>
        ))}
        <input
         
        style={{border:'none',outline:'none',margin:'10px',display:'flex',flex:1}}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
        />
       </div>
      </div>
          <div className="selected-items">
            <ul>
              {seggestions.map((item) => (
                <li style={{cursor:'pointer'}} onClick={()=>{
                 
                    setSelectedItems((preItem)=>[...preItem,item]);

                }} key={item}>
                  {item.firstName}
                 </li>
              ))}
            </ul>
          </div>
        </div>
      );
    
};


export default MultiSearch;
