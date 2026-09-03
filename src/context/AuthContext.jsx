/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { supabase } from "../services/supabase";

/**
 * Contexto central de autenticação.
 * Expõe o usuário logado (`user`), o estado de loading da sessão (`authLoading`)
 * e a flag de administrador (`isAdmin`), evitando que as páginas busquem dados
 * (ex.: endereços) antes de a sessão ser restaurada do storage.
 */
const AuthContext = createContext({
  user: null,
  authLoading: true,
  isAdmin: false,
  setDemoUser: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let ativo = true;

    const aplicarSessao = (session) => {
      if (session?.user) {
        setUser(session.user);
      } else if (import.meta.env.DEV) {
        // Fallback demo (DEV): sessão salva manualmente em localStorage.
        try {
          const local = localStorage.getItem("mg_mantos_user_session");
          setUser(local ? JSON.parse(local) : null);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    };

    // 1. Inicializa imediatamente com a sessão ativa (caso exista), antes mesmo
    //    de o evento INITIAL_SESSION disparar — evita estado nulo transitório.
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (ativo) aplicarSessao(session);
      })
      .catch(() => {
        if (ativo) aplicarSessao(null);
      });

    // 2. Inscreve para mudanças futuras de autenticação.
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!ativo) return;
      aplicarSessao(session);
    });

    return () => {
      ativo = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Usado pelo login em modo de demonstração (Dev/Demo).
  const setDemoUser = useCallback((demo) => {
    localStorage.setItem("mg_mantos_user_session", JSON.stringify(demo));
    setUser(demo);
    setAuthLoading(false);
  }, []);

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignora erro offline no signOut.
    }
    localStorage.removeItem("mg_mantos_user_session");
    setUser(null);
  }, []);

  const isAdmin = Boolean(
    user?.user_metadata?.is_admin === true || user?.user_metadata?.is_admin === "true",
  );

  const value = useMemo(
    () => ({ user, authLoading, isAdmin, setDemoUser, logout }),
    [user, authLoading, isAdmin, setDemoUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}