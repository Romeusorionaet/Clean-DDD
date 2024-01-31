import { expect, test, describe, beforeEach } from "vitest";
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { makeQuestion } from "@/test/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment on Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    );
  });

  test("should be able to comment on question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: "Comentário teste",
    });

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      "Comentário teste",
    );
  });
});
