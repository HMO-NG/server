import Exception from "../util/exception.js";

const exceptionMiddleware = (error, req, res, next) => {
    if (error instanceof Exception) {
        res.status(error.status)
            .json({ message: error.message,
                name: error.name,
                path: req.path })
        return
    }
    res.status(500).json({ message:error.message });
}

export default exceptionMiddleware;