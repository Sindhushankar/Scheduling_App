"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scheduler_1 = require("./scheduler");
function demoAPI() {
    const api = new scheduler_1.SchedulerAPI();
    console.log('----------Api Instanciated-----------');
    // Creating few Persons
    api.createPerson('Sindhu Simha', 'sindhu@mail.com');
    api.createPerson('Reshma Rao', 'reshma@mail.com');
    api.createPerson('Shashank Kumar', 'shashank@mail.com');
    console.log('Created Few Persons--------------');
    // Creating meeting invite for next day at 9:00 AM;
    const m1TimeSlot = new Date();
    m1TimeSlot.setDate(m1TimeSlot.getDate() + 1);
    m1TimeSlot.setHours(11, 0, 0, 0);
    const meeting1 = api.createMeeting(['sindhu@mail.com', 'reshma@mail.com'], m1TimeSlot);
    console.log(`Created meeting ${meeting1} for Sindhu and Reshma at ${m1TimeSlot.toLocaleString()}`);
    // Creating meeting invite after two days at 11:00 AM;
    const m2TimeSlot = new Date();
    m2TimeSlot.setDate(m2TimeSlot.getDate() + 2);
    m2TimeSlot.setHours(14, 0, 0, 0);
    const meeting2 = api.createMeeting(['sindhu@mail.com', 'shashank@mail.com'], m2TimeSlot);
    console.log(`Created meeting ${meeting2} for Sindhu and Reshma at ${m2TimeSlot.toLocaleString()}`);
    console.log('-------------------------------------------------------');
    // Show Sindhu's Schedule
    const sindhuSchedule = api.getUpcomingSchedule('sindhu@mail.com');
    console.log(`Upcoming Meetings for Sindhu : ${sindhuSchedule.length}`);
    sindhuSchedule.forEach((meeting) => {
        console.log(`${meeting.startTime.toLocaleString()} with ${meeting.members.join(', ')}`);
    });
    console.log('-------------------------------------------------------');
    // Show Shashank's Schedule
    const shashankSchedule = api.getUpcomingSchedule('sindhu@mail.com');
    console.log(`Upcoming Meetings for Shashank : ${shashankSchedule.length}`);
    shashankSchedule.forEach((meeting) => {
        console.log(`${meeting.startTime.toLocaleString()} with ${meeting.members.join(', ')}`);
    });
    console.log('-------------------------------------------------------');
    //Fetch Available slots for all of the above persons for a day from now
    const from = new Date();
    const to = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
    const suggestions = api.suggestTimeSlots(['sindhu@mail.com', 'reshma@mail.com', 'shashank@mail.com'], from, to);
    console.log('Available time slots for all the three persons are for a day : ');
    suggestions.forEach(slot => {
        console.log(`${slot.startTime.toLocaleString()} - ${slot.endTime.toLocaleString()}`);
    });
    // Edge Cases
    console.log('-----------------Testing Error Cases ---------------------');
    try {
        api.createPerson('Duplicate', 'reshma@mail.com');
    }
    catch (err) {
        console.log('Error Message From the Code', err.message);
    }
    try {
        let invalidTime = new Date();
        invalidTime.setMinutes(30);
        api.createMeeting(['sindhu@mail.com'], invalidTime);
    }
    catch (err) {
        console.log('Error Message from the code : ', err.message);
    }
    console.log('------------ All test cases executed -----------');
}
demoAPI();
