/**
 * Write a function that can memoize (remember) the output for any function if we pass same arguments.
 */

 
// Q1 Memoized Functions
// Write a function that can memoize   the output for any function if we pass same arguments

// calculate(a,b){
    //now if the a and b is same , why to calcualte it every time 
//     return a+b
// }

// const factorial = memoize((x) => {
//     if (x === 0) return 1
//     else return x * factorial(x-1)
// })

// console.log(factorial(5))
function memoize(fn){
    const cache={};
   return  (...args)=>{
      //Has the acess to fn because of clousre
      //const preArugment=args;//wrong approach
      const preArugment=JSON.stringify(args);
      //You can use Json.stringfy here
      //  However, if the args array contains non-primitive values such as objects or functions, using JSON.stringify(args) would ensure a unique key based on the stringified representation of the array and its contents. This can be useful when the inner function relies on the specific values of the arguments to produce the desired behavior.
       const key=preArugment;
        if( cache[key]){
         console.log("Cached result",args);
       return cache[key];
        }
       

        /* Notes
   1- By using fn.apply(this, args), you ensure that the fn function is executed within the context of the memoize function. This allows the fn function to access the surrounding scope and any variables or functions defined within the memoize function.
    2-Using apply in this way allows you to dynamically invoke the fn function with the provided arguments, regardless of how the fn function was originally defined. It ensures that the this value is correctly set to the context of the memoize function.
    */
      /// const result=fn(...args);//pre implementation ->wrong approach
      const result=fn.apply(this,args)

      //End
     

       cache[key]=result;
           console.log("Non cached result",args);

        return result;
        
   }
  
};

const add=(a,b)=>{
   return a+b;
};

const cal=memoize(add);
cal(2,2)
cal(2,2)
cal(33,2)
