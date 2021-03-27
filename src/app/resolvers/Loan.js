const late = ({ end, period }) => (end ? false : period.end < new Date())

const delivered = ({ end }) => !!end
module.exports = { late, delivered }
