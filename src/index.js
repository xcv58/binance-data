#!/usr/bin/env node
import 'babel-core/register'
import 'babel-polyfill'
import Binance from 'binance-api-node'
import yarngs from 'yargs'

const client = Binance()

const { argv } = yarngs

client.candles({ symbol: 'ETHBTC' })
.then((candles) => {
  console.log(candles)
})
console.log(argv)
console.log('Hello World!')
