import { promisify, inspect } from 'util'
import axios from 'axios'

// diffbot is a cloud parsing engine

const botBaseURL = 'https://api.diffbot.com/v3/article'
const config = {
  params: {
    token: '313ca9f0ac35efd37776114429248f76',
    url: 'http://www.sciencedirect.com/science/article/pii/S055032131730319X'
  }  
}  

const fetchArticle = async () => {
  try {
    const { data } = await axios.get(botBaseURL, config)
    console.log(inspect(data, false, null))
  } catch (err) {
    console.error('Error fetching page data...\n', err)
  }
}
fetchArticle()








// import { Diffbot } from 'diffbot'
// const _diffBot = new Diffbot(APItoken)
// const diffbotArticle = promisify(_diffBot.article)
// const fetchAndParse = uri => diffbotArticle({ uri })

