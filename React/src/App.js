import logo from './logo.svg';
import './App.css';
import Folder from './Cars24_folderStructure/index.jsx';
import folderSchema from './folderSchema';
function App() {
  return (
    <div className="App">
       <Folder item={folderSchema}></Folder>
    </div>
  );
}

export default App;
