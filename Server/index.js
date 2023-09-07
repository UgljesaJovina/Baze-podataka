const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bigQueries = require("./queries")
const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "UgljesaStarcevic",
    password: "misakreten123",
    database: "biblioteka",
    multipleStatements: true
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL connected");
});

app.get("/knjige/:id?", (req, res) => {
    let query = `select * from knjigaInformacije ${req.params.id ? `where idKnjige = ${req.params.id}` : ""}`;
    db.query(query, (err, result) => {
        if (err){
            res.status(406);
            res.send(err);
        }else{
            res.status(200);
            res.send(result);
        }
    })
});

app.get("/izdavaci/:id?", (req, res) => {
    let query = `select * from izdavaci ${req.params.id ? `where id = ${req.params.id}` : ""}`;
    db.query(query, (err, result) => {
        if (err){
            res.status(406);
            res.send(err);
        }else{
            res.status(200);
            res.send(result);
        }
    })
});

app.get("/izdavaci-imena", (req, res) => {
    let query = "select id, naziv from izdavaci";
    db.query(query, (err, result) => {
        if (err){
            res.status(406);
            res.send(err);
        } else { 
            res.status(200);
            res.send(result);
        }
    })
});

app.get("/autori/:id?", (req, res) => {
    let query = `select * from autori ${req.params.id ? `where id = ${req.params.id}` : ""}`;
    db.query(query, (err, result) => {
        if (err){
            res.status(406);
            res.send(err);
        }else{
            res.status(200);
            res.send(result);
        }
    })
});

app.get("/autori-imena", (req, res) => {
    let query = "select id, ime, prezime from autori";
    db.query(query, (err, result) => {
        if (err){
            res.status(406);
            res.send(err);
        } else { 
            res.status(200);
            res.send(result);
        }
    })
});

app.post("/knjige", (req, res) => {
    let query = `insert into knjige set ?`;
    db.query(query, req.body, (err, result) => {
        if (err){
            res.status(406);
            res.send(err);
        }else{
            res.status(200);
            res.send(result);
        }
    });
});

app.post("/autori", (req, res) => {
    let query = `insert into autori set ?`;
    db.query(query, req.body, (err, result) => {
        if (err) {
            res.status(406);
            res.send(err);
        }else {
            res.status(200);
            res.send(result);
        }
    });
});

app.post("/izdavaci", (req, res) => {
    let query = `insert into izdavaci set ?`;
    db.query(query, req.body, (err, result) => {
        if (err) {
            res.status(406);
            res.send(err);
        }else {
            res.status(200);
            res.send(result);
        }
    });
});

app.post("/autor-knjiga", (req, res) => {
    let query = `insert into autorknjiga set ?`;
    db.query(query, req.body, (err, result) => {
        if (err){
            res.status = 406;
            res.send(err);
        }else {
            res.status(200);
            res.send(result);
        }
    })
});

app.delete("/knjige/:id", (req, res) => {
    query = `delete from knjige where id = ${req.params.id}`;
    db.query(query, (err, result) => {
        if (err) {
            res.status(406);
            res.send(err);
        }else {
            res.status(200);
            res.send(result);
        }
    });
});

app.delete("/autori/:id", (req, res) => {
    let query = `delete from autori where id = ${req.params.id}`;
    db.query(query, (err, result) => {
        if (err) {
            res.status(406);
            res.send(err);
        }else {
            res.status(200);
            res.send(result);
        }
    });
});

app.delete("/izdavaci/:id", (req, res) => {
    let query = `delete from izdavaci where id = ${req.params.id}`;
    db.query(query, (err, result) => {
        if (err) {
            res.status(406);
            res.send(err);
        }else {
            res.status(200);
            res.send(result);
        }
    });
});

app.listen(5000, () => console.log("Listening at 5000"));