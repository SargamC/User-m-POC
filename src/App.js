// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddUserForm from './components/AddUserForm';
import Login from './components/Login';
import PrivateRoute from './routes/PrivateRoute'; // Import the PrivateRoute component
import { Provider } from 'react-redux'; 
import store from './store'; 

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route path="/add-user" element={<AddUserForm />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
