const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const ContactController = require('../controller/ContactController')

router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../contacts.json'), (err, json) => {
        if(err){
            res.status(500).json({ error: err.message})
        } else {
            const data = JSON.parse(json)
            const contacts = data.map((d) => `${d.name} - ${d.phone}`);
            res.status(200).render("all", { contacts });
        }
    })
})
router.get('/Add', (req, res) => {
    fs.readFile(path.join(__dirname, '../contacts.json'), (err, json) => {
        if(err){
            res.status(500).json({ error: err.message})
        } else {
            const data = JSON.parse(json)
            const contacts = data.map((d) => `${d.name} - ${d.phone}`);
            res.status(200).render("add", { contacts, isContactsBlocked: true });
        }
    })
})

router.get('/Update', (req, res) => {
    fs.readFile(path.join(__dirname, '../contacts.json'), (err, json) => {
        if(err){
            res.status(500).json({ error: err.message})
        } else {
            const name = req.query.name;
            const phone = req.query.phone;

            const data = JSON.parse(json)
            const contacts = data.map((d) => `${d.name} - ${d.phone}`);
            
            res.status(200).render("update", { contacts, isDisabled: true, name, phone });
        }
    })
})


router.post('/add', ContactController.add)
router.post('/update', ContactController.update)
router.post('/delete', ContactController.delete)

module.exports = router
