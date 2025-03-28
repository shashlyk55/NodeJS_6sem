const { AuditoriumType } = require('../model/auditoriumType')
const { Auditorium } = require('../model/auditorium')
const { Faculty } = require('../model/faculty')
const { Pulpit } = require('../model/pulpit')
const { Subject } = require('../model/subject')


class AuditoriumTypeRepository {
    constructor() {}

    async get (){
        const auditoriumTypes = await AuditoriumType.findAll()
        return auditoriumTypes
    }
    async add (auditoriumType){
        const newAuditoriumType = await AuditoriumType.create(auditoriumType)
        return newAuditoriumType
    }
    async edit (auditoriumType){
        const result = await AuditoriumType.update(auditoriumType, {where: { auditorium_type: auditoriumType.auditorium_type }, returning: true})
        const editedAuditoriumType = result[1][0]
        return editedAuditoriumType
    }
    async delete (auditoriumType){
        const deletedAuditoriumType = await AuditoriumType.findOne({where: {auditorium_type: auditoriumType}})
        await AuditoriumType.destroy({where: {auditorium_type: auditoriumType}})
        return deletedAuditoriumType
    }
}

module.exports = AuditoriumTypeRepository

