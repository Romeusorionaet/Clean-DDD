import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Either, right } from "@/core/either";

interface CreateQuestionsUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionsUseCaseResponse = Either<null, { question: Question }>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionsUseCaseRequest): Promise<CreateQuestionsUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      content,
      title,
    });

    await this.questionsRepository.create(question);

    return right({ question });
  }
}
