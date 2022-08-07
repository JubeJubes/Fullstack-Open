class customError extends Error {
    constructor(message,status){
        super(message)
        this.name = customError
        this.status=status
    }
}

module.exports = customError