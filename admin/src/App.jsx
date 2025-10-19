import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes,Route } from 'react-router-dom';
import AddFeature from './pages/AddFeature';
import ListFeature from './pages/ListFeature';
import Listhotesl from './pages/Listhotesl';
import Addhotels from './pages/Addhotels';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <div className='bg-[#f8f9fD]'>
       <ToastContainer />
       <Navbar/>
       <div className='flex items-start'>
        <Sidebar/>
        <Routes>
         <Route path="/" element={<></>}/>
         <Route path="/admin-dashboard" element={<Dashboard/>} />
         <Route path="/add-feature" element={<AddFeature />} />
         <Route path="/add-hotels" element={<Addhotels />} />
         <Route path="/list-hotels" element={<Listhotesl/>} />
        <Route path="/available-feature" element={<ListFeature />} />
        </Routes>
       </div>

    </div>
  )
}

export default App