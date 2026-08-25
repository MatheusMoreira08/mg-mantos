import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ThemeProvider } from "./ThemeContext";
import { ThemeContext } from "./theme-context";
import { useContext } from "react";

describe("ThemeContext e ThemeProvider", () => {
  const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

  it("deve iniciar por padrão com o tema 'dark'", () => {
    const { result } = renderHook(() => useContext(ThemeContext), { wrapper });
    expect(result.current.theme).toBe("dark");
  });

  it("deve alternar o tema entre 'dark' e 'light' ao chamar toggleTheme", () => {
    const { result } = renderHook(() => useContext(ThemeContext), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("light");

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");
  });
});
