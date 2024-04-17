"use server";

import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { MenteeMailConfirmation } from "./mailtemplates/menteeMailConfirmation";
import { MentorMailConfirmation } from "./mailtemplates/mentorMailConfirmation";


//For Calendar event
import ical, { ICalCalendar } from "ical-generator";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { MailArgs } from "@/types/email"
import { scheduleEmail } from "./qstash";
import { RoomCodeMentor } from "./mailtemplates/roomCodeMentor";
import { RoomCodeMentee } from "./mailtemplates/roomCodeMentee";


//Creating Calendar Object
function getIcalObjectInstance({starttime, endtime, summary, description, location, url , name ,email}:any) 
{
    const cal = ical({ name: 'My test calendar event' });
    cal.createEvent({
            start: starttime,         // eg : moment()
            end: endtime,             // eg : moment(1,'days')
            summary: summary,         // 'Summary of your event'
            description: description, // 'More description'
            location: location,       // 'Delhi'
            url: url,                 // 'event url'
            organizer: {              // 'organizer details'
                name: name,
                email: email
            },
        });
    return cal;
}

//Function for Sending mail
export async function sendMail(subject:string, toEmail:string, htmlBody:string, calendarObj?:ICalCalendar) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    console.log(`toEmail ${toEmail}`);
    var mailOptions:MailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: toEmail,
      subject: subject,
      html: htmlBody
    };

    if (calendarObj) {
        mailOptions.icalEvent ={
            filename:'invitation.ics',
            method: 'request',
            content: Buffer.from(calendarObj.toString()),
        };
        }
       
  
    transporter.sendMail(mailOptions, function (error:any, info:any) {
      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        console.log("Email Sent",info);
        return info;
      }
    });
}

//For compiling html template with inputs
function compileTemplate(menteeName:string, mentorName:string, dateTime:Date, duration:number, orderId:string, mailTemplate:string, roomCode?:string)
{
  try
  {

    const template = handlebars.compile(mailTemplate);
    const meetingDate = dateTime.toLocaleDateString();
    const meetingTime = dateTime.toLocaleTimeString();
    const meetingLocation = 'Study Sphere';
    
    const templateData: any = {
    menteeName,
    mentorName,
    meetingDate,
    meetingTime,
    duration,
    meetingLocation,
    orderId,
    };
  
    if (roomCode) {
      templateData.roomCode = roomCode;
    }
    
    const htmlBody = template(templateData);
    return htmlBody;
  }
  catch(error)
  {
    console.log(error);
    throw error;
  }
}

//For sending order confirmation mail
export async function sendConfirmationMail({menteeEmail,menteeName,mentorEmail,mentorName,orderId,dateTime,duration}:MailArgs){
  try{  
    const menteeBody = compileTemplate(menteeName, mentorName, dateTime, duration, orderId, MenteeMailConfirmation);
    const mentorBody = compileTemplate(menteeName, mentorName, dateTime, duration, orderId, MentorMailConfirmation);
    const durationInMilliseconds = duration * 60 * 1000;

    const cal = getIcalObjectInstance({
        starttime: dateTime, // Example start time
        endtime: new Date(dateTime.getTime() + durationInMilliseconds), // Example end time (1 hour from now)
        summary: 'Meeting Summary', // Example summary
        description: 'Meeting Description', // Example description
        location: 'Study Sphere', // Example location
        url: 'https://studysphere.com/meetup', // Example URL
        name: 'Study Sphere', // Example organizer name
        email: 'shopflicker22@example.com' // Example organizer email        
    });

    await sendMail("Order Confirmation",menteeEmail,menteeBody,cal);
    await sendMail("New Meeting Confirmed", mentorEmail,mentorBody,cal);
    await scheduleEmail({menteeEmail,menteeName,mentorEmail,mentorName,orderId,dateTime,duration});
  }
  catch(error)
  {
    console.log(error);
    throw error;
  }
}

export async function sendRoomCodeMail({menteeEmail, menteeName, mentorEmail, mentorName, orderId, dateTime, duration, mentorCode, menteeCode}:MailArgs)
{
  try
  {
    const date = new Date(dateTime);
    const menteeBody = compileTemplate(menteeName, mentorName, date, duration, orderId, RoomCodeMentee, menteeCode);
    const mentorBody = compileTemplate(menteeName, mentorName, date, duration, orderId,RoomCodeMentor, mentorCode);
    await sendMail("Room Code",menteeEmail, menteeBody);
    await sendMail("Room Code",mentorEmail, mentorBody);
  }
  catch(error)
  {
    console.log(error);
    throw error;
  }
}
