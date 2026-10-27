import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { if (!localStorage.getItem('forgepc_token')) { setLoading(false); return; } api('/auth/me').then(d => setUser(d.user)).catch(() => localStorage.removeItem('forgepc_token')).finally(() => setLoading(false)); }, []);
  const accept = d => { localStorage.setItem('forgepc_token', d.token); setUser(d.user); };
  const login = async (email, password) => accept(await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }));
  const register = async (name, email, password) => accept(await api('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }));
  const logout = () => { localStorage.removeItem('forgepc_token'); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
