import { expect, test, describe, beforeEach } from "vitest";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { makeQuestion } from "@/test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  test("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("title-slug-test"),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "title-slug-test",
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toEqual(newQuestion.title);
  });
});
