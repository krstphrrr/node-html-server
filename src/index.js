const express = require('express');
const app = express();

app.set('view engine', 'ejs')
app.set('views', __dirname+'/views')

app.get('/', (req, res) => {
  res.render('index')
})
app.listen(5000, () => console.log('Server is up and running'));