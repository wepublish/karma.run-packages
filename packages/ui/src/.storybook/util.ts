const seed = Math.random()

export function randomImageURL(width: number, height: number) {
  return `https://picsum.photos/seed/${seed + width * height}/${width}/${height}`
}
