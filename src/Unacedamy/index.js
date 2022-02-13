import React from 'react';

//Its pure javascript
/*Implement compose function - Implement the customCompose Function
 What is compose function function
   -
*/


//call this function and pass all the methods, it will return the other which you can call and pass first fun arguemnt (from Right)
const customCompose=(...functionsArgs)=>{


    return(x)=>{
let temp;
   for(let i=functionsArgs.length-1;i>0;i--){
   
     if(i===functionsArgs.length-1){
      console.log("calling")
          temp=functionsArgs[i](x);
      
      }else{
   
        temp=functionsArgs[i](temp); 
     };
  
    
  }
    return temp;
    }
    
   
   

}


const clCustom=customCompose(minTwo,addTwo);
clCustom(2);
//out will be 2
//addTwo(n)return n+2;//which is 4 if we pass 2
//minTwp(n) return n-2;//which is 4-2;
//output is 2-if we pass 2;