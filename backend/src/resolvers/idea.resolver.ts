import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware, Int } from "type-graphql";
import { IdeaModel } from "../models/idea.model";
import { IdeaService } from "../services/idea.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { VoteModel } from "../models/vote.model";
import { VoteService } from "../services/vote.service";

@Resolver(() => IdeaModel)
@UseMiddleware(IsAuth)
export class IdeaResolver {

    private ideaService = new IdeaService()
    private userService = new UserService()
    private voteService = new VoteService()

    @Mutation(() => IdeaModel)
    async createIdea(
        @Arg('data', () => CreateIdeaInput) data: CreateIdeaInput,
        @GqlUser() user: User
    ): Promise<IdeaModel> {
        return this.ideaService.createIdea(data, user.id)
    }

    @Mutation(() => IdeaModel)
    async updateIdea(
        @Arg('data', () => UpdateIdeaInput) data: UpdateIdeaInput,
        @Arg('id', () => String) id: string,
        @GqlUser() user: User
    ): Promise<IdeaModel> {
        return this.ideaService.updateIdea(id, data)
    }

    @Mutation(() => Boolean)
    async deleteIdea(
        @Arg('id', () => String) id: string,
        @GqlUser() user: User
    ): Promise<boolean> {
        await this.ideaService.deleteIdea(id)
        return true
    }

    @Query(() => [IdeaModel])
    async getAllIdeas(): Promise<IdeaModel[]> {
        return this.ideaService.getAllIdeas()
    }

    @FieldResolver(() => UserModel)
    async author(
        @Root() idea: IdeaModel
    ): Promise<UserModel> {
        return this.userService.findUser(idea.authorId)
    }

    @FieldResolver(() => [VoteModel])
    async votes(
        @Root() idea: IdeaModel
    ): Promise<VoteModel[]> {
        return this.voteService.listVotesByIdea(idea.id)
    }

    @FieldResolver(() => Int)
    async countVotes(
        @Root() idea: IdeaModel
    ): Promise<number> {
        return this.voteService.countVotes(idea.id)
    }
}