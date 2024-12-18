import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home'
import AdminLogin from './Components/AdminLogin';
import AdminHome from './Components/AdminHome';
import AddItem from './Components/AddItem';
import StaffHome from './Components/StaffHome';
import SortingComponent from './Components/Display';
import CountItemsByCategory from './Components/GetCount'
import UpdateQuantityComponent from './Components/UpdateCount'
import DeleteCategoryComponent from './Components/DeleteItem'
import UploadAndStoreData from './Components/UploadData'
import CategoryQuantityBarChart from './Components/Barchart'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/comp/signup' element={<SignUp/>}/>
          <Route path='/comp/Admin' element={<AdminLogin/>}/>
          <Route path='/comp/Staff' element={<Login/>}/>
          <Route path='/comp/AdminHome' element={<AdminHome/>}/>
          <Route path='/comp/StaffHome' element={<StaffHome/>}/>
          <Route path='/comp/AddItem' element={<AddItem/>}/>
          <Route path='/comp/DeleteItem' element={<DeleteCategoryComponent/>}/>
          <Route path='/comp/Display' element={<SortingComponent/>}/>
          <Route path='/comp/GetCount' element={<CountItemsByCategory/>}/>
          <Route path='/comp/updateCount' element={<UpdateQuantityComponent/>}/>
          <Route path='/comp/uploadData' element={<UploadAndStoreData/>}/>
          <Route path='/comp/showChart' element={<CategoryQuantityBarChart/>}/>
          <Route path="/" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
