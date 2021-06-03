const request= require('request')

async function extraCreditHelper(_req, res, reviews) {
  const vision= require('@google-cloud/vision')
  const visionClient= new vision.ImageAnnotatorClient()

  let i= 0;
  let user= reviews[i]['user']
  console.log(`user: ${JSON.stringify(user)}`)
  const [visionResult]= await visionClient.labelDetection(reviews[i]['user']['image_url'])
  const visionLabels= visionResult.labelAnnotations;
  reviews[i].vision= visionLabels
  res.status(200).json(responseBody['reviews'])
}

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
      res.status(200).json(responseBody['reviews'])
    })
  },
  extraCredit(req, res) {
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

      //This is where the actual extra credit starts (everything else was copied from the first api endpoint)

      let reviews= responseBody['reviews']
      extraCreditHelper(req, res, reviews)

    })
  }
}
module.exports= qdoba
