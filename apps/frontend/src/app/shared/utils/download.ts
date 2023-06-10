/**
 * Download a file from a URL
 * @param url The URL of the file to download
 * @param filename The name of the file to download
 */
export const download = (url: string, filename?: string): void => {
  const link = document.createElement("a");
  link.setAttribute("href", url);
  if (filename) link.setAttribute("download", filename);
  link.click();
  link.remove();
};
