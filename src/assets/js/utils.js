export function writeToLocalStore (options) {
  localStorage.setItem('cities', JSON.stringify(options))
}
