import { prismaClient } from "../../prisma/prisma";
import { User } from "@prisma/client";

export class UserService {
    async findUser(id: string): Promise<User> {
        const user = await prismaClient.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            throw new Error(`User not found with id ${id}`)
        }

        return user
    }
}