import { PaginationOutputDto } from '#shared/app/dto/pagination-output.dto';
import { SearchInputDto } from '#shared/app/dto/search-input.dto';
import {
  CreateScheduleInput,
  ScheduleOutput,
  UpdateScheduleInput,
} from '../dto';
import { ScheduleCreatedSendConfirmationHandler } from '../handlers';
import {
  GetScheduleUseCase,
  SearchScheduleUseCase,
  CreateScheduleUseCase,
  UpdateScheduleUseCase,
  DeleteScheduleUseCase,
} from '../use-cases';

export interface ScheduleFacadeProps {
  getSchedule: GetScheduleUseCase;
  searchSchedule: SearchScheduleUseCase;
  createSchedule: CreateScheduleUseCase;
  updateSchedule: UpdateScheduleUseCase;
  deleteSchedule: DeleteScheduleUseCase;
}

export class ScheduleFacade {
  private _getSchedule: GetScheduleUseCase;
  private _searchSchedule: SearchScheduleUseCase;
  private _createSchedule: CreateScheduleUseCase;
  private _updateSchedule: UpdateScheduleUseCase;
  private _deleteSchedule: DeleteScheduleUseCase;

  constructor(readonly props: ScheduleFacadeProps) {
    this._getSchedule = props.getSchedule;
    this._searchSchedule = props.searchSchedule;
    this._createSchedule = props.createSchedule;
    this._updateSchedule = props.updateSchedule;
    this._deleteSchedule = props.deleteSchedule;
  }
  async getSchedule(input: { id: string }): Promise<ScheduleOutput> {
    return this._getSchedule.execute(input);
  }
  async searchSchedule(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<ScheduleOutput>> {
    return this._searchSchedule.execute(input);
  }
  async createSchedule(input: CreateScheduleInput): Promise<ScheduleOutput> {
    this._createSchedule.broker.register(
      new ScheduleCreatedSendConfirmationHandler(),
    );
    return this._createSchedule.execute(input);
  }
  async updateSchedule(input: UpdateScheduleInput): Promise<ScheduleOutput> {
    return this._updateSchedule.execute(input);
  }
  async deleteSchedule(input: { id: string }): Promise<void> {
    return this._deleteSchedule.execute(input);
  }
}
