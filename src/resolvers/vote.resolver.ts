import { Arg, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { VoteModel } from "../models/vote.model";
import { VoteService } from "../services/vote.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { IdeaModel } from "../models/idea.model";
import { IdeaService } from "../services/idea.service";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver(() => VoteModel)
@UseMiddleware(IsAuth)
export class VoteResolver {

    private voteService = new VoteService()
    private ideaService = new IdeaService()
    private userService = new UserService()

    @Mutation(() => Boolean)
    async toggleVote(
        @Arg('ideaId', () => String) ideaId: string,
        @GqlUser() user: User
    ): Promise<boolean> {
        return this.voteService.toggleVote(ideaId, user.id)
    }

    @FieldResolver(() => IdeaModel, { nullable: true })
    async idea(
        @Root() vote: VoteModel
    ): Promise<IdeaModel | null> {
        return this.ideaService.findById(vote.ideaId)
    }

    @FieldResolver(() => UserModel, { nullable: true })
    async user(
        @Root() vote: VoteModel
    ): Promise<UserModel | null> {
        return this.userService.findUser(vote.userId)
    }

}
