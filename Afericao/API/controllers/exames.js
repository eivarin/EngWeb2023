var Exames = require('../models/exames')

// Exame list
module.exports.listExames = () => {
    return Exames
            .find()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getExame = id => {
    return Exames.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.listModalidades = () => {
    return Exames
            .distinct('modalidade')
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}
