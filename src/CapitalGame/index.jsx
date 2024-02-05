import React, { useEffect, useState } from 'react';
import './index.css';

const CountryCapitalGame = () => {
  // Array of countries and capitals (replace with your actual data)
  const countriesAndCapitals = [
    { country: 'USA', capital: 'Washington, D.C.' },
    { country: 'France', capital: 'Paris' },
    { country: 'Japan', capital: 'Tokyo' },
    { country: 'Germany', capital: 'Berlin' },
    { country: 'India', capital: 'New Delhi' },
    // { country: 'Brazil', capital: 'Brasília' },
    // { country: 'Russia', capital: 'Moscow' },
    // { country: 'Australia', capital: 'Canberra' },
    // { country: 'South Africa', capital: 'Pretoria' },
    // { country: 'Canada', capital: 'Ottawa' },
    // { country: 'Mexico', capital: 'Mexico City' },
    // { country: 'Italy', capital: 'Rome' },
    // { country: 'China', capital: 'Beijing' },
    // { country: 'Argentina', capital: 'Buenos Aires' },
    // { country: 'Egypt', capital: 'Cairo' },
    // { country: 'Turkey', capital: 'Ankara' },
    // { country: 'South Korea', capital: 'Seoul' },
    // { country: 'Nigeria', capital: 'Abuja' },
    // { country: 'United Kingdom', capital: 'London' },
    // { country: 'Spain', capital: 'Madrid' },
    // Add more countries and capitals as needed
  ];
  
   const [shuffledStrings,set]=useState(()=>{

// Extract countries and capitals as strings into a single array
const countryAndCapitalStrings = countriesAndCapitals.flatMap(({ country, capital }) => [country, capital]);
 
// Function to shuffle the array using Fisher-Yates (Knuth) Shuffle algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
// Shuffle the array of country and capital strings
 const shuffledStrings = shuffleArray(countryAndCapitalStrings).map((val,index)=>{
     return {isSelected:false,isError:false,value:val,color:'black',id:index};
   });


   return shuffledStrings;
 

   })


   //Logic Ahed...
 
  // State to track the selected country and its capital
  const [selected, setSelected] = useState([]);

  console.log("Selected",selected)

  useEffect(()=>{

  
    //We will return anything when 2 items NOT selected
      if(selected.length!=2)return;

      const isValidMatch=validateSelected();
      const [one,two]=selected;

      const color=isValidMatch?"#2BC612":'red';
      
      updateItem(one.id,color,true);
      updateItem(two.id,color,true);

      const ids=selected.map(({id})=>id)

       setTimeout(()=>{
        setSelected([])
         
        if(isValidMatch){
            removeCountries(ids);
        }else{
          reset();
        }
        },1000);
       

      console.log("isValidMatch",isValidMatch);



  },[selected]);


  const removeCountries=(ids)=>{

 
   const  updatedCountries=shuffledStrings.filter((data)=>{

        const temp= ids.find((id)=>id==data.id) 
           
          if(temp!=undefined)return false;

          return true;
         
    })
  const newData=  updatedCountries.map((pre,index)=>{
        return {...pre,id:index}
    })
    set(newData);
      
    console.log("country removed",updatedCountries);


  }

  const reset=()=>{

      
      set((pre)=>{
         
         const updated=pre.map((item,index)=>{
            return {...item,isSelected:false,color:"black",id:index}
         })

         return [...updated]
      })


  }

  const validateSelected=()=>{

     //mathcing it
    
      const [one,two]=selected;

    const selectedDataFound=countriesAndCapitals.find(({capital,country})=>{
            if(country==one.value || capital==one.value)return true;
        })
       
          
       if(selectedDataFound){
        const {capital,country}=selectedDataFound;
       
         if(capital==one.value){

            //one is capital
            return country==two.value;

         }else{ 

            //one is country
            return capital==two.value


         }


       }


  }

  // Click handler to update the selected country
  const handleCountryClick = (_index) => {
   
    if(selected.length>=2)return;

    const value=shuffledStrings[_index];
    setSelected((pre)=>[...pre,value]);

    
     updateItem(_index,"blue",true)


    
   };


   const updateItem=(updateIndex,color,isSelected)=>{
     
    const updated= shuffledStrings.map((item,index)=>{

        if(index==updateIndex){
         item.color=color;
         item.isSelected=isSelected;
        
        };

        return item;

     });

     set(updated);
   }

console.log("shuffledStrings",shuffledStrings);
  return (
    <div className='game'>
      <h1>Country Capital Game</h1>
      <ul className='game-board'>
        {shuffledStrings.length==0 && "Congratulation'S ,YOU WON!"}
        {shuffledStrings.map(({value,color}, index)=>{
      return(
        <li style={{borderColor:color,margin:'10px',borderWidth:'4px',borderRadius:'10px'}} 
        className='game-card' 
        key={index} 
        onClick={() => handleCountryClick(index)}>
        {value}
      </li>
      )
        })
      }
      </ul>
     
    
    </div>
  );
};

export default CountryCapitalGame;
