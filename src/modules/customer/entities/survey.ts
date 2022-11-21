export interface SurveyProps {
  question: string
  answer: string
  customerId: string
}

export class Survey {
  props: SurveyProps

  constructor (props: SurveyProps) {
    this.props = props
  }
}
