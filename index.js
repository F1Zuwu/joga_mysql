const express = require("express")
const app = express()

const path = require("path")

const mysql = require("mysql2")

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))

const hbs = require("express-handlebars")
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs")
app.engine("hbs", hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/"
}))

app.use(express.static("public"))

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "mydb"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to joga_mysql db")
})

app.get("/", (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render("index", {
            articles: articles
        })
    })
})

app.get("/article/:slug", (req, res) => {
    let query = `SELECT * FROM article WHERE slug="${req.params.slug}"`;
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        let query = `SELECT * FROM author WHERE id="${article[0].author_id}"`;
        con.query(query, (err, result) => {
            if (err) throw err;
            res.render("article", {
                article: article,
                author: result[0]
            })
        })
    })
})

app.listen(3000, () => {
    console.log("👍")
})