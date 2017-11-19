const router = require('express').Router()
const axios = require('axios')
const baseURL = 'http://api.nature.com/content/opensearch'

/*
  access @ /api/nature

*/

router.get('/:query', (req, res, next) => {
  // @ts-ignore
  axios({
    method: 'get',
    url: '/request',
    baseURL,
    params: {
      query: req.params.query,
      queryType: 'searchTerms',
      httpAccept: 'application/json'
    }
  })
  .then(res => res.data)
  .then(results => {
    console.log(results.feed.entry)
    res.json({
      results: results.feed.entry
    })
  })
  .catch(next);
})


module.exports = router