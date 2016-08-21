#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: $0 -i <input> -o <output>')
  .example('$0 -i pico8.txt -o pico8.html')
  .alias('i', 'input')
  .alias('o', 'output')
  .nargs('i', 1)
  .nargs('o', 1)
  .describe('i', 'The input file to parse')
  .describe('o', 'The output html file')
  .demand(['i', 'o'])
  .argv;

const fs = require('fs');
const rl = require('readline');
const tp = require('./template')

// helper functions

function exit(msg) {
  console.log(msg);
  process.exit(1);
}

// check input is readable

let stats = {};
try {
  stats = fs.statSync(argv.input)
} catch (err) {
  exit(argv.input + ' doesn\'t exist.');
}

if (!stats.isFile()) {
  exit(argv.input + ' is not a file.');
}

try {
  const access = fs.accessSync(argv.input, fs.constants.R_OK);
} catch (err) {
  exit(argv.input + ' isn\'t readable.');
}

// check output is writeable

// tokenize the input

const lineReader = rl.createInterface({
  input: fs.createReadStream(argv.input)
});

const tokens = [];
const lines = [];
const indent = '  ';

let heading = footer = ulist = olist = dlist = block = false;
let tag = '';

let lastToken = null;

lineReader.on('line', (line) => {
  // set last token and line...
  if (tokens.length !== 0) {
    lastToken = tokens[tokens.length - 1];
  }

  // deal with the 'footer'
  if (tokens.length === 0 && footer === false && line.match(/^={3,}$/)) {
    footer = `${indent.repeat(4)}<footer>\n`;
    return;
  }
  
  if (footer !== false) {
    if (line.match(/^={3,}$/)) {
      footer += `${indent.repeat(4)}</footer>`;
      tokens.push(footer);
      footer = false;
      return;
    }

    if (line.trim() === '') {
      return;
    }

    if (line.match(/^\s*PICO.*$/)) {
      footer += `${indent.repeat(5)}<h4>${line.trim()}</h4>\n`;
      return;
    }

    if (line.match(/^\s*http.*$/)) {
      footer += `${indent.repeat(5)}<p><a href="${line.trim()}">${line.trim()}</a></p>\n`;
      return;
    }
    
    footer += `${indent.repeat(5)}<p>${line.trim()}</p>\n`;
    return;
  }

  // headings

  if (line.match(/^Welcome.*$/)) {
    tokens.push(`${indent.repeat(5)}<h1>${line.trim()}</h1>`);
    return;
  }

  if (line.match(/^={3,}$/)) {
    if (!heading) {
      tag = `${indent.repeat(5)}<h1>`;
      heading = true;
    } else {
      tag += '</h1>';
      tokens.push(tag);
      tag = '';
      heading = false;
    }
    return;
  }

  if (line.match(/^-{3,}$/)) {
    if (!heading) {
      tag = `${indent.repeat(5)}<h2>`;
      heading = true;
    } else {
      tag += '</h2>';
      tokens.push(tag);
      tag = '';
      heading = false;
    }
    return;
  }

  if (line.match(/^:{2}.*$/)) {
    tokens.push(`${indent.repeat(5)}<h3>${line.replace(':: ','').trim()}</h3>`);
    return;
  }

  if (line.match(/\s+:{2}.*$/)) {
    tokens.push(`${indent.repeat(5)}<h4>${line.replace(':: ','').trim()}</h4>`);
    return;
  }

  if (heading) {
    tag += `${line.trim()}`;
    return;
  }

  // blocks

  if (line.trim() !== '') {
    if (block === false && lastToken !== false && lastToken.match(/^.*<\/.*>$/)) {
      block = true;
      tokens.push(`${indent.repeat(5)}<p>`);
    }

    tokens.push(`${indent.repeat(6)}${line.trim()}<br />`);
  } else {
    if (block === true) {
      block = false;
      tokens.push(`${indent.repeat(5)}</p>`);
    }
  }

  return;
});

// write to output

lineReader.on('close', () => {
  // remove 'footer'
  const footer = tokens.shift();

  // add main tokens
  tokens.unshift(`${indent.repeat(4)}<main>`)
  tokens.push(`${indent.repeat(4)}</main>`)

  // readd 'footer'
  tokens.push(footer);
  
  // generate html
  const content = tokens.join("\n").replace('&', '&amp;');
  const html = tp.replace('{{content}}', content);

  // write to the output file and exit
  fs.writeFileSync(argv.output, html);
  exit('done.');
});
