import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import { prismaClient } from "../../prisma/prisma";
import { comparePassword, hashPassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";
import { User } from "@prisma/client";

export class AuthService {

    async login(data: LoginInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (!existingUser) {
            throw new Error("User not found")
        }

        const validPassword = await comparePassword(data.password, existingUser.password)

        if (!validPassword) {
            throw new Error("Invalid password")
        }

        return this.generateTokens(existingUser)
    }


    async signup(data: RegisterInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (existingUser) {
            throw new Error("User already exists")
        }

        const hashedPassword = await hashPassword(data.password)

        const user = await prismaClient.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
            }
        })

        return this.generateTokens(user)
    }


    generateTokens(user: User) {
        const token = signJwt({
            id: user.id,
            email: user.email
        }, '15m'
        )
        const refreshToken = signJwt({
            id: user.id,
            email: user.email
        }, '7d'
        )
        return {
            token,
            refreshToken,
            user
        }
    }
}
