import { expect, test, describe, beforeEach } from "vitest";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeAnswerComment } from "@/test/factories/make-answer-comment";
import { InMemoryAnswerCommentsRepository } from "@/test/repositories/in-memory-answer-comment-repository";
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe("Fetch Answer Comments ", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  test("should be able to fetch answer comments", async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID("answer-1"),
      }),
    );

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID("answer-1"),
      }),
    );

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID("answer-1"),
      }),
    );

    const result = await sut.execute({
      answerId: "answer-1",
      page: 1,
    });

    expect(result.value?.answerComments).toHaveLength(3);
  });

  test("should be able to fetch paginated answers comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID("answer-1") }),
      );
    }

    const result = await sut.execute({
      answerId: "answer-1",
      page: 2,
    });

    expect(result.value?.answerComments).toHaveLength(2);
  });
});
