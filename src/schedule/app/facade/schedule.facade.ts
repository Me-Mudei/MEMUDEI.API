import { ScheduleVisitInput, ScheduleVisitOutput } from "../dto";
import { ScheduleVisitUseCase } from "../use-cases";

export interface ScheduleFacadeProps {
  scheduleVisit: ScheduleVisitUseCase;
}

export class ScheduleFacade {
  private _scheduleVisit: ScheduleVisitUseCase;

  constructor(readonly props: ScheduleFacadeProps) {
    this._scheduleVisit = props.scheduleVisit;
  }
  async scheduleVisit(input: ScheduleVisitInput): Promise<ScheduleVisitOutput> {
    return this._scheduleVisit.execute(input);
  }
}
