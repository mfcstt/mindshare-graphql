import { Arg, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { CommentModel } from "../models/comment.model";
import { CommentService } from "../services/comment.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { CreateCommentInput } from "../dtos/input/comment.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { IdeaModel } from "../models/idea.model";
import { IdeaService } from "../services/idea.service";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver(() => CommentModel)
@UseMiddleware(IsAuth)
export class CommentResolver {

    private commentService = new CommentService()
    private ideaService = new IdeaService()
    private userService = new UserService()

    @Mutation(() => CommentModel)
    async createComment(
        @Arg('data', () => CreateCommentInput) data: CreateCommentInput,
        @GqlUser() user: User
    ): Promise<CommentModel> {
        return this.commentService.create(data, user.id)
    }

    @FieldResolver(() => IdeaModel)
    async idea(
        @Root() comment: CommentModel
    ): Promise<IdeaModel> {
        return this.ideaService.findById(comment.ideaId)
    }

    @FieldResolver(() => UserModel)
    async author(
        @Root() comment: CommentModel
    ): Promise<UserModel> {
        return this.userService.findUser(comment.authorId)
    }
}

