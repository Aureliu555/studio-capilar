const ERRORS_MAPPER = {
    invalidGroupId: 400,
    invalidRange: 400,
    invalidMovieName: 400,
    invalidGroupInfo: 400,
    invalidMovieId: 400,
    notFound: 404,
    notAuthorized: 401
}

const DEFAULT_ERROR = {
    status: 500, 
    body:  {
        description: `An internal error occurred. Contact your system administrator`
    } 
}

export function convertToHttpError(error) {
    const status = ERRORS_MAPPER[error.desc]
    return status ?  
        {
            status: status, 
            body:  {
                description: error.error
            } 
        } 
        : DEFAULT_ERROR
}