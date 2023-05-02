var express = require('express');
var router = express.Router();
var Exames = require('../controllers/exames')

/* GET home page. */
router.get('/emd', function (req, res) {
  q = res.query
  if (q === {}){
    Exames.listExames()
      .then(dados => res.status(200).json(dados))
      .catch(erro => res.status(520).json({ erro: erro, mensagem: "Não consegui obter a lista de pessoas." }))

  }
})

router.get('/emd/:id', (req, res) => {
  Exames.getExame(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({ erro: erro, mensagem: "Não consegui obter a pessoa." }))
})

router.get('/modalidades', function (req, res) {
  Exames.listModalidades()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({ erro: erro, mensagem: "Não consegui obter a lista de pessoas." }))
})


// router.post('/pessoas/', (req, res) => {
//   Exames.addPessoa(req.body)
//     .then(dados => res.status(201).json(dados))
//     .catch(erro => res.status(522).json({ erro: erro, mensagem: "Não consegui inserir a pessoa." }))
// })

// router.put('/pessoas/:id', (req, res) => {
//   Exames.updatePessoa(req.body)
//     .then(dados => res.status(200).json(dados))
//     .catch(erro => res.status(523).json({ erro: erro, mensagem: "Não consegui alterar a pessoa." }))
// })

// router.delete('/pessoas/:id', (req, res) => {
//   Exames.deletePessoa(req.params.id)
//     .then(dados => res.status(200).json(dados))
//     .catch(erro => res.status(524).json({ erro: erro, mensagem: "Não consegui apagar a pessoa." }))
// })

module.exports = router;
