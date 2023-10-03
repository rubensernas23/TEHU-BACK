
const generateRandomCode = () => {
    const min = 1000; // Valor mínimo de 4 cifras
    const max = 9999; // Valor máximo de 4 cifras
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    return code;
}

module.exports = generateRandomCode