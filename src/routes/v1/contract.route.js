const express = require('express')
const router = express.Router()
const contractController = require('../../controllers/v1/contract.controller')
const authMiddleware = require('../../middlewares/authMiddleware')
const trackMiddleware = require('../../middlewares/trackMiddleware')
const errorHandler = require('../../middlewares/errorHandler')

module.exports = ({ ContractController, AuthMiddleware, TrackMiddleware, ResponseMiddleware }) => {
  router.get('/', TrackMiddleware.tracking('CONTRACT_LIST'), AuthMiddleware.isAuthenticated, ContractController.getContracts, ResponseMiddleware.Handler)
  router.get('/:contractId', trackMiddleware.tracking, authMiddleware.isAuthenticated, contractController.getByContractId, errorHandler)
  router.put('/:contractId', TrackMiddleware.tracking('CONTRACT_ACCEPT'), AuthMiddleware.isAuthenticated, ContractController.accepted, ResponseMiddleware.Handler)

  return router
}
