import { expect, test, describe, beforeEach } from "vitest";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "@/test/repositories/in-memory-answer-comment-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-component";
import { makeAnswerComment } from "@/test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer Comment+", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  test("should be able to delete a answer comment", async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  test("should not be able to delete another user answer comment", async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID("author-1"),
    });

    await inMemoryAnswerCommentsRepository.create(answerComment);

    expect(() => {
      return sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: "author-2",
      });
    }).rejects.toBeInstanceOf(Error);

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1);
  });
});
