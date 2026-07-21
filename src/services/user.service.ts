import { prismaClient } from "../../prisma/prisma";
import { User } from "@prisma/client";
import { CreateUserInput } from "../dtos/input/user.input";

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

    async createUser(data: CreateUserInput) {
        const findUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (findUser) {
            throw new Error(`User already exists with email ${data.email}`)
        }

        return prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email,
            },
        })
    }
}