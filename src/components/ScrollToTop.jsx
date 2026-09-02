import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Rola a página automaticamente para o topo (0, 0) sempre que a rota mudar
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
