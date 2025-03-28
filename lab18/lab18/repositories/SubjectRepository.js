const { AuditoriumType } = require('../model/auditoriumType')
const { Auditorium } = require('../model/auditorium')
const { Faculty } = require('../model/faculty')
const { Pulpit } = require('../model/pulpit')
const { Subject } = require('../model/subject')


class SubjectRepository {
    constructor() {}

    async get (){
        const subjects = await Subject.findAll()
        return subjects
    }
    async add (subject){
        const newSubject = await Subject.create(subject)
        return newSubject
    }
    async edit (subject){
        const result = await Subject.update(subject, {where: { subject: subject.subject }, returning: true})
        const editedSubject = result[1][0]
        return editedSubject
    }
    async delete (subject){
        const deletedSubject = await Subject.findOne({where: {subject: subject}})
        await Subject.destroy({where: {subject: subject}})
        return deletedSubject
    }
}

module.exports = SubjectRepository

