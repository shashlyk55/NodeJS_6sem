const { AuditoriumType } = require('../model/auditoriumType')
const { Auditorium } = require('../model/auditorium')
const { Faculty } = require('../model/faculty')
const { Pulpit } = require('../model/pulpit')
const { Subject } = require('../model/subject')


class PulpitRepository {
    constructor() {}

    async get (){
        const pulpits = await Pulpit.findAll()
        return pulpits
    }
    async add (pulpit){
        const newPulpit = await Pulpit.create(pulpit)
        return newPulpit
    }
    async edit (pulpit){
        const result = await Pulpit.update(pulpit, {where: {pulpit: pulpit.pulpit}, returning: true})
        const editedPulpit = result[1][0]
        return editedPulpit
    }
    async delete (pulpit){
        const deletedPulpit = await Pulpit.findOne({where: {pulpit: pulpit}})
        await Pulpit.destroy({where: {pulpit: pulpit}})
        return deletedPulpit
    }
}

module.exports = PulpitRepository

