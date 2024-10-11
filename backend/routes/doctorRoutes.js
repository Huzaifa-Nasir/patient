const express = require('express');
const controller = require('../controller/doctorController')
const authMiddleware = require('../middleware/authMiddleWare')

const router = express.Router();


router.use(authMiddleware);
router.get('/displayDoc', controller.displayDoctors)
router.post('/addDoc', controller.addDoctor)

router.patch('/update_doctor/:id', controller.updateDoctors)
router.delete('/deleteDoc/:id', controller.deleteDoctor)




module.exports = router