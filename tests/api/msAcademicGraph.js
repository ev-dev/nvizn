const router = require('express').Router()
const axios = require('axios')

const { AZURE_KNOWLEDGE_KEY } = require('../../API_KEYS')

router.get('/test/:query', (req, res, next) => {
  const { query } = req.params
  console.log('\n - Test Route Requested -\n')
  
  axios.get('https://westus.api.cognitive.microsoft.com/academic/v1.0/evaluate', {
    params: {
      expr: query
    },
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_KNOWLEDGE_KEY
    }
  })
    .then(res => res.data)
    .then(results => {
      res.json({
        message: 'Test Successful',
        query,
        results
      })
    })
    .catch(next)
})

router.get('/:query', (req, res, next) => {
  const options = {
    azureType: 'evaluate'
  }
  const { query } = req.params

  //@ts-ignore
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
    .then(azureResults => res.json(azureResults))
    .catch(next)
})


module.exports = router