
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";

import AdminLogin from "./components/AdminLogin";
import ViewUsers from "./components/Users/ViewUsers";

import AllOrders from "./components/Orders/AllOrders";
import UpdateOrderStatus from "./components/Orders/UpdateOrderStatus";

import AllAuthors from "./components/Author/AllAuthors";
import AddAuthor from "./components/Author/AddAuthor";
import UpdateAuthor from "./components/Author/UpdateAuthor";

import AllGenres from "./components/Genres/AllGenres";
import AddGenre from "./components/Genres/AddGenre";
import UpdateGenre from "./components/Genres/UpdateGenre";

import AllBooks from "./components/Books/AllBooks";
import AddBook from "./components/Books/AddBook";
import UpdateBook from "./components/Books/UpdateBook";

import ManageStockPage from "./components/Stock/ManageStockPage";
import BooksWithStockPage from "./components/Stock/BooksWithStockPage";


const App = () => {
    return (
        <Router>
            <Routes>
 {/* Login Route */}
 <Route path="/login" element={<AdminLogin />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
                <Route path="/allOrders" element={<AllOrders />} />
                <Route path="/updateOrderStatus/:orderId" element={<UpdateOrderStatus />} />
                <Route path="/view-users" element={<ViewUsers />} />

                <Route path="/all-author" element={<AllAuthors />} />
                <Route path="/add-author" element={<AddAuthor />} />
                <Route path="/update-author/:id" element={<UpdateAuthor />} />
                
                <Route path="/all-genres" element={<AllGenres />} />
                <Route path="/add-genre" element={<AddGenre />} />
                <Route path="/update-genre/:id" element={<UpdateGenre />} />

                <Route path="/all-books" element={<AllBooks />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/update-book/:id" element={<UpdateBook />} />

                <Route path="/books-stock" element={<BooksWithStockPage />} />
                <Route path="/manage-stock/:bookId" element={<ManageStockPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;



// //import logo from './logo.svg';
// import './App.css';
// import Server from './components/Server';
// import { Route, BrowserRouter, Routes, Link } from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//          <Link to="/Server"> Server </Link>
         
//          <Routes>
//           <Route path='/Server' element={<Server/>}/>
//         </Routes>
       
//       </BrowserRouter>
      
//         <br/> Hello CRA App 
             
//     </div>
//   );
// }

// export default App;
