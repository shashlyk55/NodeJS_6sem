const { AuditoriumType } = require('../model/auditoriumType')
const { Auditorium } = require('../model/auditorium')
const { Faculty } = require('../model/faculty')
const { Pulpit } = require('../model/pulpit')
const { Subject } = require('../model/subject')


class FacultyRepository {
    constructor() {

    }

    async get (){
        const faculties = await Faculty.findAll()
        return faculties
    }
    async add (faculty){
        const newFaculty = await Faculty.create(faculty)
        return newFaculty
    }
    async edit (faculty){
        const result = await Faculty.update(faculty, {where: {faculty: faculty.faculty}, returning: true})
        const editedFaculty = result[1][0]
        return editedFaculty
    }
    async delete (faculty){
        const deletedFaculty = await Faculty.findOne({where: {faculty: faculty}})
        await Faculty.destroy({where: {faculty: faculty}})
        return deletedFaculty
    }
}

module.exports = FacultyRepository

