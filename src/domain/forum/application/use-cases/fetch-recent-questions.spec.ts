import { expect, test, describe, beforeEach } from "vitest";
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { makeQuestion } from "@/test/factories/make-question";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Get Recent Questions", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  test("should be able to fetch recent questions", async () => {
    const question1 = makeQuestion({
      createdAt: new Date(2024, 0, 23),
    });

    const question2 = makeQuestion({
      createdAt: new Date(2024, 0, 20),
    });

    const question3 = makeQuestion({
      createdAt: new Date(2024, 0, 18),
    });

    await inMemoryQuestionsRepository.create(question1);
    await inMemoryQuestionsRepository.create(question2);
    await inMemoryQuestionsRepository.create(question3);

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: question1.createdAt }),
      expect.objectContaining({ createdAt: question2.createdAt }),
      expect.objectContaining({ createdAt: question3.createdAt }),
    ]);
  });

  test("should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion({}));
    }

    const { questions } = await sut.execute({
      page: 2,
    });

    expect(questions).toHaveLength(2);
  });
});
