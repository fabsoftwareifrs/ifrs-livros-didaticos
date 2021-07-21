const late = ({ end, Period }) => (end ? false : new Date(Period.end) < new Date())

const delivered = ({ end }) => !!end

const student = ({ Student }) => Student

const copy = ({ Copy }) => Copy

const period = ({ Period }) => Period
module.exports = { late, delivered, student, copy, period }
