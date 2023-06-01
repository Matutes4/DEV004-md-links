import fs from "fs";

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // identifica si la ruta existe
    if (fs.existsSync(path)) {
    
    } else {
      //si no existe la ruta rechaza la promesa
      reject("la ruta no existe");
    }
  });
};
