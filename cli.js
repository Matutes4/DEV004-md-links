#!/usr/bin/env node
import { mdLinks } from './mdLinks.js';
import axios from 'axios';
import chalk from 'chalk';

const args = process.argv.slice(2);
const Path = args[0];
const options = args.slice(1);

const executeMdLinks = (Path, options) => {
  const validate = options.includes('--validate');
  const stats = options.includes('--stats');

  mdLinks(Path, { validate })
    .then(links => {
      if (stats && validate) {
        const totalLinks = links.length;
        const uniqueLinks = [...new Set(links.map(link => link.href))].length; 
        const brokenLinks = links.filter(link => link.status >= 400).length;

        console.log(chalk.hex('#00FFFF').bold('Total:'), chalk.hex('#00FF00')(totalLinks));
        console.log(chalk.hex('#00FFFF').bold('Unique:'), chalk.hex('#00FF00')(uniqueLinks));
        console.log(chalk.hex('#00FFFF').bold('Broken:'), chalk.hex('#FF0000')(brokenLinks));
      } else if (stats) {
        const totalLinks = links.length;
        const uniqueLinks = [...new Set(links.map(link => link.href))].length;

        console.log(chalk.hex('#00FFFF').bold('Total:'), chalk.hex('#00FF00')(totalLinks));
        console.log(chalk.hex('#00FFFF').bold('Unique:'), chalk.hex('#00FF00')(totalLinks));
      } else if (validate) {
        let promises = links.map(link =>
          axios.head(link.href)
            .then(response => {
              link.statusText = response.status === 200 ? chalk.hex('#00FF00')('ok') : chalk.red(`${response.status} ${response.statusText}`);
              return link;
            })
            .catch(error => {
              link.statusText = chalk.hex('#FF4500')('fail');
              return link;
            })
        );

        Promise.all(promises)
          .then(updatedLinks => {
            for (const link of updatedLinks) {
              const { href, text, file, statusText } = link;
              const truncatedText = text.length > 50 ? text.slice(0, 50) + '...' : text;
              console.log(`${chalk.hex('#FF00FF')(file)} ${chalk.hex('#FFD700')(href)} ${statusText || '-'} ${truncatedText}`);
            }
          });
      } else {
        for (const link of links) {
          const { href, text, file } = link;
          const truncatedText = text.length > 50 ? text.slice(0, 50) + '...' : text;
          console.log(`${chalk.hex('#FF00FF')(file)} ${chalk.hex('#FFD700')(href)} - ${truncatedText}`);
        }
      }
    })
    .catch(error => {
      console.error(chalk.red(error));
    });
};

executeMdLinks(Path, options);






