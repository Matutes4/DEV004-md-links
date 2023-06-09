//const mdLinks = require('../');
import { existeUnaRuta } from "../asistente-api.js";
//import { mdLinks } from "../mdLinks.js";

describe("existeUnaRuta", () => {
  const path1 = "C:/Users/glendymar";
  const path2 = "C:/Hola/Mundo";

  it('debería verificar si la ruta existe', () => {
    expect(existeUnaRuta(path1)).toBe(true);
  });

  it('deberia verificar si no exite la ruta', () => {
    expect(existeUnaRuta(path2)).toBe(false);
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
