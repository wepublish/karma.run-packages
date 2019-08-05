#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import {createServer} from 'http'

import {createWebsiteHandler} from '@dudagroup/editor/server'
import {findEntryFromAssetList} from '@dudagroup/webpack'

async function asyncMain() {
  const staticHost = process.env.STATIC_HOST

  const assetList = JSON.parse(
    await fs.promises.readFile(path.resolve(__dirname, '../assetList.json'), 'utf-8')
  )

  const entry = findEntryFromAssetList('client', assetList)

  if (!entry) throw new Error("Couldn't find entry in asset list.")

  const server = createServer(
    await createWebsiteHandler({
      port: process.env.PORT != undefined ? parseInt(process.env.PORT) : undefined,
      address: process.env.ADDRESS,
      staticDirPath: staticHost ? undefined : path.resolve(__dirname, '../static'),
      staticHost: staticHost || '/static',
      clientEntryFile: entry
    })
  )

  const port = process.env.PORT ? parseInt(process.env.PORT) : 8001
  const address = process.env.ADDRESS || 'localhost'

  server.listen(port, address)

  console.log(`Server listening: http://${address}:${port}`)
}

asyncMain().catch(err => {
  console.error(err)
  process.exit(1)
})
