const request= require('request')



let qdoba= {
  yelpData(req, res) {
    if (!('YELP_KEY' in req.params)) {
      return res.status(400).send('Please provide the Yelp! key in the request.')
    }
    let options= {
      'method': 'GET',
      'url': 'https://api.yelp.com/v3/businesses/qdoba-mexican-eats-milwaukee-3/reviews',
      'headers': {
        'Authorization': 'Bearer ' + req.params['YELP_KEY']
      }
    }
    request(options, (error, response)=> {
      if (error) {
        console.error(error)
        return res.status(500).send('Error occurred while requesting data from yelp.')
      }
      let responseBody
      try {
        responseBody = JSON.parse(response.body)
      } catch (exception) {
        console.error(exception)
        return res.status(500).send('Unable to parse yelp response as json')
      }
      if (!('reviews' in responseBody)) {
        console.debug('yelp response body:')
        console.debug(responseBody)
        return res.status(500).send('Could not find the reviews data in the yelp response object.')
      }
      res.status(200).send(responseBody['reviews'])
    })
    // res.send(`req.params: ${JSON.stringify(req.params)}`)
  }
}
module.exports= qdoba
