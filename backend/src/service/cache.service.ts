import NodeCache from 'node-cache'

export const cacheUrl = new NodeCache({ stdTTL: 3600 })