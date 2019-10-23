const express = require('express')
const app = express()
const port = process.env.PORT || 4000

app.use(express.static(`${__dirname}/dist`))

app.use('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.listen(port, () => console.log(`Express is running on port ${port}`))