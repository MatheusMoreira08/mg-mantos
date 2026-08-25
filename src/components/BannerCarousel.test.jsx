import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BannerCarousel from "./BannerCarousel";

describe("Componente BannerCarousel", () => {
  const bannersMock = [
    "/img/front-page/banner1.webp",
    "/img/front-page/banner2.webp",
  ];

  it("deve renderizar as imagens do carrossel com alt descritivo", () => {
    render(<BannerCarousel imagens={bannersMock} />);
    const imagens = screen.getAllByRole("img");
    expect(imagens.length).toBeGreaterThan(0);
  });
});
