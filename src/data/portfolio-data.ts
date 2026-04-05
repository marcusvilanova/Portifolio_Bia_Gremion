export interface ArchiveItem {
    title: string;
    year: string;
    type: string;
}

export interface PortfolioMedia {
    id: string;
    type: 'image' | 'video';
    src: string;
    alt: string;
    category: string;
}

export interface CampaignItem {
    id: string;
    brand: string;
    title: string;
    videoSrc: string;
    link: string | null;
}

export interface PressArticle {
    id: string;
    source: string;
    title: string;
    desc: string;
    link: string | null;
}

export interface DemographicItem {
    label: string;
    value: string;
}

export interface DemographicsData {
    gender: DemographicItem[];
    age: DemographicItem[];
    brands: string[];
    reach: DemographicItem[];
}

export interface ValueItem {
    number: string;
    title: string;
    text: string;
    videoSrc?: string;
    imageSrc?: string;
    isDemographics?: boolean;
    demographics?: DemographicsData;
}

export const ARCHIVE_ITEMS: ArchiveItem[] = [
    { title: "SPOTIFY", year: "2024", type: "Campanha Digital" },
    { title: "DOVE", year: "2024", type: "Campanha Nacional" },
    { title: "LA ROCHE-POSAY", year: "2024", type: "Campanha de Beleza" },
    { title: "NÍVEA", year: "2023", type: "Campanha Comercial" },
    { title: "CONVERSE", year: "2023", type: "Campanha de Moda" },
    { title: "AMAZON PRIME VÍDEO", year: "2023", type: "Campanha de Lançamento" },
    { title: "UBER", year: "2023", type: "Campanha Digital" },
    { title: "INTIMUS", year: "2022", type: "Campanha Nacional" },
    { title: "ACNASE", year: "2022", type: "Campanha de Beleza" },
    { title: "BANCO BMG", year: "2022", type: "Campanha Institucional" },
    { title: "VULT", year: "2022", type: "Campanha de Beleza" },
    { title: "ITI ITAÚ", year: "2022", type: "Campanha Fintech" },
    { title: "BIC SOLEIL", year: "2021", type: "Campanha Comercial" },
    { title: "SKALA", year: "2021", type: "Campanha de Beleza" },
    { title: "MULTILASER", year: "2021", type: "Campanha Digital" },
];

export const CAMPAIGNS: CampaignItem[] = [
    {
        id: "pantene",
        brand: "PANTENE",
        title: "Campanha Nacional",
        videoSrc: "/vídeo - campanha pantene.mp4",
        link: null
    },
    {
        id: "mac",
        brand: "MAC COSMETICS",
        title: "Lançamento & Beauty",
        videoSrc: "/Video campanha MAC.mp4",
        link: null
    },
    {
        id: "dove",
        brand: "DOVE",
        title: "Real Beauty Campaign",
        videoSrc: "/Bia - Campanha DOVE.mp4",
        link: null
    },
    {
        id: "varejo",
        brand: "MODA VAREJO",
        title: "Divulgação Editorial Plus Size",
        videoSrc: "/Video  - Divulgação de lojas plus size.mp4",
        link: null
    }
];

export const PRESS_ARTICLES: PressArticle[] = [
    {
        id: "capricho",
        source: "CAPRICHO",
        title: "“A moda diz não e eu provo que sim”",
        desc: "Sobre ser modelo, Pioneirismo Plus Size e usar a moda como ferramenta política para o corpo gordo.",
        link: "https://capricho.abril.com.br/beleza/bia-gremion-sobre-ser-modelo-e-gorda-a-moda-diz-nao-e-eu-provo-que-sim/"
    },
    {
        id: "elle",
        source: "ELLE BRASIL",
        title: "Editorial & Moda Real",
        desc: "Destaque nas páginas da revista comprovando que a beleza não tem um único formato padrão.",
        link: null
    }
];

export const VALUES: ValueItem[] = [
    {
      number: "01",
      title: "Identificação que gera conversão.",
      text: "Com mais de 80 mil vozes orgânicas, minha relação com o público é baseada em espelhamento. As mulheres não apenas assistem; elas compram o que eu indico porque se identificam com a minha jornada e confiam na minha curadoria.",
      videoSrc: "/Vídeo sobre os comentarios e engajamento nas redes sociais.mp4"
    },
    {
      number: "02",
      title: "DOMÍNIO TÉCNICO & CURADORIA",
      text: "Formada pela Escola Madre, trago o olhar técnico da maquiagem para cada publis de skincare, beleza e acessórios. Entendo o produto, a aplicação e o resultado visual exigido pelo mercado premium.",
      imageSrc: "/images/portfolio/44.webp"
    },
    {
      number: "03",
      title: "Comunicação e Estratégia de Marketing.",
      text: "Como graduanda em Marketing, entendo os bastidores da influência. Minha entrega une a criatividade da criadora com o embasamento técnico de quem sabe ler briefings e transformar tendências em resultados.",
      imageSrc: "/Bia - maquiagem (2).png"
    },
    {
      number: "04",
      title: "ESTRATÉGIA E MERCADO PLUS SIZE",
      text: "Mais de 60% da população adulta brasileira veste tamanhos acima do padrão convencional. O mercado plus size no Brasil movimenta quase R$ 10 bilhões por ano. Existe uma demanda gigantesca e reprimida por numerações que vão além do 46, chegando ao 60+. Ignorar esse número é ignorar a maior fatia do país. Para a consumidora plus size, a identificação é o gatilho da compra. Quando uma mulher vê um corpo como o dela sendo tratado com excelência em uma campanha, ela não compra apenas o produto: ela consome a sensação de pertencimento e dignidade. É por isso que a representatividade deixou de ser apenas uma pauta; hoje, é a estratégia de conexão e conversão mais inteligente que uma marca pode adotar.",
      videoSrc: "/Vídeo - auto aceitação corpo inteiro.mp4"
    }
];

export const PORTFOLIO_IMAGES: PortfolioMedia[] = Array.from({ length: 82 }, (_, i) => {
    const idNum = i + 1;
    const skipIndices = [17, 18, 19, 30, 34, 37, 38, 40, 41, 47, 48, 58, 59, 60, 61, 63, 65];
    
    if (skipIndices.includes(idNum)) return null;

    let category = "Campanhas";
    if (idNum > 18 && idNum <= 36) category = "Editorial";
    else if (idNum > 36 && idNum <= 54) category = "Beleza";
    else if (idNum > 54) category = "Campanhas";

    return {
        id: `photo-${idNum}`,
        type: 'image',
        src: `/images/portfolio/${idNum}.webp`,
        alt: `Bia Gremion Portfolio Photo ${idNum}`,
        category
    };
}).filter((img): img is PortfolioMedia => img !== null);

