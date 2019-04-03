/**
 * get extension string from filename
 * @param filename
 */
export function extname(filename: string) {
  return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
}
