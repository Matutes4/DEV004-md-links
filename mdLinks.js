import {
  existeRuta,
  esRutaAbsoluta,
  convertirRutaAbsoluta,
  esArchivoMd,
  leerArchivo,
  encontrarEnlaces,
  validate,
} from "./asistente-api.js";

// Función principal mdLinks
// Parámetro 'path': la ruta del archivo
// Parámetro 'options': opciones adicionales
export const mdLinks = (path, options) => {
  // Devolver una promesa para manejar el resultado de manera asíncrona
  return new Promise((resolve, reject) => {
    // Comprobamos si la ruta existe
    if (existeRuta(path)) {
      // Comprobamos si la ruta es absoluta y la convertimos si no lo es
      if (!esRutaAbsoluta(path)) {
        path = convertirRutaAbsoluta(path);
      }
      // Comprobamos si la ruta es un archivo Markdown
      if (esArchivoMd(path)) {
        // Llamamos a la función leerArchivo para obtener el contenido del archivo
        leerArchivo(path)
          .then((data) => {
            // Encontramos los enlaces en el contenido del archivo
            const listaEnlaces = encontrarEnlaces(data, path);
            
            // Verificamos si se deben validar los enlaces
            if (options && options.validate) {
              validate(listaEnlaces)
                .then((enlacesValidados) => {
                  // Resolvemos la promesa con los enlaces validados
                  resolve(enlacesValidados);
                })
                .catch((error) => {
                  // Rechazamos la promesa con el error de validación
                  reject(error);
                });
            } else {
              // Resolvemos la promesa con la lista de enlaces sin validar
              resolve(listaEnlaces);
            }
          })
          .catch((error) => {
            // Rechazamos la promesa si hay un error al leer el archivo
            reject(error);
          });
      } else {
        // Rechazamos la promesa si la ruta no es un archivo Markdown
        reject("La ruta no es un archivo .md");
      }
    } else {
      // Rechazamos la promesa si la ruta no existe
      reject("La ruta no existe");
    }
  });
};

// Ejemplo de uso de la función mdLinks
mdLinks("README.md", { validate: true })
  .then((result) => {
    console.log(result); // Mostramos los enlaces validados
  })
  .catch((error) => {
    console.log(error); // Mostramos el error si lo hay
  });
