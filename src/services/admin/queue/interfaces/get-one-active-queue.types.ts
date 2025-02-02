export interface IGetOneActiveQueueResponse {
  queue_number_now: string;
  appointment: Queue;
}

export interface Queue {
    id: string;
    queue_number: string;
    queue_date: string;
    description: string;
    status: string;
    patient: Patient;
}

export interface Patient {
    id: string;
    name: string;
}