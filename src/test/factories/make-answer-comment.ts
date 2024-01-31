import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerProps } from "@/domain/forum/enterprise/entities/answer";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export function makeAnswerComment(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID,
) {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return answerComment;
}
