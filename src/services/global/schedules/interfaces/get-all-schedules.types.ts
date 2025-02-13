export interface IGetAllScheduleResponse {
  schedules: Schedules[];
}

export interface Schedules {
    day: string;
    start_time: string;
    end_time: string;
    specific_date: string;
    information: string;
    is_active: string;
}