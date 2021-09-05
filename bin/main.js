#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const Parse = require('../parser');
const generate = require('../gen_docx');

var argv = require('minimist')(process.argv.slice(2));

let inputPath = path.join(process.cwd(), argv["_"][0]);

let input = fs.readFileSync(inputPath, {encoding: "utf8"});

let result = Parse(input);
generate(result, path.basename(inputPath));
