const express = require('express')
const router = express.Router()

const ContractController = require('../../controllers/v1/contract.controller')
const AuthMiddleware = require('../../middlewares/authMiddleware')
const TrackMiddleware = require('../../middlewares/trackMiddleware')

router.get('/:idOrigin', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ContractController.getContracts)
router.get('/:contractId/html', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ContractController.getByContractId)
router.put('/:contractId', TrackMiddleware.tracking, AuthMiddleware.isAuthenticated, ContractController.accepted)

module.exports = router
