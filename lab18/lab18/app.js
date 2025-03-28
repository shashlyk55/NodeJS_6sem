const dotenv = require('dotenv')
const { sequelize } = require('./db')
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const { models } = require('./model/models')

const FacultyRepository = require('./repositories/FacultyRepository')
const PulpitRepository = require('./repositories/PulpitRepository')
const SubjectRepository = require('./repositories/SubjectRepository')
const AuditoriumRepository = require('./repositories/AuditoriumRepository')
const AuditoriumTypeRepository = require('./repositories/AuditoriumTypeRepository')
const mimetypes = require('./utils/mimeTypes')

dotenv.config({path: './settings.env'})

let facultyRepository
let pulpitRepository
let subjectRepository
let auditoriumRepository
let auditoriumTypeRepository

const staticDir = path.join(__dirname, 'static')

const httpHandler = async (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const pathname = parsedUrl.pathname

    if(req.method == 'GET'){
        if(pathname === '/'){
            fs.readFile(path.join(staticDir, 'index.html'),(err, data) => {
                if(err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'})
                    res.end('server error')
                    return
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(data)
                    return
                }
            })
        } else if (pathname.startsWith('/static')){
            const parsedPath = pathname.split('/')
            const file = parsedPath[parsedPath.length - 1]
            const fileExt = '.' + file.split('.')[1]
            
            fs.readFile(path.join(staticDir, file), (err, data) => {
                if(err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'})
                    res.end('server error')
                    return
                } else {
                    res.writeHead(200, {'Content-Type': mimetypes[fileExt]})
                    res.end(data)
                    return
                }
            })
            
        } else if(pathname === '/api/faculties'){
            try{
                const faculties = await facultyRepository.get().catch((err) => {
                    res.writeHead(500, {'Content-Type': 'text/plain'})
                    res.end(err.message)
                    return
                })

                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(faculties))
                return
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/pulpits'){
            try{
                console.log('get pulpits');
                const pulpits = await pulpitRepository.get().catch((err) => {
                    res.writeHead(500, {'Content-Type': 'text/plain'})
                    res.end(err.message)
                    return
                })

                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(pulpits))
                return
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/subjects'){
            try{
                console.log('get subjects');
                const subjects = await subjectRepository.get().catch((err) => {
                    res.writeHead(500, {'Content-Type': 'text/plain'})
                    res.end(err.message)
                    return
                })

                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(subjects))
                return
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/auditoriumtypes'){
            try{
                console.log('get auditorium types');
                const auditoriumTypes = await auditoriumTypeRepository.get().catch((err) => {
                    res.writeHead(500, {'Content-Type': 'text/plain'})
                    res.end(err.message)
                    return
                })

                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(auditoriumTypes))
                return
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/auditoriums'){
            try{
                console.log('get auditoriums');
                const auditoriums = await auditoriumRepository.get().catch((err) => {
                    res.writeHead(500, {'Content-Type': 'text/plain'})
                    res.end(err.message)
                    return
                })

                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(auditoriums))
                return
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end('not found')
            return
        }
    } else if(req.method == 'POST'){
        if(pathname === '/api/faculties'){
            try{
                console.log('post faculties');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)                
                    const faculty = await facultyRepository.add(body).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
            
        } else if(pathname === '/api/pulpits'){
            try{
                console.log('post pulpits');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)                
                    const pulpit = await pulpitRepository.add(body).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })

                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/subjects'){
            try{
                console.log('post subjects');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)                
                    const subject = await subjectRepository.add(body).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/auditoriumtypes'){
            try{
                console.log('post auditorium types');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)                
                    const auditoriumType = await auditoriumTypeRepository.add(body).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/auditoriums'){
            try{
                console.log('post auditoriums');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)                
                    const auditorium = await auditoriumRepository.add(body).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end('not found')
        }
    } else if(req.method == 'PUT'){
        if(pathname === '/api/faculties'){
            try{
                console.log('put faculties');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)                
                    const faculty = await facultyRepository.edit(body).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }

        } else if(pathname === '/api/pulpits'){
            try{
                console.log('put pulpits');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)                
                    const pulpit = await pulpitRepository.edit(body).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/subjects'){
            try{
                console.log('put subjects');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)                
                    const subject = await subjectRepository.edit(body).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/auditoriumtypes'){
            try{
                console.log('put auditorium types');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)                               
                    const auditoriumType = await auditoriumTypeRepository.edit(body).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/auditoriums'){
            try{
                console.log('put auditorium');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)
                    const auditorium = await auditoriumRepository.edit(body).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end('not found')
            return
        }
    } else if(req.method == 'DELETE'){
        if(pathname === '/api/faculties'){
            try{
                console.log('delete faculties');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })
    
                req.on('end', async () => {
                    const body = JSON.parse(data)
                    console.log(body)
                    
                    const faculty = await facultyRepository.delete(body.faculty).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/pulpits'){
            try{
                console.log('delete pulpits');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })
    
                req.on('end', async () => {
                    const body = JSON.parse(data)
                    console.log(body)
                    
                    const pulpit = await pulpitRepository.delete(body.pulpit).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/subjects'){
            try{
                console.log('delete subjects');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)
                    console.log(body)
                    
                    const subject = await subjectRepository.delete(body.subject).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })

                    res.writeHead(200, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify(subject))
                    return
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/auditoriumtypes'){
            try{
                console.log('delete auditorium types');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)
                    console.log(body)
                    
                    const auditoriumType = await auditoriumTypeRepository.delete(body.auditorium_type).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else if(pathname === '/api/auditoriums'){
            try{
                console.log('delete auditoriums');
                
                let data = ""
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    const body = JSON.parse(data)                
                    const auditorium = await auditoriumRepository.delete(body.auditorium).then((data) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify(data))
                        return
                    }).catch((err) => {
                        res.writeHead(500, {'Content-Type': 'text/plain'})
                        res.end(err.message)
                        return
                    })
                })
            } catch(err){
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end(err.message)
                return
            }
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end('not found')
            return
        }
    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.end('method not allowed')
        return
    }
}

const server = http.createServer(httpHandler)

const HOST = process.env.SERVER_HOST
const PORT = process.env.SERVER_PORT

server.listen(PORT, HOST, () => {
    console.log(`server started on ${HOST}:${PORT}`);

    sequelize.authenticate()
        .then(() => {
            console.log('connected to db');
        })
        .catch((err) => {
            console.error(`db connecting error: ${err}`); 
        })
    sequelize.sync()
        .then(() => {
            console.log('synchnized with db');
            facultyRepository = new FacultyRepository()
            pulpitRepository = new PulpitRepository()
            subjectRepository = new SubjectRepository()
            auditoriumRepository = new AuditoriumRepository()
            auditoriumTypeRepository = new AuditoriumTypeRepository()

            Object.values(models).forEach(model => {
                if (model.associate) {
                    model.associate(models);
                }
            });
        })
        .catch((err) => {
            console.error(`synchronization error: ${err}`); 
        })
})