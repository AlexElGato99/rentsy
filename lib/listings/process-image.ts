import "server-only"
import sharp from "sharp"

const MAX_DIMENSION = 1920
const WEBP_QUALITY = 82
export const MIN_WIDTH = 800
export const MIN_HEIGHT = 600

export class ImageTooSmallError extends Error {
  constructor(
    public width: number,
    public height: number
  ) {
    super(`Image is ${width}x${height}px, below the ${MIN_WIDTH}x${MIN_HEIGHT}px minimum.`)
  }
}

export async function processImageToWebp(input: Buffer): Promise<Buffer> {
  const image = sharp(input).rotate()
  const { width, height } = await image.metadata()

  if (width && height && (width < MIN_WIDTH || height < MIN_HEIGHT)) {
    throw new ImageTooSmallError(width, height)
  }

  return image
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer()
}
