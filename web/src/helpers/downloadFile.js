/**
 * Helper function to download file
 * @param blob - pass a blob itself (typically received from a responseType: 'blob'
 * @param blobParts - blob data to download
 * @param type - file type
 * @param fileName - file download name
 * @param callback - callback to run after download is complete
 * @returns {void}
 */
function downloadFile ({
  blob,
  blobParts,
  type,
  fileName,
  callback
}) {
  const file = blob || new Blob([blobParts], { type })
  const fileURL = window.URL.createObjectURL(file)

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file)
    return
  }
  const link = document.createElement('a')

  link.href = fileURL
  link.download = fileName
  link.click()

  setTimeout(function () {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(fileURL)
  }, 100)

  link.remove()

  if (callback) callback()
}

export default downloadFile
