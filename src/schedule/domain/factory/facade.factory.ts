import { ScheduleFacade, CalendarFacade } from "../../app/facade";

export interface FacadeFactory {
  createScheduleFacade(): ScheduleFacade;
  createCalendarFacade(): CalendarFacade;
}
