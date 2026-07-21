import { ExpressContextFunctionArgument } from "@as-integrations/express5"
import { JwtPayload, verifyJwt } from "../../utils/jwt"



export type GraphQLContext = {
    user: string | undefined
    token: string | undefined
    req: ExpressContextFunctionArgument["req"]
    res: ExpressContextFunctionArgument["res"]
}

export const buildContext = async ({
    req,
    res
}: ExpressContextFunctionArgument): Promise<GraphQLContext> => {

    const authHeader = req.headers.authorization
    let user: string | undefined
    let token: string | undefined = undefined
    if (authHeader) {
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring('Bearer '.length)
            try {
                const decodedToken = verifyJwt(token) as JwtPayload
                user = decodedToken.id
            } catch (error) {
                console.error('Error decoding token:', error)
            }
        }
    }

    return {
        user,
        token,
        req,
        res
    }

}