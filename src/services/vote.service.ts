import { prismaClient } from "../../prisma/prisma";

export class VoteService {

    async toggleVote(ideaId: string, userId: string): Promise<boolean> {
        const existingVote = await prismaClient.vote.findUnique({
            where: {
                userId_ideaId: {
                    userId,
                    ideaId
                }
            }
        });

        if (existingVote) {
            await prismaClient.vote.delete({
                where: {
                    id: existingVote.id
                }
            });
            return false;
        }

        await prismaClient.vote.create({
            data: {
                ideaId,
                userId
            }
        });
        return true;
    }

    async listVotesByIdea(ideaId: string) {
        return prismaClient.vote.findMany({
            where: {
                ideaId
            }
        });
    }

    async countVotes(ideaId: string) {
        return prismaClient.vote.count({
            where: {
                ideaId
            }
        });
    }

}
