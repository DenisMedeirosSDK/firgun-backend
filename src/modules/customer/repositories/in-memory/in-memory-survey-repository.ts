import { Survey, SurveyProps } from '../../entities/survey'
import { SurveyRepository } from '../survey-repository'

export class InMemorySurveyRepository implements SurveyRepository {
  surveys: SurveyProps[] = []
  async create ({ props }: Survey): Promise<void> {
    this.surveys.push(props)
  }
}
