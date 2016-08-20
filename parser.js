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

const lines = [];
const tokens = [];

const lineReader = rl.createInterface({
  input: fs.createReadStream(argv.input)
});

let open = false;
lineReader.on('line', (line) => {
  if (line.match(/^={3,}$/)) {
    if (!open) {
      tokens.push('<h1>');
      open = true;
    } else {
      tokens.push('</h1>');
      open = false;
    }
    return;
  }

  if (line.match(/^-{3,}$/)) {
    if (!open) {
      tokens.push('<h2>');
      open = true;
    } else {
      tokens.push('</h2>');
      open = false;
    }
    return;
  }

  if (line.match(/^:{2}.*$/)) {
    tokens.push('<h3>' + line.replace(':: ','') + '</h3>');
    return;
  }

  if (line.match(/^:{2}.*$/)) {
    tokens.push('<h3>' + line.replace(':: ','') + '</h3>');
    return;
  }

  if (line.match(/\s+:{2}.*$/)) {
    tokens.push('<h4>' + line.replace(':: ','').trim() + '</h4>');
    return;
  }

  if (open) {
    tokens.push(line.trim());
  } else {
    tokens.push('<p>' + line.trim() + '</p>');
  }
  return;
});

// write to output

lineReader.on('close', () => {
  const content = tokens.join("\n");
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Pico-8 Manual</title>
  </head>
  <body>
    ${content}
  </body>
</html>`;

  fs.writeFileSync(argv.output, html);
});