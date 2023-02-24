import express from "express"; 
import mysql from "mysql";
import cors from "cors";

const gestao = express()

const db = mysql.createConnection ({
    host:"localhost",
    user:"root",
    password: "",
    database:"financeiro"
});

gestao.use(express.json());
gestao.use(cors());


gestao.get("/", (req, res)=>{
    res.json("Oi, Este é o backend!")
})


gestao.get("/entradas", (req, res)=>{
    const q = "SELECT * FROM entradas"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

gestao.get("/saidas", (req, res)=>{
    const q = "SELECT * FROM saidas"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

gestao.get("/saldo", (req, res)=>{
    const q = "SELECT (SELECT SUM (valor) FROM entradas) - SELECT (SELECT SUM (valor) FROM saidas) as Saldo"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})





gestao.listen(8800, ()=>{
    console.log("conectado")

});
