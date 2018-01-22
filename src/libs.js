import fs from 'fs'
import json2csv from 'json2csv'
import Binance from 'binance-api-node'

let VERBOSE_LEVEL = 0
export default (argv) => {
  VERBOSE_LEVEL = argv.verbose
}

export const WARN = (...args) => { VERBOSE_LEVEL >= 0 && console.log(...args) }
export const INFO = (...args) => { VERBOSE_LEVEL >= 1 && console.log(...args) }
export const DEBUG = (...args) => { VERBOSE_LEVEL >= 2 && console.log(...args) }

const client = Binance()

export const getCandles = async ({ symbol, interval, number }) => {
  INFO(`Get ${number} candles for ${symbol} with interval: ${interval}`)
  const candles = []
  while (candles.length < number) {
    const params = { symbol, interval }
    if (candles.length > 0) {
      params.endTime = candles[0].openTime - 1
    }
    DEBUG('candles API:', params)
    const data = await client.candles(params)
    candles.unshift(...data)
  }
  return candles.map(candle => ({ symbol, interval, ...candle }))
}

export const getFileContent = ({ data, format }) => {
  switch (format) {
    case 'json':
      return JSON.stringify(data, null, 2)
    case 'csv':
      if (data.length === 0) {
        throw new Error('data is empty!')
      }
      const fields = Object.keys(data[0])
      return json2csv({ data, fields })
  }
}

export const writeToFile = ({ data, format, output }) => {
  const fileContent = getFileContent({ data, format })
  const filename = `${output}.${format}`
  fs.writeFile(filename, fileContent, (err) => {
    if (err) {
      WARN(err)
    } else {
      WARN(`Successfully write to ${filename}`)
    }
  })
}
