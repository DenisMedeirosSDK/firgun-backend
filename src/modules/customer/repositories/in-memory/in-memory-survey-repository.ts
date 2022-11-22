import { Survey, SurveyProps } from '../../entities/survey'
import { SurveyRepository } from '../survey-repository'

export class InMemorySurveyRepository implements SurveyRepository {
  surveys: SurveyProps[] = []
  async list (customerId: string): Promise<SurveyProps[]> {
    const existSurvey = this.surveys.filter(survey => survey.customerId === customerId)

    return existSurvey
  }

  async create ({ props }: Survey): Promise<void> {
    this.surveys.push(props)
  }
}
