import AppRouter from './router/AppRouter';

import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
    return (
        <div>
            <AppRouter />
            <ToastContainer />
        </div>
    );
}

export default App;
