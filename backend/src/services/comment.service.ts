import { prismaClient } from "../../prisma/prisma";
import { CreateCommentInput } from "../dtos/input/comment.input";

export class CommentService {
    async create(data: CreateCommentInput, authorId: string) {
        return prismaClient.comment.create({
            data: {
                content: data.content,
                ideaId: data.ideaId,
                authorId: authorId
            }
        })
    }

    async findById(ideaId: string) {
        return prismaClient.comment.findMany({
            where: {
                ideaId
            }
        })
    }
}
