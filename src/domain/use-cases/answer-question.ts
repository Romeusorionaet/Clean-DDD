import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionsUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string;
}

export class AnswerQuestionUseCase {
    constructor(private answersRepository: AnswersRepository,) {}

    async execute({instructorId, questionId, content,}: AnswerQuestionsUseCaseRequest){
        const answer = Answer.create({
            authorId: new UniqueEntityID(instructorId), 
            questionId: new UniqueEntityID(questionId),
            content, 
        })

        await this.answersRepository.create(answer)

        return answer
    }
}

