const Alexa = require('alexa-sdk')
const https = require('https')

const mastodon_url = process.env.URL
const mastodon_token = process.env.MASTODON_TOKEN
const alexa_id = process.env.ALEXA_ID

const handlers = {
  'Unhandled': function () {
    let any = this.event.request.intent.slots.any.value
    const option = {
      hostname: mastodon_url,
      path: '/api/v1/statuses',
      port: 443,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + mastodon_token
      },
    }
    let data = JSON.stringify({
      status: any + ' from Amazon Alexa'
    })
    const req = https.request(option)
    req.write(data)
    req.end()
    this.emit(':tell', 'マストドンで' + any + 'をトゥートしました。')
  }
}

exports.handler = function (event, context, callback) {
  let alexa = Alexa.handler(event, context, callback)
  alexa.appId = alexa_id
  alexa.registerHandlers(handlers)
  alexa.execute()
}