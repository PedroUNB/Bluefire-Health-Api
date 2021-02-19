export function logsFromHost(port: string | number, enviroment: string, apiUrl: string) {
  console.log('[HOST] Server ON!')

  if (enviroment === 'local') {
    console.log('[HOST] Server is running on: ' +
    `\u001b[32mhttp://127.0.0.1:${port}\x1b[0m`
    )
  } else {
    console.log('[HOST] Server is running on: ' +
    `\u001b[32m${apiUrl}\x1b[0m`
    )
  }
}
