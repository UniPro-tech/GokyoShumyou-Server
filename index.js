const express = require("express");

const Deta = require("deta");
const deta = Deta();
const db = deta.Base("log-conf");

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(express.json());

const status = require("./api/v0/waitinglist");
app.use("/v0/waitinglist", status);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use(express.json()); // jsonオブジェクトとして認識する
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencodedを識別できるようにする。（trueにすることで階層構造（a[b]=c）を認識する）

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use(express.urlencoded({
    extended: true
}));*/
app.listen(port, () => console.log(`listening on port ${port}!`));
