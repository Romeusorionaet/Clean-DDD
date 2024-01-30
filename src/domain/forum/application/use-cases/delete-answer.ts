import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Question not found.");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed");
    }

    await this.answersRepository.delete(answer);
  }
}
