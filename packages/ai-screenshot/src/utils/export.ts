import { toPng, toSvg } from 'html-to-image'

/**
 * Export a DOM element as a PNG image
 * @param element The DOM element to export
 * @returns Promise that resolves to a data URL of the PNG image
 */
export const exportToPng = async (element: HTMLElement): Promise<string> => {
  try {
    const dataUrl = await toPng(element)
    return dataUrl
  } catch (error) {
    console.error('Error exporting to PNG:', error)
    throw error
  }
}

/**
 * Export a DOM element as an SVG image
 * @param element The DOM element to export
 * @returns Promise that resolves to a data URL of the SVG image
 */
export const exportToSvg = async (element: HTMLElement): Promise<string> => {
  try {
    const dataUrl = await toSvg(element)
    return dataUrl
  } catch (error) {
    console.error('Error exporting to SVG:', error)
    throw error
  }
}

/**
 * Download a data URL as a file
 * @param dataUrl The data URL to download
 * @param filename The name of the file to download
 */
export const downloadDataUrl = (dataUrl: string, filename: string): void => {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
