   const  schema={

    name:"Machine Coding Round",
    isFolder:true,
    id:getRandomArbitrary(),
    hiddenChild:false,
    items:[{
      id:getRandomArbitrary(),
      name:"Cars24 interview",isFolder:true,
      hiddenChild:false,
    items:[
      {name:"index.html",isFolder:false},
    {name:"index.javascript",isFolder:false},
    {name:"index.css",isFolder:false}]
  },{
    id:getRandomArbitrary(),
    name:"myFile.txt",
    isFolder:false,
    hiddenChild:false
  }
]

}

function getRandomArbitrary() {
  return Math.floor(Math.random() * (100 - 0) + 0);
}
export default schema;