// sistema de archivos o file system.  módulo de node.js incorporado que proporciona funcionalidades para
//trabajar con el sistema de archivos del sistema operativo. es el módulo de Node.js para manejar operaciones de archivo.
import fs from "node:fs";

//El módulo path ofrece diversas funciones y propiedades para manipular rutas de manera conveniente.
import path from "path";

import fetch from "node-fetch";


//¿existe una ruta?
const existeUnaRuta = (ruta) => fs.existsSync(ruta); //true or folse

/*ps://es.wikipedia.org/wiki/Markdown";
let existeRuta = existeUnaRuta(ruta1);
console.log(`La ruta "${ruta1}" ${existeRuta ? "existe" : "no existe"}.`);

const ruta2 = "C:/Users/glendymar";
existeRuta = existeUnaRuta(ruta2);
console.log(`La ruta "${ruta2}" ${existeRuta ? "existe" : "no existe"}.`);

const ruta3 = "../OneDrive";
existeRuta = existeUnaRuta(ruta3);
console.log(`La ruta "${ruta3}" ${existeRuta ? "existe" : "no existe"}.`);
*/

//comprobando si es absoluta o relativa
const esUnaRutaAbsoluta = (ruta) => path.isAbsolute(ruta); //¿?

/*const queRutaEs1 = "C:/Users/glendymar";
let esAbsoluta = esUnaRutaAbsoluta(queRutaEs1);
console.log(
  `La ruta "${queRutaEs1}" es ${esAbsoluta ? "absoluta" : "relativa"}.`
);

const queRutaEs2 = "./ejemplo.md";
let esAbsoluta2 = esUnaRutaAbsoluta(queRutaEs2);
console.log(
  `La ruta "${queRutaEs2}" es ${esAbsoluta2 ? "absoluta" : "relativa"}.`
);
*/
// convierte a ruta absoluta si es que es ruta relativa.
const convertirAbsoluta = (ruta) => path.resolve(ruta);

/*const rutaRelativa = "./ejemplo.md";
let rutaAbsoluta = convertirAbsoluta(rutaRelativa);
console.log("Ruta absoluta:", rutaAbsoluta);
console.log("La ruta ahora es absoluta.");

// comprobando si es un archivo markdow
const esArchivoMd = (ruta) => path.extname(ruta) === ".md";

const comprobando1 = "C:/Users/glendymar/DEV004-md-links/README.md";
let comprobado1 = esArchivoMd(comprobando1);
console.log("la ruta:", comprobado1);
console.log("la ruta es un archivo md");


const comprobando2 = "C:/Users/glendymar/DEV004-md-links/asistente.Api.js";
let comprobado2 = esArchivoMd(comprobando2);
console.log("la ruta:", comprobado2);
console.log("no es un archivo md");
*/

// funcion que lee  archivos md

// Use fs.readFile() method to read the file
function leerArchivo(doc) {
  return new Promise((resolve, reject) => {
    fs.readFile(doc, "utf8", function (err, data) { //utf8 nuestra codificación
      // Display the file content
      //console.log(data);
      resolve(data);
    });
  });

  //console.log('readFile called');
}

// extraer los links de md
/* se llama a la función leerArchivo pasando la ruta de un archivo como argumento 
Se encadena el método .then() para manejar el resultado exitoso de la promesa.
*/
leerArchivo("C:/Users/glendymar/DEV004-md-links/ejemplo.md")
  .then((perrito) => {
    console.log(perrito, "**************");
    let re = /http([^"'\s]+)/g; // expresión regular que me permite extraer todas las urls(http) de una cadena
    perrito.match(re) //El método match() devuelve todas las ocurrencias de una expresión regular dentro de una cadena.
    console.log(perrito.match(re));
  })
  .catch((error) => {
    console.log(error);
  });
  

  //funcion que valida los enlaces encontrados
  



//OH para entender callback y promesas. :(
export { 
    existeUnaRuta, 
    esUnaRutaAbsoluta, 
    convertirAbsoluta, 
    leerArchivo,
    };
