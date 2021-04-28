/*
 * Converting CSV files to JSON
 *
 * This tool loads the well data and writes out the JSON internal format,
 * probably for inspection and debugging purposes.
 */

import { loadData as csvLoader } from '../lib/load-data';
import { getParameters, CliParameters } from '../lib/cli-common';
import colors from 'colors';
import fs from 'fs';

function checkForMissingFlags(cliArgs: CliParameters) {
  if (cliArgs.paths == null) {
    console.warn(colors.red.bold('Please specify input files (-p flag)'));
    return false;
  }

  if (cliArgs.output == null) {
    console.warn(colors.yellow.bold('No output file specified (-o flag).'));
    cliArgs.output = 'csv-to-json-output.json';
  }
  return true;
}

async function main(optionsPromise: Promise<CliParameters>) {
  const options = await optionsPromise;

  console.log(options.paths);
  if (!checkForMissingFlags(options)) return;
  const inputJson = csvLoader(options.paths);
  const outputJson = JSON.stringify(inputJson);
  fs.writeFileSync(options.output, outputJson);
}

main(getParameters()).catch(console.error);