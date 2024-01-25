const { db: connection } = require('./../configs/db')

/** <---- Query Transactional Methods ----> */
const beginTransactions = () => connection.beginTransaction()
const commitTransactions = () => connection.commit()
const rollBackTransactions = () => connection.rollback()

/** <------ Promise Query -------> */
const PromiseQuery = async ({ query, values }) => {
  return await new Promise((ressolve, reject) => {
    try {
      connection.query(query, values, (err, res) => {
        if (err) return reject(err)
        ressolve(res)
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  PromiseQuery,
  beginTransactions,
  commitTransactions,
  rollBackTransactions,
}
