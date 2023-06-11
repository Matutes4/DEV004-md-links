//file system o sistema de archivo: Es un módulo de node.js incorporado que proporciona funcionalidades para
//trabajar con el sistema de archivos del sistema operativo. es el módulo de Node.js para manejar operaciones de archivo.
import fs from "fs";

//El módulo path ofrece diversas funciones y propiedades para manipular rutas de manera conveniente.
import path from "path";

//import fetch from "node-fetch";

//Axios es una biblioteca de JavaScript que se utiliza para realizar solicitudes HTTP.
import axios from "axios";

//¿existe una ruta?
const existeRuta = (ruta) => fs.existsSync(ruta); //true or false

//Comprobando si es absoluta o relativa
const esRutaAbsoluta = (ruta) => path.isAbsolute(ruta);

// convierte a ruta absoluta si es que es relativa
const convertirRutaAbsoluta = (ruta) => path.resolve(ruta);

// comprobando si es un archivo Markdown
const esArchivoMd = (ruta) => path.extname(ruta) === ".md";


// Función que lee archivo md
function leerArchivo(ruta) {
  return new Promise(function (resolve, reject) {
    // Se utiliza la función 'readFile' del módulo fs para leer el contenido del archivo.
    fs.readFile(ruta, "utf8", function (err, data) {
      if (err) {
        reject(err); 
      } else {
        resolve(data);
      }
    });
  });
}

// Función que busca y devuelve los enlaces encontrados en el contenido
// Recibe como parámetros 'contenido' (el contenido del archivo) y 'archivo' (nombre del archivo)
const encontrarEnlaces = (contenido, archivo) => {
  const expresionRegular = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
  const listaEnlaces = [];
  let match;

  while ((match = expresionRegular.exec(contenido)) !== null) {
    const texto = match[1]; // Texto del enlace
    const url = match[2]; // URL del enlace
    const objetoEnlace = {
      href: url,
      text: texto,
      file: archivo,
    };
    listaEnlaces.push(objetoEnlace); // Se agrega el objetoEnlace a la lista de enlaces
  }

  return listaEnlaces; // Se retorna la lista de enlaces encontrados
};

// Función que valida los enlaces encontrados
// Devuelve una promesa que se resolverá cuando todas las solicitudes de validación de los enlaces se completen
const validate = (listaEnlaces) => {
  // Se crea un nuevo array para almacenar las solicitudes HTTP
  const httpRequests = listaEnlaces.map((objetoEnlace) => {
    // Se hace una solicitud HEAD a la URL del enlace y devuelve una promesa
    return axios.head(objetoEnlace.href)
      .then((response) => {
        // Cuando la solicitud se resuelve con éxito, se actualizan las propiedades del objetoEnlace
        objetoEnlace.status = response.status; // Estado de la solicitud
        objetoEnlace.message = response.statusText; // Mensaje de la solicitud
        return objetoEnlace;
      })
      .catch((error) => {
        if (error.response) {
          objetoEnlace.status = error.response.status; // Estado de la solicitud en caso de error
        } else {
          objetoEnlace.status = 0; // Estado 0 en caso de error no relacionado con la solicitud
        }
        objetoEnlace.message = 'fail'; // Mensaje de error
        return objetoEnlace;
      });
  });

  // Retorna una nueva promesa que se resolverá cuando todas las solicitudes se completen
  return Promise.all(httpRequests);
};








export {
  existeRuta,
  esRutaAbsoluta,
  convertirRutaAbsoluta,
  esArchivoMd,
  leerArchivo,
  encontrarEnlaces,
  validate,
};