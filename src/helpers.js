import axios from 'axios'
import { Parser } from 'xml2js'
import { promisify } from 'bluebird'
const parseXML = promisify(new Parser().parseString)
const baseURL = 'http://export.arxiv.org/api/query'

export const queryArXiv = query =>
  axios({
    method: 'get',
    baseURL,
    url: '/',
    params: {
      search_query: `all:${query}`
    }
  })
  .then(res => res.data)
  .then(xmlResponse => parseXML(xmlResponse))
  .then(parsed => {
    console.log('API request finished with result: ', parsed.feed.entry)
    return parsed.feed.entry
  })
  .catch(console.error);
