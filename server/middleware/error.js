const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (error,req,res,next) =>{
    let err = {...error}
    err.message =error.message

    if(err.code == 11000){
        const mess = `Duplicate Field Value Enter`
        err = new ErrorResponse(mess,400)
    }

    if(err.message == "ValidationError"){
        const mess = Object.values(error.errors).map((val)=> val.message)
        err = new ErrorResponse(mess,400)
    }
    res.status(err.statusCode||500).json({
        success:false,
        error:err.message || "Server Error"
    })
}
module.exports = errorHandler;