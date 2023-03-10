exports.myDateTime = function () {
    var d = new Date().toISOString().substring(0,16);
    return d;
}

exports.myName = function () {
    return "RP"
}

exports.turma = "EngWeb2023::TP1"

exports.logger = function (req) {
    console.log(`[${exports.myDateTime()}] ${req.method} ${req.url}`)
}