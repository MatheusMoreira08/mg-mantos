/**
 * Mapeamento central dos escudos (badges) dos times exibidos na Home.
 *
 * A coluna `local` aponta para o ARQUIVO REAL já baixado em
 * `public/img/times/` (nome e extensão exatos: .webp, .png ou .svg.webp).
 * O componente usa `local` como `src` do <img>.
 *
 * Para trocar o escudo de um time:
 * 1. Abra a URL da coluna `source` (artigo oficial na Wikipédia).
 * 2. Baixe o escudo oficial e salve em `public/img/times/`.
 * 3. Atualize apenas o valor de `local` com o nome/extensão exatos do arquivo.
 *
 * Nota de licença: escudos de clubes de futebol costumam ser marcas
 * registradas. Na Wikipédia lusófona alguns são hospedados como conteúdo
 * "não livre" (fair use) e NÃO estão no Wikimedia Commons. Use a fonte da
 * coluna `source` para baixar a imagem correta para uso no seu site.
 */

export const TEAM_BADGES = {
  // --------------------- Brasileirão ---------------------
  flamengo: {
    nome: "Flamengo",
    local: "/img/times/flamengo.webp",
    source: "https://pt.wikipedia.org/wiki/Clube_de_Regatas_do_Flamengo",
  },
  "sao-paulo": {
    nome: "São Paulo",
    local: "/img/times/sao-paulo.webp",
    source: "https://pt.wikipedia.org/wiki/S%C3%A3o_Paulo_Futebol_Clube",
  },
  corinthians: {
    nome: "Corinthians",
    local: "/img/times/corinthians.png",
    source: "https://pt.wikipedia.org/wiki/Sport_Club_Corinthians_Paulista",
  },
  palmeiras: {
    nome: "Palmeiras",
    local: "/img/times/palmeiras.png",
    source: "https://pt.wikipedia.org/wiki/Sociedade_Esportiva_Palmeiras",
  },
  vasco: {
    nome: "Vasco",
    local: "/img/times/vasco.webp",
    source: "https://pt.wikipedia.org/wiki/Club_de_Regatas_Vasco_da_Gama",
  },
  cruzeiro: {
    nome: "Cruzeiro",
    local: "/img/times/cruzeiro.webp",
    source: "https://pt.wikipedia.org/wiki/Cruzeiro_Esporte_Clube",
  },
  "atletico-mg": {
    nome: "Atlético MG",
    local: "/img/times/atletico-mg.webp",
    source: "https://pt.wikipedia.org/wiki/Clube_Atl%C3%A9tico_Mineiro",
  },
  gremio: {
    nome: "Grêmio",
    local: "/img/times/gremio.webp",
    source: "https://pt.wikipedia.org/wiki/Gr%C3%AAmio_Foot-Ball_Porto_Alegrense",
  },

  // --------------------- La Liga ---------------------
  "real-madrid": {
    nome: "Real Madrid",
    local: "/img/times/Real_Madrid.png",
    source: "https://pt.wikipedia.org/wiki/Real_Madrid_Club_de_F%C3%BAtbol",
  },
  barcelona: {
    nome: "Barcelona",
    local: "/img/times/FCBarcelona.svg.webp",
    source: "https://pt.wikipedia.org/wiki/Futbol_Club_Barcelona",
  },
  "atletico-madrid": {
    nome: "Atlético de Madrid",
    local: "/img/times/Atletico_Madrid_logo.svg.webp",
    source: "https://pt.wikipedia.org/wiki/Club_Atl%C3%A9tico_de_Madrid",
  },

  // --------------------- Premier League ---------------------
  "manchester-city": {
    nome: "Manchester City",
    local: "/img/times/manchester-city.png",
    source: "https://pt.wikipedia.org/wiki/Manchester_City_Football_Club",
  },
  arsenal: {
    nome: "Arsenal",
    local: "/img/times/arsenal.webp",
    source: "https://pt.wikipedia.org/wiki/Arsenal_Football_Club",
  },
  liverpool: {
    nome: "Liverpool",
    local: "/img/times/liverpool.webp",
    source: "https://pt.wikipedia.org/wiki/Liverpool_Football_Club",
  },
  chelsea: {
    nome: "Chelsea",
    local: "/img/times/chelsea.webp",
    source: "https://pt.wikipedia.org/wiki/Chelsea_Football_Club",
  },
  "manchester-united": {
    nome: "Manchester United",
    local: "/img/times/manchester-united.png",
    source: "https://pt.wikipedia.org/wiki/Manchester_United_Football_Club",
  },

  // --------------------- Serie A ---------------------
  juventus: {
    nome: "Juventus",
    local: "/img/times/juventus.webp",
    source: "https://pt.wikipedia.org/wiki/Juventus_Football_Club",
  },
  milan: {
    nome: "Milan",
    local: "/img/times/milan.webp",
    source: "https://pt.wikipedia.org/wiki/Associazione_Calcio_Milan",
  },
  "inter-de-milao": {
    nome: "Inter de Milão",
    local: "/img/times/inter-de-milao.webp",
    source: "https://pt.wikipedia.org/wiki/Football_Club_Internazionale_Milano",
  },

  // --------------------- Bundesliga ---------------------
  "bayern-munique": {
    nome: "Bayern Munique",
    local: "/img/times/bayern-munique.webp",
    source: "https://pt.wikipedia.org/wiki/FC_Bayern_M%C3%BCnchen",
  },
  "borussia-dortmund": {
    nome: "Borussia Dortmund",
    local: "/img/times/borussia-dortmund.webp",
    source: "https://pt.wikipedia.org/wiki/Borussia_Dortmund",
  },
  "bayer-leverkusen": {
    nome: "Bayer Leverkusen",
    local: "/img/times/bayer-leverkusen.png",
    source: "https://pt.wikipedia.org/wiki/Bayer_04_Leverkusen",
  },

  // --------------------- Ligue 1 ---------------------
  psg: {
    nome: "PSG",
    local: "/img/times/psg.webp",
    source: "https://pt.wikipedia.org/wiki/Paris_Saint-Germain_Football_Club",
  },
  olympique: {
    nome: "Olympique Marseille",
    local: "/img/times/olympique.webp",
    source: "https://pt.wikipedia.org/wiki/Olympique_de_Marseille",
  },
};

/** Constrói o objeto completo de um time a partir do slug (id). */
function montarTime(slug) {
  const badge = TEAM_BADGES[slug];
  if (!badge) return null;
  return {
    slug,
    nome: badge.nome,
    imagem: badge.local,
    source: badge.source,
    link: `/categoria/${slug}`,
  };
}

/** Times do Brasileirão (ordem de exibição). */
export const escudosTimesBR = [
  "flamengo",
  "sao-paulo",
  "corinthians",
  "palmeiras",
  "vasco",
  "cruzeiro",
  "atletico-mg",
  "gremio",
].map(montarTime);

/** Times por liga internacional (ordem de exibição). */
export const timesPorLiga = {
  "La Liga": ["real-madrid", "barcelona", "atletico-madrid"].map(montarTime),
  "Premier League": [
    "manchester-city",
    "arsenal",
    "liverpool",
    "chelsea",
    "manchester-united",
  ].map(montarTime),
  "Serie A": ["juventus", "milan", "inter-de-milao"].map(montarTime),
  Bundesliga: ["bayern-munique", "borussia-dortmund", "bayer-leverkusen"].map(
    montarTime,
  ),
  "Ligue 1": ["psg", "olympique"].map(montarTime),
};