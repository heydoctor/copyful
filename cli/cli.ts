#! /usr/bin/env node

import * as yargs from 'yargs';
import clone from './commands/clone';

yargs
  // @ts-ignore
  .scriptName('copyful')
  .usage('$0 <cmd> [args]')
  .command(
    'clone',
    'Pull down copy from remote source and write to file system',
    yargs => {
      yargs.positional('adapter', {
        type: 'string',
        default: 'contentful',
        describe: 'Remote source',
      });
      yargs.positional('path', {
        type: 'string',
        describe: 'Destination file',
      });
    },
    clone
  )
  .help().argv;
