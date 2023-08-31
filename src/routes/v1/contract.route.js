const express = require('express')
const router = express.Router()

module.exports = ({ ContractController, AuthMiddleware, TrackMiddleware, ResponseMiddleware }) => {
  router.get('/', TrackMiddleware.tracking('CONTRACT_LIST'), AuthMiddleware.isAuthenticated, ContractController.getContracts, ResponseMiddleware.Handler)
  router.get('/:contractId', TrackMiddleware.tracking('CONTRACT_DETAIL'), AuthMiddleware.isAuthenticated, ContractController.getByContractId, ResponseMiddleware.Handler)
  router.put('/:contractId', TrackMiddleware.tracking('CONTRACT_ACCEPT'), AuthMiddleware.isAuthenticated, ContractController.accepted, ResponseMiddleware.Handler)

  return router
}
