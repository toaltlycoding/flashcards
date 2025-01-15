const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');



app.use((req, res, next) => {
    console.log("Hello");
    const err = new Error('Oh no!');
    next(err);
});

app.use((req, res, next) => {
    console.log("world!");
    next();
});

app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', {name});
    } else {
        res.redirect('/hello');
    }
    
});

app.get('/cards', (req, res) => {
    res.render('card', {prompt: "Who is buried in grant's tomb?", hint: "Think about whose tomb it is."} );
});

app.get('/sandbox', (req, res) => {
    res.render('sandbox')
});

app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if(name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

app.post('/hello', (req, res) => {
        res.cookie('username', req.body.username);
        res.redirect('/');
});

app.get('/goodbye', (req, res) => {
    res.send('Goodbye! Redirecting you to the hello form.')
})

app.post('/goodbye', (req, res) => {
    res.clearCookie('username', {path: '/'});
    res.redirect('/hello');
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status
    res.render('error');
})

app.listen(3000, () => {
console.log('the application is running on localhost:3000')

});

//create two columns and put in first and last names