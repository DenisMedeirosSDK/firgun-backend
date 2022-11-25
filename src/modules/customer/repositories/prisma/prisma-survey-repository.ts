import { prisma } from '../../../../shared/utils/prisma'
import { Survey, SurveyProps } from '../../entities/survey'
import { SurveyRepository } from '../survey-repository'

export class PrismaSurveyRepository implements SurveyRepository {
  async create ({ props }: Survey): Promise<void> {
    await prisma.survey.create({
      data: {
        question: props.question,
        answer: props.answer,
        customerId: props.customerId
      }
    })
  }

  async list (customerId: string): Promise<SurveyProps[]> {
    throw new Error('Method not implemented.')
  }
}
