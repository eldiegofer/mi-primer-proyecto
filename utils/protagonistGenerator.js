const protagonistTemplates = [
    {
        description: "Un científico retirado de 65 años, excéntrico y brillante, que vive aislado en su laboratorio secreto",
        edad: 65,
        ocupacion: "científico retirado",
        personalidad: "excéntrico y brillante"
    },
    {
        description: "Una joven artista callejera de 23 años, rebelde y creativa, que descubre un don sobrenatural",
        edad: 23,
        ocupacion: "artista callejera",
        personalidad: "rebelde y creativa"
    },
    {
        description: "Un veterano detective privado de 45 años, cínico pero justo, con un pasado misterioso",
        edad: 45,
        ocupacion: "detective privado",
        personalidad: "cínico pero justo"
    },
    {
        description: "Una bibliotecaria de 38 años, introvertida y perspicaz, que guarda un secreto ancestral",
        edad: 38,
        ocupacion: "bibliotecaria",
        personalidad: "introvertida y perspicaz"
    },
    {
        description: "Un chef prodigio de 28 años, perfeccionista y apasionado, en busca de una receta legendaria",
        edad: 28,
        ocupacion: "chef",
        personalidad: "perfeccionista y apasionado"
    },
    {
        description: "Una arqueóloga intrépida de 35 años, determinada y aventurera, especializada en civilizaciones perdidas",
        edad: 35,
        ocupacion: "arqueóloga",
        personalidad: "determinada y aventurera"
    },
    {
        description: "Un músico callejero de 50 años, carismático y sabio, que puede ver el futuro a través de sus melodías",
        edad: 50,
        ocupacion: "músico callejero",
        personalidad: "carismático y sabio"
    },
    {
        description: "Una programadora prodigio de 19 años, introvertida y brillante, que descubre una inteligencia artificial consciente",
        edad: 19,
        ocupacion: "programadora",
        personalidad: "introvertida y brillante"
    }
];

function getRandomProtagonist() {
    const randomIndex = Math.floor(Math.random() * protagonistTemplates.length);
    return protagonistTemplates[randomIndex].description;
}
