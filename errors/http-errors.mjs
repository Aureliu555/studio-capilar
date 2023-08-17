const ERRORS_MAPPER = {
    notFound: 404,
    notAuthorized: 401,
    invalidPassword: 400
}

const CODE_DESCRIPTION_MAPPER = {
    400: 'BAD REQUEST',
    401: 'UNAUTHORIZED',
    404: 'NOT FOUND'
}

const DEFAULT_ERROR = {
    code: 500, 
    description: 'SERVER ERROR',
    message: `An internal error occurred. Contact your system administrator`
}

export function convertToHttpError(error) {
    const code = ERRORS_MAPPER[error.desc]
    return code ? { code: code, description: CODE_DESCRIPTION_MAPPER[code], message: error.message } : DEFAULT_ERROR
}