import React, { useEffect, useState } from 'react';

const MultiSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);



    useEffect(() => {



    }, searchTerm);

    const getSearch = () => {

        fetch('https://dummyjson.com/users/search?q=John')
            .then(res => res.json())
            .then(console.log);
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
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddItem}>Add</button>
            </div>
            <div>
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
