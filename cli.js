import { mdLinks } from './mdLinks.js';
import axios from 'axios';

const args = process.argv.slice(2);
//const Path = args[0];
const options = args.slice(1);

const executeMdLinks = (Path, options) => {
  const validate = options.includes('--validate'); // 1 si option incluye validate y 0 si no lo incluye
  const stats = options.includes('--stats');

  mdLinks(Path, { validate })
    .then(links => {
      if (stats && validate) {
        const totalLinks = links.length;
        const uniqueLinks = [...new Set(links.map(link => link.href))].length;
        const brokenLinks = links.filter(link => link.status >= 400).length;

        console.log(`Total: ${totalLinks}`);
        console.log(`Unique: ${uniqueLinks}`);
        console.log(`Broken: ${brokenLinks}`);
      } else if (stats) {
        const totalLinks = links.length;
        const uniqueLinks = [...new Set(links.map(link => link.href))].length;

        console.log(`Total: ${totalLinks}`);
        console.log(`Unique: ${uniqueLinks}`);
      } else if (validate) {
        let promises = links.map(link =>
          axios.head(link.href)
            .then(response => {
              link.statusText = response.status === 200 ? 'ok' : `${response.status} ${response.statusText}`;
              return link;
            })
            .catch(error => {
              link.statusText = 'fail';
              return link;
            })
        );

        Promise.all(promises)
          .then(updatedLinks => {
            for (const link of updatedLinks) {
              const { href, text, file, statusText } = link;
              const truncatedText = text.length > 50 ? text.slice(0, 50) + '...' : text;
              console.log(`${file} ${href} ${statusText || '-'} ${truncatedText}`);
            }
          });
      } else {
        for (const link of links) {
          const { href, text, file } = link;
          const truncatedText = text.length > 50 ? text.slice(0, 50) + '...' : text;
          console.log(`${file} ${href} - ${truncatedText}`);
        }
      }
    })
    .catch(error => {
      console.error(error);
    });
};

executeMdLinks('./ejemplo.md', options);



