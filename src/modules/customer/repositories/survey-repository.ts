import { Survey } from '../entities/survey'

export interface SurveyRepository {
  create(props: Survey): Promise<void>
}
