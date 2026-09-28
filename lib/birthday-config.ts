export interface WishItem {
  id: string;
  category: "Bonheur" | "Réussite" | "Bénédiction" | "Amour" | "Inspiration";
  icon: string;
  title: string;
  text: string;
  highlighted?: boolean;
}

export const birthdayConfig = {
  name: "Believe Konde",
  age: 21,
  message:
    "Aujourd'hui est une journée spéciale, parce qu'elle célèbre une personne qui compte énormément. Je te souhaite une nouvelle année remplie de bonheur, de réussite, de santé, de beaux projets et de moments inoubliables.",
  wishes: [
    "Que cette nouvelle année t'offre des instants doux et mille raisons de sourire.",
    "Je te souhaite de belles réussites, une santé rayonnante et des jours lumineux.",
    "Que tes projets prennent leur envol et que chaque petit bonheur trouve son chemin jusqu'à toi.",
    "Une année de lumière, de paix, d'audace et de souvenirs précieux : voilà tout ce que je te souhaite.",
    "À 21 ans, le monde s'ouvre grand devant toi. Que chacun de tes rêves devienne réalité avec éclat.",
    "Que chaque lever de soleil t'apporte la sérénité et chaque coucher de soleil la gratitude d'une journée accomplie.",
    "Tu es une personne exceptionnelle, inspirante et rayonnante. Continue de briller de mille feux.",
    "Que la joie, l'amour inconditionnel et la bienveillance t'accompagnent à chaque pas de cette nouvelle année.",
  ],
  wishesDetails: [
    {
      id: "w1",
      category: "Bonheur",
      icon: "✨",
      title: "Mille raisons de sourire",
      text: "Que cette 21ème année t'offre des instants doux, des éclats de rire sincères et mille raisons d'avoir le sourire chaque jour.",
      highlighted: true,
    },
    {
      id: "w2",
      category: "Réussite",
      icon: "🎯",
      title: "Projets & Grandes Victoires",
      text: "Que tes ambitions prennent leur envol, que les portes du succès s'ouvrent devant toi et que chaque pas te rapproche de tes rêves les plus audacieux.",
    },
    {
      id: "w3",
      category: "Bénédiction",
      icon: "🌟",
      title: "Lumière & Protection",
      text: "Une année de lumière, de paix, de protection divine et de souvenirs précieux : que la grâce t'accompagne en toute circonstance.",
      highlighted: true,
    },
    {
      id: "w4",
      category: "Santé",
      icon: "🌿",
      title: "Énergie & Sérénité",
      text: "Je te souhaite une santé de fer, une paix intérieure inébranlable et une énergie rayonnante pour embrasser chaque opportunité.",
    },
    {
      id: "w5",
      category: "Amour",
      icon: "💖",
      title: "Amour & Douceur",
      text: "Que ton cœur soit comblé de tout l'amour et de l'affection que tu mérites, entourée de personnes qui chérissent ta présence.",
    },
    {
      id: "w6",
      category: "Inspiration",
      icon: "👑",
      title: "21 ans de grâce et d'élégance",
      text: "Tu incarnes la beauté, la force et la bienveillance. 21 ans, c'est l'âge où tout devient possible. Reste toujours la personne lumineuse que tu es !",
      highlighted: true,
    },
    {
      id: "w7",
      category: "Bonheur",
      icon: "🌸",
      title: "Magie au quotidien",
      text: "Que chaque petit bonheur trouve naturellement son chemin vers toi et que chaque journée soit une célébration de ta joie de vivre.",
    },
    {
      id: "w8",
      category: "Réussite",
      icon: "🚀",
      title: "Avenir Radieux",
      text: "Le meilleur est encore à venir. Fais confiance à ton chemin et avance avec la certitude que de grandes réussites t'attendent.",
    },
  ] as WishItem[],
  signature: "Avec tout mon amour ❤️",
  whatsappPhone: "243974072465",
  photo: "/images/IMG_3887.jpg",
  gallery: [
    "/images/IMG_3887.jpg",
    "/images/IMG_3882.jpg",
    "/images/IMG_3891.jpg",
  ],
  music: "",
};
