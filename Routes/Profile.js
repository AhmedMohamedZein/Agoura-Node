const express = require('express')
const router = express().Router
const path = require('path')


router.get('/:id' , getUserProfile)
router.put('/:id' , updateUserProfile)


module.exports = router