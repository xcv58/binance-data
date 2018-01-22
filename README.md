# Binance Data
[![CircleCI](https://circleci.com/gh/xcv58/binance-data.svg?style=svg)](https://circleci.com/gh/xcv58/binance-data)
[![Build Status](https://travis-ci.org/xcv58/binance-data.svg?branch=master)](https://travis-ci.org/xcv58/binance-data)

Command line tool to get data from Binance

# Development

## Run script

```bash
yarn start
```

## Build

```bash
yarn build
```

## Lint

```bash
yarn lint
```

## Lint Fix

```bash
yarn lintfix
```

# Download & Usage

https://github.com/xcv58/binance-data/releases

You can find the binary for three platforms:

- Linux: `binance-data-linux`
- macOS: `binance-data-macos`
- Windows: `binance-data-win.exe`

> Collect candles for symbol(s)
>
> Options:
>   --help          Show help                                            [boolean]
>   --version       Show version number                                  [boolean]
>   --format, -f    the output format    [choices: "csv", "json"] [default: "csv"]
>   --number, -n    the number of candles for each symbol, the result will round
>                   up by 500                           [number] [default: "1500"]
>   --output, -o    the output filename               [string] [default: "output"]
>   --interval, -i  the interval of candles
>   [choices: "1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h",
>                                          "1d", "3d", "1w", "1M"] [default: "5m"]


## Get 1500 15m candles for ETHBTC and LTCBTC

`binance-data-macos -f csv -n 1500 ETHBTC LTCBTC`
