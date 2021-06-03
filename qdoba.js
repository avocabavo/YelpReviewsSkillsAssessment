let qdoba= {
  yelpData(req, res) {
    res.send(`req.params: ${JSON.stringify(req.params)}`)
  }
}
module.exports= qdoba
