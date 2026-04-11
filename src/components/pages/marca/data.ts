export type Marca = {
  id: string;
  name: string;         // "MAC", "Willard", "Bosch"…
  slug: string;           // "mac", "willard", "bosch"… → usado en URLs /baterias?marca=mac
  descripcion: string;    // Frase corta visible en la UI
  logo: string | null;    // Ruta en /public o URL de Cloudinary. null hasta tener el archivo
  activo: boolean;        // false = no aparece en el catálogo

};

export const marcas: Marca[] = [
  {
    id: "mac",
    name: "MAC",
    slug: "mac",
    descripcion: "La batería más vendida en Colombia. Fabricación nacional con tecnología libre de mantenimiento.",
    logo: "baterias/MAC", 
    activo: true,
  },
  {
    id: "willard",
    name: "Willard",
    slug: "willard",
    descripcion: "Premium nacional con más de 70 años en el mercado. Garantía líder del sector.",
    logo: "baterias/Willard",
    activo: true,
  },
  {
    id: "duncan",
    name: "Duncan",
    slug: "duncan",
    descripcion: "Excelente relación precio-calidad. Ideal para carros de uso diario en ciudad.",
    logo: "baterias/Duncan",
    activo: true,
  },
  {
    id: "marca-bosch",
    name: "Bosch",
    slug: "bosch",
    descripcion: "Ingeniería alemana con tecnología AGM y EFB para vehículos modernos con Start-Stop.",
    logo: "baterias/Bosch",
    activo: true,
  },
  {
    id: "ACDelco",
    name: "ACDelco",
    slug: "acdelco",
    descripcion: "Diseñada para condiciones extremas de temperatura y uso intensivo.",
    logo: "baterias/ACDelco",
    activo: true,
  },
  {
    id: "Moura",
    name: "Moura",
    slug: "moura",
    descripcion: "Batería de alta calidad con tecnología avanzada para vehículos modernos.",
    logo: "baterias/Moura",
    activo: true,
  },
];