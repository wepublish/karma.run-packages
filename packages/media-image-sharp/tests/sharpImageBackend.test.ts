import test from 'ava'
import fs from 'fs'
import path from 'path'

import SharpImageBackend from '@karma.run/media-image-sharp'

test('getMetadata returns correct metadata for a PNG', async t => {
  const imageBackend = new SharpImageBackend()
  const metadata = await imageBackend.getMetadata(
    fs.createReadStream(path.join(__dirname, './test.png'))
  )

  t.deepEqual(metadata, {
    width: 100,
    height: 200,
    format: 'png',
    orientation: undefined
  })
})

test('getMetadata returns correct metadata for an oriented JPG', async t => {
  const imageBackend = new SharpImageBackend()
  const metadata = await imageBackend.getMetadata(
    fs.createReadStream(path.join(__dirname, './test_orientated.jpg'))
  )

  t.deepEqual(metadata, {
    width: 100,
    height: 200,
    format: 'jpeg',
    orientation: 8
  })
})

test('getMetadata returns correct metadata for a SVG', async t => {
  const imageBackend = new SharpImageBackend()
  const metadata = await imageBackend.getMetadata(
    fs.createReadStream(path.join(__dirname, './test.svg'))
  )

  t.deepEqual(metadata, {
    width: 100,
    height: 200,
    format: 'svg',
    orientation: undefined
  })
})
