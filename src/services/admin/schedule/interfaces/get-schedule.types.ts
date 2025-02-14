export interface IGetScheduleResponse {
  schedule: Schedule;
}

export interface Schedule {
  id: string; 
  day: string;
  start_time: string;
  end_time: string;
  specific_date: string;
  information: string;
  is_active: boolean;
}
