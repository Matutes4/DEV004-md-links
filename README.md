![markdown](imagenes/md-links.jpg)
# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Descripción](#2-Descripción)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir. 

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas. Por ejemplo en Laboratoria podrían usar esta 
herramienta para detectar los links rotos en los readmes de los proyectos
o en un área de facturación verificar los links rotos de una factura dígital.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## 2. Descripción
Md-links es una potente herramienta de línea de comandos (CLI) que analiza tus archivos Markdown en busca de enlaces. Su función principal es verificar la validez de estos enlaces, es decir, comprobar si los enlaces están activos y funcionan correctamente. De esta manera, te ayuda a identificar y corregir enlaces rotos o incorrectos en tus documentos Markdown.
 
 En resumen es una herramienta que te ayuda a mantener el control de los enlaces en tus archivos Markdown, verificando su validez y brindándote información relevante para mejorar la calidad de tus documentos y proyectos.
