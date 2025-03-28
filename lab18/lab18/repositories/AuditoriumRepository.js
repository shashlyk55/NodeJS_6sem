const { AuditoriumType } = require('../model/auditoriumType')
const { Auditorium } = require('../model/auditorium')
const { Faculty } = require('../model/faculty')
const { Pulpit } = require('../model/pulpit')
const { Subject } = require('../model/subject')


class AuditoriumRepository {
    constructor() {}

    async get (){
        const auditoriums = await Auditorium.findAll()
        return auditoriums
    }
    async add (auditorium){
        const newAuditorium = await Auditorium.create(auditorium)
        return newAuditorium
    }
    async edit (auditorium){
        const result = await Auditorium.update(auditorium, {where: { auditorium: auditorium.auditorium }, returning: true})
        const editedAuditorium = result[1][0]
        return editedAuditorium
    }
    async delete (auditorium){
        const deletedAuditorium = await Auditorium.findOne({where: {auditorium: auditorium}})        
        await Auditorium.destroy({where: {auditorium: auditorium}})
        return deletedAuditorium
    }
}

module.exports = AuditoriumRepository

