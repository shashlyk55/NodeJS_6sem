const fs = require('fs')
const path = require('path')


const ContactController = {
    add: async (req, res) => {
        fs.readFile(path.join(__dirname, '../contacts.json'), (err, json) => {
            if(err){
                res.status(500).json({ error: err.message})
            } else {
                const data = JSON.parse(json)

                const name = req.body.name;
                const phone = req.body.phone;
            
                data.push({ name, phone });

                const contacts = data.map((d) => `${d.name} - ${d.phone}`);

                fs.writeFile(path.join(__dirname, '../contacts.json'), JSON.stringify(data), (err) => {
                    if(err) {
                        res.status(500).json({ error: err.message})
                    } else {
                        res.status(200).json({ contacts });
                    }
                })
            }
        })
    },
    update: async (req, res) => {
        fs.readFile(path.join(__dirname, '../contacts.json'), (err, json) => {
            if(err){
                res.status(500).json({ error: err.message})
            } else {
                const data = JSON.parse(json)

                const name = req.body.name;
                const phone = req.body.phone;
            
                const index = data.findIndex((contact) => contact.phone === phone);

                if (index !== -1) data[index].name = name;

                const contacts = data.map((d) => `${d.name} - ${d.phone}`);

                fs.writeFile(path.join(__dirname, '../contacts.json'), JSON.stringify(data), (err) => {
                    if(err) {
                        res.status(500).json({ error: err.message})
                    } else {
                        res.status(200).json({ contacts });
                    }
                })
            }
        })
    },
    delete: async (req, res) => {
        fs.readFile(path.join(__dirname, '../contacts.json'), (err, json) => {
            if(err){
                res.status(500).json({ error: err.message})
            } else {
                const data = JSON.parse(json)

                const phone = req.body.phone;
        
                const index = data.findIndex((contact) => contact.phone === phone);
            
                if (index !== -1) data.splice(index, 1);

                const contacts = data.map((d) => `${d.name} - ${d.phone}`);

                fs.writeFile(path.join(__dirname, '../contacts.json'), JSON.stringify(data), (err) => {
                    if(err) {
                        res.status(500).json({ error: err.message})
                    } else {
                        res.status(200).json({ contacts });
                    }
                })
            }
        })
    }
}

module.exports = ContactController