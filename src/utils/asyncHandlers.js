import { errorLog } from "./logMessage"

const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((error) => next(error))
    }
}

export { asyncHandler }

// const asyncHandler = (requestHandler) = async (req, res, next) => {
//     try {
//         await requestHandler(req, res, next)
//     } catch (error) {
//         res.status(errpr.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }