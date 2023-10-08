const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs-extra");
const path = require("path");
const { v4: uuidv4 } = require("uuid");


async function rescaleImageWithCanvas(imageUrl, width, height) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    const image = await loadImage(imageBuffer);
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);

    // Convertir el canvas a un buffer reescalado
    const resizedBuffer = canvas.toBuffer();

    // Generar un nombre único para el archivo usando uuid
    const imageName = `${uuidv4()}.jpg`;

    // Devolver tanto el buffer de la imagen reescalada como el nombre generado
    return {
      buffer: resizedBuffer,
      name: imageName,
    };
  } catch (error) {
    console.error("Error resizing image:", error.message);
    return null;
  }
}

module.exports = {
  rescaleImageWithCanvas,
};
