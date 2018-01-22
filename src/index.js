#!/usr/bin/env node
import 'babel-core/register'
import 'babel-polyfill'
import yarngs from 'yargs'
import { getCandles, writeToFile } from './libs'

export default yarngs
.command(
  '$0 [symbols..]',
  'Collect candles for symbol(s)',
  {},
  async (argv) => {
    const { symbols, interval, number, output, format } = argv
    if (Array.isArray(interval)) {
      console.error('Do NOT support multiple intervals!')
      process.exit(1)
    }
    const candles = await Promise.all(
      symbols.map(async (symbol) => {
        const data = await getCandles({ symbol, interval, number })
        return data
      })
    )
    const data = candles.reduce((acc, cur) => acc.concat(cur), [])
    writeToFile({ data, format, output })
  })
.option('format', {
  alias: 'f',
  describe: 'the output format',
  default: 'csv',
  choices: [
    'csv',
    'json'
  ]
})
.option('number', {
  alias: 'n',
  describe: 'the number of candles for each symbol, the result will round up by 500',
  default: '1500',
  type: 'number'
})
.option('output', {
  alias: 'o',
  describe: 'the output filename',
  default: 'output',
  type: 'string'
})
.option('interval', {
  alias: 'i',
  describe: 'the interval of candles',
  default: '5m',
  choices: [ '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M' ]
}).argv
