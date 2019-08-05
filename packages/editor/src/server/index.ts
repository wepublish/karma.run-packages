import {RequestListener} from 'http'
import createRouter from 'find-my-way'
import {ElementID} from '../shared'

export interface ModuleBundleMap {
  [path: string]: string
}

export interface ServerOptions {
  port?: number
  address?: string

  staticDirPath?: string
  staticHost?: string

  clientEntryFile: string
  moduleBundleMap?: ModuleBundleMap
}

export async function createWebsiteHandler(opts: ServerOptions): Promise<RequestListener> {
  const router = createRouter()

  router.on('GET', '/*', async (_req, res) => {
    const htmlString = `
    <html>
      <head>
        <script async src="${opts.staticHost}/${opts.clientEntryFile}"></script>
      </head>
      <body><div id="${ElementID.ReactRoot}"></div></body>
    </html>
  `

    res.setHeader('content-type', 'text/html')
    res.setHeader('content-length', Buffer.byteLength(htmlString))

    res.write(htmlString)
    res.end()
  })

  return (req, res) => {
    router.lookup(req, res)
  }
}

export default createWebsiteHandler
