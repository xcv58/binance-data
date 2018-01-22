import fs from 'fs'
import Binance from 'binance-api-node'
const client = Binance()

export const getCandles = async ({ symbol, interval, number }) => {
  console.log(`Get ${number} candles for ${symbol} with interval: ${interval}`)
  const candles = []
  while (candles.length < number) {
    const params = { symbol, interval }
    if (candles.length > 0) {
      params.endTime = candles[0].openTime - 1
    }
    console.log('candles API:', params)
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
      return ''
  }
}

export const writeToFile = ({ data, format, output }) => {
  const fileContent = getFileContent({ data, format })
  const filename = `${output}.${format}`
  fs.writeFile(filename, fileContent, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Successfully write to ${filename}`)
    }
  })
}
