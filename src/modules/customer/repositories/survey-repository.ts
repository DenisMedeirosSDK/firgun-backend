import { Survey, SurveyProps } from '../entities/survey'

export interface SurveyRepository {
  create(props: Survey): Promise<void>
  list(customerId: string): Promise<SurveyProps[]>
}
