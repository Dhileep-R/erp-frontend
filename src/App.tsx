import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login_temp';
import PoList from './pages/PoList';
import PoEdit from './pages/PoEdit';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {!loggedIn ? (
          <Route
            path="*"
            element={<Login onLogin={() => setLoggedIn(true)} />}
          />
        ) : (
          <>
            <Route path="/" element={<PoList />} />
            <Route path="/po" element={<PoEdit />} />
            <Route path="/po/:id" element={<PoEdit />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
