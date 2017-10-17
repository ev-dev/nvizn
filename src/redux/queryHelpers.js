import axios from 'axios'
import { Parser } from 'xml2js'
import { promisify } from 'bluebird'
const parseXML = promisify(new Parser().parseString)

import { AZURE_KNOWLEDGE_KEY } from '../../API_KEYS'

/* ------ Helper Functions for Querying Per Source ------ */

export const queryArxiv = (query, options={}) =>
  axios({
    method: 'get',
    baseURL: 'http://export.arxiv.org/api/query',
    url: '/',
    params: {
      search_query: `all:${query}`
    }
  })
    .then(res => res.data)
    // @ts-ignore
    .then(xmlResponse => parseXML(xmlResponse))
    .then(parsed => parsed.feed.entry)
    .catch(console.error);


export const queryAzure = (query, options={ azureType: 'evaluate' }) =>
  axios({
    method: 'get',
    baseURL: 'https://westus.api.cognitive.microsoft.com/academic/v1.0',
    url: `/${options.azureType}`,
    params: {
      expr: query
    },
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_KNOWLEDGE_KEY
    }
  })
    .then(res => res.data.entities)
    .catch(console.error)

