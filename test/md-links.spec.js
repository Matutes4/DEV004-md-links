//const mdLinks = require('../');
import { existeRuta } from "../asistente-api.js";
import { esRutaAbsoluta } from "../asistente-api.js";
import { convertirRutaAbsoluta } from "../asistente-api.js";
import { esArchivoMd } from "../asistente-api.js";
import { leerArchivo } from "../asistente-api.js";
//import { encontrarEnlaces } from "../asistente-api.js";
//import { validate } from "../asistente-api.js";
//import { mdLinks } from "../mdLinks.js";

describe("existeRuta", () => {
  const path1 = "C:/Users/glendymar";
  const path2 = "C:/Hola/Mundo";

  it("debería verificar si la ruta existe", () => {
    expect(existeRuta(path1)).toBe(true);
  });

  it("deberia verificar si no exite la ruta", () => {
    expect(existeRuta(path2)).toBe(false);
  });
});

describe("esRutaAbsoluta", () => {
  const path3 = "./ejemplo.md";
  const path4 = "C:/Users/glendymar";

  it("verifica si la ruta es absoluta o relativa", () => {
    expect(esRutaAbsoluta(path3)).toBe(false);
  });
  it("verifica si es una ruta absoluta o relativa", () => {
    expect(esRutaAbsoluta(path4)).toBe(true);
  });
});


describe("covertirRutaAbsoluta", () => {
  const path5 = "./ejemplo.md"; //ruta relativa
  const path6 = convertirRutaAbsoluta(path5);
  it("covierte a absoluta si es que es relativa", () => {
    expect(path6).toBe("C:\\Users\\glendymar\\DEV004-md-links\\ejemplo.md");
  });

 it("si ya es absoluta devuelve la misma ruta", () => {
    const path7 = "C:\\Users\\glendymar\\DEV004-md-links\\ejemplo.md";
    const convertida = convertirRutaAbsoluta(path7);
    expect(convertida).toBe(path7);
  });
  
});

describe("esArchivoMd", () => {
  const path8 = "RADME.md";
  const path9 = "mdLinks.js";
   
  it ("comprobando si es un archivo markdowm", () => {
  expect(esArchivoMd(path8)).toBe(true);
   });

   it ("comprobando si no es un archivo markdowm", () => {
    expect(esArchivoMd(path9)).toBe(false)
   })
});









/*describe("mdLinks", () => {
 /* it("deberia devolver una promesa", () => {
    expect(mdLinks()).toBe(typeof promise);
  });*/

/* it('deberia rechazar cuando el path no existe', async () => {
    try {
      return await mdLinks('/glen/cursos/noexiste.md');
    } catch (error) {
      expect(error).toBe("la ruta no existe");
    }
  });
});
*/
