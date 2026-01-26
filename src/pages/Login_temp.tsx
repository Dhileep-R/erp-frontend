import { useState } from 'react';
import { api, setToken } from '../api';
import { useNavigate } from 'react-router-dom';

interface Props {
  onLogin: () => void;
}

export default function Login({ onLogin }: Props){
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();

  const login = async (): Promise<void> => {
    const res = await api.post('http://localhost:3001/auth/login', { username });
    setToken(res?.data?.access_token);
    onLogin();
    navigate("/");
  };

  return (
    <>
      <h2>Login</h2>
      <input value={username} onChange={e => setUsername(e?.target?.value?.trim())} />
      <button onClick={login}>Login</button>
    </>
  );
}
