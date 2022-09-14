import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Access from "../access/Access";
import Home from '../main/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Access />}/>
                <Route path="/home" element={<Home />}/>
            </Routes>
        </Router>
    )
}

export default App;