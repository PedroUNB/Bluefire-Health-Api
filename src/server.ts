import server from '@config/app'
import { port, enviroment, apiUrl } from '@config/enviroments'
import { logsFromHost } from '@config/shared/logs'

server.listen(port, () => {
  logsFromHost(port, enviroment, apiUrl)
})
