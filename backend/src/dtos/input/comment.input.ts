import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCommentInput {
    @Field(() => String)
    content!: string

    @Field(() => String)
    ideaId!: string
}
