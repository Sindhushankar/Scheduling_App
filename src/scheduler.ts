import { Meeting, Person, TimeSlot } from "./interface";
import {v4 as uuid} from 'uuid';

export class SchedulerAPI {
    private persons = new Map<string, Person>();
    private meetings = new Map<string, Meeting>();

    createPerson(name : string, email : string){
        if(this.persons.has(email)){
            throw new Error(`Person with ${email} already exists!`);
        }
        this.persons.set(email, {name, email});
    }

    createMeeting(members : string[], startTime : Date) : string{
        if(startTime.getMinutes() !== 0 || startTime.getSeconds() !== 0){
            throw new Error('Meeting can start only at the hour mark');
        }

        for(let email of members){
            if(!this.persons.has(email)){
                throw new Error(`Person with ${email} not found!`);
            }

            if(this.checkForConflicts(email, startTime)){
                throw new Error(`Person ${email} has a conflict at this time!`);
            }
        }

        const id = uuid();
        this.meetings.set(id, {id, members, startTime});
        return id;
    }

    getUpcomingSchedule(email :string) : Meeting[]{
        if(!this.persons.has(email)){
            throw new Error(`Person with ${email} doesn't exists!`);
        }
        const curTime = new Date();
        return Array.from(this.meetings.values()).filter((meeting) => {
            return meeting.members.includes(email) && meeting.startTime >= curTime
        }).sort((a,b) => a.startTime.getTime() - b.startTime.getTime());
    }
    

    suggestTimeSlots(groupMembers : string[], from  : Date, to : Date) : TimeSlot[] {
        for(let email of groupMembers){
            if(!this.persons.has(email)){
                throw new Error(`Person with ${email} not found!`);
            }
        }

        const suggestions : TimeSlot[] = [];
        const currTime = new Date();

        for(let d = new Date(from); d < to ; d.setHours(d.getHours() + 1)){
            if(d <= currTime) continue;

            const hourStart = new Date(d);
            hourStart.setMinutes(0,0,0);

            if(this.isTimeSlotAvailable(groupMembers, hourStart)){
                suggestions.push({
                    startTime : new Date(hourStart),
                    endTime : new Date(hourStart.getTime() + 60*60*1000)
                });
            }
        }

        return suggestions;
    }

  
    checkForConflicts(email : string, startTime : Date){
        return Array.from(this.meetings.values()).find((meeting) => {
            return meeting.members.indexOf(email) >= 0 && meeting.startTime.getTime() === startTime.getTime();
        });
    }

    isTimeSlotAvailable(groupMembers : string[], hourStart : Date){
        return groupMembers.every(email => !this.checkForConflicts(email, hourStart));
    }

}