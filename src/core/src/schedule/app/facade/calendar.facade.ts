import { PaginationOutputDto } from '#shared/app/dto/pagination-output.dto';
import { SearchInputDto } from '#shared/app/dto/search-input.dto';
import {
  CreateCalendarInput,
  CalendarOutput,
  UpdateCalendarInput,
} from '../dto';
import {
  GetCalendarUseCase,
  SearchCalendarUseCase,
  CreateCalendarUseCase,
  UpdateCalendarUseCase,
  DeleteCalendarUseCase,
} from '../use-cases';

export interface CalendarFacadeProps {
  getCalendar: GetCalendarUseCase;
  searchCalendar: SearchCalendarUseCase;
  createCalendar: CreateCalendarUseCase;
  updateCalendar: UpdateCalendarUseCase;
  deleteCalendar: DeleteCalendarUseCase;
}

export class CalendarFacade {
  private _getCalendar: GetCalendarUseCase;
  private _searchCalendar: SearchCalendarUseCase;
  private _createCalendar: CreateCalendarUseCase;
  private _updateCalendar: UpdateCalendarUseCase;
  private _deleteCalendar: DeleteCalendarUseCase;

  constructor(readonly props: CalendarFacadeProps) {
    this._getCalendar = props.getCalendar;
    this._searchCalendar = props.searchCalendar;
    this._createCalendar = props.createCalendar;
    this._updateCalendar = props.updateCalendar;
    this._deleteCalendar = props.deleteCalendar;
  }
  async getCalendar(input: { id: string }): Promise<CalendarOutput> {
    return this._getCalendar.execute(input);
  }
  async searchCalendar(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<CalendarOutput>> {
    return this._searchCalendar.execute(input);
  }
  async createCalendar(input: CreateCalendarInput): Promise<CalendarOutput> {
    return this._createCalendar.execute(input);
  }
  async updateCalendar(input: UpdateCalendarInput): Promise<CalendarOutput> {
    return this._updateCalendar.execute(input);
  }
  async deleteCalendar(input: { id: string }): Promise<void> {
    return this._deleteCalendar.execute(input);
  }
}
