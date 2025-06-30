"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scheduler_1 = require("./scheduler");
function main() {
    const api = new scheduler_1.SchedulerAPI();
    console.log('----------Api Instanciated-----------');
    api.createPerson('Sindhu Simha', 'sindhu@mail.com');
    api.createPerson('Reshma Rao', 'reshma@mail.com');
    api.createPerson('Shashank Kumar', 'shashank@mail.com');
    // Creating meeting invite for next day at 9:00 AM;
    const m1TimeSlot = new Date();
    m1TimeSlot.setDate(m1TimeSlot.getDate() + 1);
    m1TimeSlot.setHours(9, 0, 0, 0);
    const meeting1 = api.createMeeting(['sindhu@mail.com', 'reshma@mail.com'], m1TimeSlot);
    // Creating meeting invite after two days at 11:00 AM;
    const m2TimeSlot = new Date();
    m2TimeSlot.setDate(m2TimeSlot.getDate() + 1);
    m2TimeSlot.setHours(11, 0, 0, 0);
    const meeting2 = api.createMeeting(['sindhu@mail.com', 'shashank@mail.com'], m2TimeSlot);
    console.log(`Created meeting ${meeting1} for Sindhu and Reshma at ${m1TimeSlot.toLocaleString()}`);
    // Show Sindhu's Schedule
    const schedule = api.getUpcomingSchedule('sindhu@mail.com');
    console.log(`Upcoming Meetings for Sindhu : ${schedule.length}`);
    schedule.forEach((meeting) => {
        console.log(`${meeting.startTime.toLocaleString()} with ${meeting.members.join(', ')}`);
    });
    //Fetch Available slots for all of the above persons for a day from now
    const from = new Date();
    const to = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
    const suggestions = api.suggestTimeSlots(['sindhu@mail.com', 'reshma@mail.com', 'shashank@mail.com'], from, to);
    console.log('Available time slots for all the three persons are : ');
    suggestions.forEach(slot => {
        console.log(`${slot.startTime.toLocaleString()} - ${slot.endTime.toLocaleString()}`);
    });
}
main();
