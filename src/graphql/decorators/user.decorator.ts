import { createParameterDecorator, ResolverData } from "type-graphql"
import { UserModel } from "../../models/user.model"
import { prismaClient } from "../../../prisma/prisma"
import { GraphQLContext } from "../context"

export const GqlUser = () => {
    return createParameterDecorator(
        async ({ context }: ResolverData<GraphQLContext>): Promise<UserModel | null> => {
            if (!context || !context.user) return null

            try {
                const user = await prismaClient.user.findUnique({
                    where: {
                        id: context.user,
                    },
                })
                if (!user) throw new Error('User not found')
                return user
            } catch (error) {
                console.log('Error on gqluser instance')
                throw error
            }
        }
    )
}