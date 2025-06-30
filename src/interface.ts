export interface Person {
    name : string;
    email : string;
}

export interface Meeting {
    id : string;
    members : string[];
    startTime : Date;
}

export interface TimeSlot {
    startTime : Date;
    endTime : Date;
}