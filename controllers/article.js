const con = require('../utils/db')

const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render("index", {
            articles: articles
        })
    })
}

const getArticleBySlug = (req, res) => {
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
}

const getArticleByAuthor = (req, res) => {
    let query = `SELECT * FROM article WHERE author_id="${req.params.id}"`;
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        let query = `SELECT * FROM author WHERE id="${req.params.id}"`;
        con.query(query, (err, result) => {
            if (err) throw err;
            res.render("author", {
                articles: article,
                author: result[0]
            })
        })
    })
}

module.exports = {getAllArticles, getArticleBySlug, getArticleByAuthor}