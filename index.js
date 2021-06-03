const express= require('express')
const app= express()
const port= 3000
const qdoba= require('./qdoba')

app.get('/', (_req, res)=> {
  res.send('Hello YelpReviewsSkillsAssessment!')
})

app.get('/qdoba/yelpData/:MY_PARAMETER', qdoba.yelpData)

app.listen(port, ()=> {
  console.log(`listening on port ${port}`)
})
