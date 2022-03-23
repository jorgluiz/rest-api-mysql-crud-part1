const express = require("express")
const connection = require("./dbConnection")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())

// console.log(connection)

// obter todos clientes
app.get("/client", (req, res) => {
    connection.query("SELECT * FROM persons", (err, result) => {
        if (err) console.log(err)
        else console.log(result)

        res.send(result)
    })
})

// selecionar um cliente específico
app.get("/client/:id", (req, res) => {
    const id = req.params.id
    connection.query("SELECT * FROM persons WHERE id=?", id, (err, result) => {
        if (err) console.log(err)
        else console.log(result)

        res.send(result)
    })
})

// inserindo um cliente
app.post("/client/insert", (req, res) => {
    const dataBody = req.body
    connection.query(`INSERT INTO persons (name, age) VALUES('${dataBody.name}','${dataBody.age}')`, (err, result) => {
        if (err) console.log(err)
        else console.log(result)

        res.send()
    })
})

// inserindo uma coleção propriedades
app.post("/client/colection", (req, res) => {
    const dataBody = req.body
    let arrColection = dataBody.map(p => [p.name, p.course, p.grade, p.city])

    connection.query(`INSERT INTO persons(name, course, grade, city) VALUES ?`, [arrColection], (err, result) => {
        if (err) console.log(err)
        else console.log(result)

        res.send()
    })
})

// modificando um cliente
app.put("/client/update/:id", (req, res) => {
    const id = req.params.id
    const bodyData = req.body
    connection.query(`UPDATE persons SET name='${bodyData.name}', age='${bodyData.age}'  WHERE id=${id}`, (err, result) => {
        if (err) console.log(err)
        else console.log(result)

        res.send()
    })
})

// deletando um cliente
app.delete("/client/delete/:id", (req, res) => {
    const id = req.params.id
    connection.query(`DELETE FROM persons WHERE id=${id}`, (err, result) => {
        if (err) console.log(err)
        else console.log('Successfully deleted. Affected row: ', result)

        res.send()
    })
})

// deletando uma tabela
app.delete("/client/drop/", (req, res) => {
    connection.query(`DROP TABLE persons`, (err, result) => {
        if (err) console.log(err)
        else console.log('table deleted.', result)

        res.send()
    })
})



app.listen(3000, () => {
    console.log('Conected port 3000')
})