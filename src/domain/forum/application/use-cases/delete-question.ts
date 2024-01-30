import { QuestionsRepository } from "../repositories/questions-repository";

interface DeleteQuestionsUseCaseRequest {
  authorId: string;
  questionId: string;
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionsUseCaseRequest): Promise<void> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed");
    }

    await this.questionsRepository.delete(question);
  }
}
