const _ = require('lodash')
const BillingCycle = require('../billingCycle/billingCycle')

// Funçao Middleware para pagamento
function getSummary(req, res) {
  BillingCycle.aggregate({
    $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value"}}
  })
}
