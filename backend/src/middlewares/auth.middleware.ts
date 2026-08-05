import { GraphQLContext } from "../graphql/context";
import { MiddlewareFn } from "type-graphql";

export const IsAuth: MiddlewareFn<GraphQLContext> = async ({ context }, next) => {
    if (!context.user) {
        throw new Error("You are not authorized to perform this action")
    }

    return next()
}