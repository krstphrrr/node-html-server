/**
 * This file contains the routes of the Jornada Experimental Range website
 * @author Jeb Williamson, USDA-ARS Jornada Experimental Range
 */

const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/files", express.static(__dirname + '/files'));

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/agricultural-sustainability', (req, res) => {
    res.render('agricultural-sustainability');
});

app.get('/agricultural-sustainability/long-term-agroecosystem-research', (req, res) => {
    res.render('long-term-agroecosystem-research');
});

app.get('/climate-adaptation', (req, res) => {
    res.render('climate-adaptation');
});

app.get('/contact-us', (req, res) => {
    res.render('contact-us');
});

app.get('/data', (req, res) => {
    res.render('data');
});

app.get('/ecosystem-response', (req, res) => {
    res.render('ecosystem-response');
});

app.get('/ecosystem-response/long-term-monitoring', (req, res) => {
    res.render('long-term-monitoring');
});

app.get('/ecosystem-response/rangeland-restoration', (req, res) => {
    res.render('rangeland-restoration');
});

app.get('/education', (req, res) => {
    res.render('education');
});

app.get('/events', (req, res) => {
    res.render('events');
});

app.get('/jobs', (req, res) => {
    res.render('jobs');
});

app.get('/jornada-basin', (req, res) => {
    res.render('jornada-basin');
});

app.get('/knowledge-systems', (req, res) => {
    res.render('knowledge-systems');
});

app.get('/knowledge-systems/esd', (req, res) => {
    res.render('esd');
});

app.get('/knowledge-systems/esd/development-resources', (req, res) => {
    res.render('esd-development-resources');
});

app.get('/knowledge-systems/esd/international', (req, res) => {
    res.render('esd-international');
});

app.get('/knowledge-systems/esd/literature', (req, res) => {
    res.render('esd-literature');
});

app.get('/knowledge-systems/esd/workshops-presentations', (req, res) => {
    res.render('esd-workshops-presentations');
});

app.get('/news', (req, res) => {
    res.render('news');
});

app.get('/people', (req, res) => {
    res.render('people');
});

app.get('/presentations', (req, res) => {
    res.render('presentations');
});

app.get('/presentations/criollo-workshop-2016', (req, res) => {
    res.render('criollo-workshop-2016');
});

app.get('/presentations/jornada-symposium-2020', (req, res) => {
    res.render('jornada-symposium-2020');
});

app.get('/publications', (req, res) => {
    res.render('publications');
});

app.get('/researcher-information', (req, res) => {
    res.render('researcher-information');
});

app.get('/species/ants', (req, res) => {
    res.render('species/ants');
});

app.get('/species/birds', (req, res) => {
    res.render('species/birds');
});

app.get('/species/mammals', (req, res) => {
    res.render('species/mammals');
});

app.get('/species/jer-plants', (req, res) => {
    res.render('species/jer-plants');
});

app.get('/species/lter-plants', (req, res) => {
   res.render('species/lter-plants');
});

app.get('/species/reptiles-amphibians', (req, res) => {
    res.render('species/reptiles-amphibians');
});

app.get('/tools', (req, res) => {
    res.render('tools');
});

app.get('/tools/dima', (req, res) => {
    res.render('dima');
});

app.get('/tools/stipa', (req, res) => {
    res.render('stipa');
});

app.get('/people/:person', (req, res) => {
    if (req.params.person) {
        let page = '/views/people/' + req.params.person + '.ejs';

        fs.stat(page, function(err, stat) {
            if (err == null) {
                page = 'people/' + req.params.person;
                res.render(page);
            }
            else {
                res.sendStatus(404);
            }
        });
    }
    else {
        res.sendStatus(404);
    }
});

app.listen(port, () => {});
