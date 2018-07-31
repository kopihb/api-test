
/*---------------------------------include library---------------------------- */
var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://159.100.241.121:5002');
const addContext = require('mochawesome/addContext');
/*-----------------------------------Token---------------------------------------- */
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMwMjEyMzcsImV4cCI6MTU2NDU1NzIzNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoic3VwZXItYWRtaW5AZ21haWwuY29tIiwicm9sZXMiOlsiU1VQRVJfQURNSU4iLCJQUk9WSURFUiJdfQ.-WFpWXvG1Qc3fGtx9X_9wjJcP3wg5Elksg-VPteJWSI';
var Invalidtoken = 'eyD0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzEzODc2MTEsImV4cCI6MTU2MjkyMzYxMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoic3VwZXItYWRtaW5AbWFpbC5jb20iLCJyb2xlcyI6WyJQUk9WSURFUiIsIlNVUEVSX0FETUlOIl19.RfeB6N6kRFVCGR_mvsXbtqcuWa2KdpFhHPN9DgnHsmU';
var tokenConsumer = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzI2MDg2MDEsImV4cCI6MTU2NDE0NDYwMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiT0F0SGVAbWFpbC5jb20iLCJyb2xlcyI6WyJDT05TVU1FUiIsIkNPTlNVTUVSIl19.XAq0c5H-AvRCHblZ-iQKRqxUsQUmDPFY4uk8xL8GumU';
var tokenProvider = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzI2MDg2MDEsImV4cCI6MTU2NDE0NDYwMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoieDk5eHhlZWQ2eW9WWUBtYWlsLmNvbSIsInJvbGVzIjpbIlBST1ZJREVSUyIsIlBST1ZJREVSUyJdfQ.xd1-8TNG-d-jzf1NbkYvd72hbNcychNJvOe0lLOL7TU';
/*---------------------------------Clinic---------------------------- */

var ClinicID = "";
var ClinicIDForCentreToken = "";
var ClinicName = "";
var ClinicIDForProvider = "";
var ClinicIDForProviderForTimeSlot = "";
var ClinicIDForProviderForDiscount = "";
var ClinicIDForProviderPatch = "";
var unitNumberID = "";
var unitNumberIDPatch ="";

/*---------------------------------SubClinic---------------------------- */
var SubClinicIDForProvider = "";
var SubClinicForClinic = "";
var ClinicIDForSubClinic = "";
var ClinicIDForSubClinicOther = " ";
var ClinicIDForSubClinicDelete = " ";
var unitNumberIDPatchForSub = '';
/*---------------------------------MasterService---------------------------- */
var MasterServiceID = "";
var MasterServiceIDPatch ="";
var randomValueNameForSubClinics = randomString(6); /*use for name*/
/*---------------------------------Provider---------------------------- */
var ConsumerID = "";
var ConsumerIDForToken = "";
var ConsumerIDForProvider = "";
var ConsumerIDForProviderForDiscount = "";
var ConsumerIDForProviderPatch = "";
var ProviderIdForPatch = "";
var ProviderIdForPatchForDiscount = "";
var DayOffId = "";
var ProviderIdForPatchAnyChanges = "";
var ProviderPromotionID = "";
var ConsumerIDForProviderForTimeSlot = "";
var ProviderIdForPatchForTimeSlot = "";

/*---------------------------------DayOff---------------------------- */

var DayOffIdDayOff = "";
/*---------------------------------Working Day---------------------------- */
var WorkingDayId = "";
var ClinicIDForProviderWorkingDay = "";
var ProviderIdForPatch58 = '';
var ConsumerIDForProviderWorkingDay = "";
var ProviderIdForPatchWorkingDay = "";
var WorkingDayIdWorkingDay = "";
var ClinicIDForProvider2WorkingDay = "";
var WorkingDayIdDublicateName = "";

/*---------------------------------Promotion---------------------------- */
var ServiceId = "";
var ServiceIdForChangePatch = "";
var ProviderIdForPatch27 = '';
var unitNumberNamePatch = '';
 /*---------------------------------Clinics---------------------------- */
var randomValueName = randomString(5); /*use for name*/
var randomValueMail = randomString(7); /*use for mail*/
var randomValueProviderMail = randomString(3); /*use for mail*/
var emailForProviders = randomValueProviderMail + '@gmail.com';
var dublicateData = "2018-01-01";

/*---------------------------------Providers---------------------------- */
var randomValueNameProvider = randomString(3); /*use for name*/
var randomValueMailProvider = randomString(4); /*use for mail*/
var randomValueProviderMailProvider = randomString(5); /*use for mail*/
var emailForProvidersProvider = randomValueProviderMailProvider + '@gmail.com';
var ScheduleIdForProviders = "";
var ScheduleIdForProvidersForTimeSlot = "";

/*---------------------------------Shedules---------------------------- */
var ScheduleIdForProviders2 = '';
var ProviderIdForPatch2 = '';
var WorkingDayId2 = '';
var WorkingDayId3 = '';
var WorkingDayId4 = '';
var randomValueNameShedule = randomString(4); /*use for name*/
var randomValueMailShedule = randomString(5); /*use for mail*/
var randomValueProviderMailShedule = randomString(3); /*use for mail*/
var emailForProvidersShedule = randomValueProviderMailShedule + '@gmail.com';
var ProviderIdForPatch32 = '';
/*---------------------------------Shedules Time Slots---------------------------- */
var randomValueNameSheduleTimeSlot = randomString(5); /*use for name*/
var randomValueMailSheduleTimeSlot = randomString(7); /*use for mail*/
var randomValueProviderMailSheduleTimeSlot = randomString(4); /*use for mail*/
var emailForProvidersSheduleTimeSlot = randomValueProviderMailSheduleTimeSlot + '@gmail.com';
var ProviderIdForPatch45 = '';
/*---------------------------------ShedulesOne---------------------------- */

var ProviderIdForPatchForShedulesOne = "";
var randomValueNameSheduleOne = randomString(6); /*use for name*/
var randomValueMailSheduleOne = randomString(7); /*use for mail*/
var randomValueProviderMailSheduleOne = randomString(5); /*use for mail*/
var emailForProvidersSheduleOne = randomValueProviderMailSheduleOne + '@gmail.com';
var ScheduleIdForProvidersOne = "";
var ProviderIdForPatch28 = '';

/*---------------------------------Provider Discount---------------------------- */
var DiscountId = '';
var DiscountId2 = '';
var randomValueNameDiscount = randomString(6); /*use for name*/
var randomValueMailDiscount = randomString(5); /*use for mail*/
var randomValueProviderMailDiscount = randomString(4); /*use for mail*/
var emailForProvidersDiscount = randomValueProviderMailDiscount + '@gmail.com';
var ScheduleIdForProvidersDiscount = "";
var ProviderIdForPatch22 = '';
/*---------------------------------DayOffs---------------------------- */
var randomValueNameDayOff = randomString(6); /*use for name*/
var randomValueMailDayOff = randomString(7); /*use for mail*/
var randomValueProviderMailDayOff = randomString(8); /*use for mail*/
var emailForProvidersDayOff = randomValueProviderMailDayOff + '@gmail.com'
var ClinicIDForProviderDayOff = "";
var ConsumerIDForProviderDayOff = "";
var ProviderIdForPatchDayOff = "";
/*---------------------------------WorkingDays---------------------------- */
var randomValueNameWorkingDay = randomString(3); /*use for name*/
var randomValueMailWorkingDay = randomString(7); /*use for mail*/
var randomValueProviderMailWorkingDay = randomString(4); /*use for mail*/
var emailForProvidersWorkingDay = randomValueProviderMailWorkingDay + '@gmail.com';
/*---------------------------------Time slots---------------------------- */
var TimeSlotsID = "";
var CenterForTime = '';
/*---------------------------------Function For Random---------------------------- */
function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

/*---------------------------------Center obj---------------------------- */
var centreCLinics = {
    name: randomValueName,
    latitude: 0,
    longitude: 0,
    confirmed: true
};

/*---------------------------------Center obj for SubClinic---------------------------- */
var centreSubCLinics = {
    name: randomValueNameForSubClinics,
    latitude: 0,
    longitude: 0,
    confirmed: true
};

/*---------------------------------Center obj for Promotion---------------------------- */
var centreCLinicsPromo = {
    name: "Promo" + randomValueName,
    latitude: 0,
    longitude: 0,
    confirmed: true
};
/*---------------------------------Center obj for DayOff---------------------------- */
var centreDayOff = {
    name: randomValueNameDayOff,
    latitude: 0,
    longitude: 0,
    confirmed: true
};
/*---------------------------------Center obj for Provider---------------------------- */
var centreProvider = {
    name: randomValueNameProvider,
    latitude: 0,
    longitude: 0,
    confirmed: true
};
/*---------------------------------Center obj  for Shedule---------------------------- */
var centreShedule = {
    name: randomValueNameShedule,
    latitude: 0,
    longitude: 0,
    confirmed: true
};

/*---------------------------------Center obj  for Shedule Time Slots---------------------------- */
var centreSheduleTimeSlot = {
    name: randomValueNameSheduleTimeSlot,
    latitude: 0,
    longitude: 0,
    confirmed: true
};
/*---------------------------------Center obj  for Provider Discount---------------------------- */
var centreProviderDiscount = {
    name: randomValueNameDiscount,
    latitude: 0,
    longitude: 0,
    confirmed: true
};
/*---------------------------------Center obj  for SheduleOne---------------------------- */
var centreSheduleOne = {
    name: randomValueNameSheduleOne,
    latitude: 0,
    longitude: 0,
    confirmed: true
};
/*---------------------------------Center obj for WorkingDay---------------------------- */
var centreWorkingDay = {
    name: randomValueNameWorkingDay,
    latitude: 0,
    longitude: 0,
    confirmed: true
};

/*---------------------------------Consumer obj ---------------------------- */

var consumerObj = {
    email: randomValueMail + '@gmail.com',
    firstName: randomValueName,
    lastName: "last" + randomValueName,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
};
/*---------------------------------Consumer obj for Provider---------------------------- */
var consumerObjProvider = {
    email: randomValueMailProvider + '@gmail.com',
    firstName: randomValueNameProvider,
    lastName: "last" + randomValueNameProvider,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
};
/*---------------------------------Consumer obj for Shedule---------------------------- */

var consumerObjShedule = {
    email: randomValueMailShedule + '@gmail.com',
    firstName: randomValueNameShedule,
    lastName: "last" + randomValueNameShedule,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
};

/*---------------------------------Consumer obj for Shedule Time Slot---------------------------- */

var consumerObjSheduleTimeSlot = {
    email: randomValueMailSheduleTimeSlot + '@gmail.com',
    firstName: randomValueNameShedule,
    lastName: "last" + randomValueNameShedule,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
};
/*---------------------------------Consumer obj for Provider Discount---------------------------- */

var consumerObjDiscount = {
    email: randomValueMailDiscount + '@gmail.com',
    firstName: randomValueNameDiscount,
    lastName: "last" + randomValueNameDiscount,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
};
/*---------------------------------Consumer obj for SheduleONe---------------------------- */

var consumerObjSheduleOne = {
    email: randomValueMailSheduleOne + '@gmail.com',
    firstName: randomValueNameSheduleOne,
    lastName: "last" + randomValueNameSheduleOne,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
};
/*---------------------------------Consumer obj for DayOff---------------------------- */
var consumerObjDayOff = {
    email: randomValueMailDayOff + '@gmail.com',
    firstName: randomValueNameDayOff,
    lastName: "last" + randomValueNameDayOff,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
};

/*---------------------------------Consumer obj for WorkingDay---------------------------- */

var consumerObjWorkingDay = {
    email: randomValueMailWorkingDay + '@gmail.com',
    firstName: randomValueNameWorkingDay,
    lastName: "last" + randomValueNameWorkingDay,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
};

/*---------------------------------Consumer obj for promotions---------------------------- */

var consumerObjPromotions = {
    email: "promo"+ randomValueMailWorkingDay + '@gmail.com',
    firstName: "promo"+ randomValueNameWorkingDay,
    lastName: "lastPromo" + randomValueNameWorkingDay,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
};



module.exports={
    should,
    expect,
    supertest,
    api,
    addContext,
    token,
    randomString: randomString,
    ClinicID,
    ClinicName,
    centreCLinics,
    centreDayOff,
    ConsumerID,
    consumerObj,
    emailForProviders,
    dublicateData,
    ClinicIDForProvider,
    ConsumerIDForProvider,
    ProviderIdForPatch,
    DayOffId,
    centreProvider,
    ClinicIDForProviderPatch,
    ConsumerIDForProviderPatch,
    ProviderIdForPatchAnyChanges,
    emailForProvidersProvider,
    emailForProvidersShedule,
    consumerObjProvider,
    consumerObjShedule,
    centreShedule,
    randomValueNameShedule,
    WorkingDayId,
    ScheduleIdForProviders,
    emailForProvidersDayOff,
    consumerObjDayOff,
    DayOffIdDayOff,
    ClinicIDForProviderDayOff,
    ConsumerIDForProviderDayOff,
    ProviderIdForPatchDayOff,
    centreWorkingDay,
    consumerObjWorkingDay,
    emailForProvidersWorkingDay,
    randomValueNameWorkingDay,
    ClinicIDForProviderWorkingDay,
ConsumerIDForProviderWorkingDay,
ProviderIdForPatchWorkingDay ,
WorkingDayIdWorkingDay ,
ClinicIDForProvider2WorkingDay,
    consumerObjPromotions,
    centreCLinicsPromo,
    ServiceId,
    emailForProvidersSheduleOne,
    centreSheduleOne,
    consumerObjSheduleOne,
    ScheduleIdForProvidersOne,
    randomValueNameSheduleOne,
    ProviderIdForPatchForShedulesOne,
    emailForProvidersDiscount,
    centreProviderDiscount,
    consumerObjDiscount,
    ScheduleIdForProvidersDiscount,
    ProviderIdForPatchForDiscount,
    ClinicIDForProviderForDiscount,
    ConsumerIDForProviderForDiscount,
    randomValueNameDiscount,
    emailForProvidersSheduleTimeSlot,
    centreSheduleTimeSlot,
    consumerObjSheduleTimeSlot,
    randomValueNameSheduleTimeSlot,
    ClinicIDForProviderForTimeSlot,
    ConsumerIDForProviderForTimeSlot,
    ProviderIdForPatchForTimeSlot,
    ScheduleIdForProvidersForTimeSlot,
    Invalidtoken,
    ServiceIdForChangePatch,
    ScheduleIdForProviders2,
ProviderIdForPatch2,
WorkingDayId2,
WorkingDayId3,
WorkingDayId4,
TimeSlotsID,
CenterForTime,
  DiscountId,
DiscountId2,
    SubClinicIDForProvider,
    unitNumberID,
unitNumberIDPatch,
    MasterServiceID,
    MasterServiceIDPatch,
    ClinicIDForCentreToken,
    ConsumerIDForToken,
    WorkingDayIdDublicateName,
    tokenConsumer,
    tokenProvider,
    ProviderIdForPatch45,
    ProviderIdForPatch32,
    ProviderIdForPatch22,
    ProviderIdForPatch28,
    ProviderIdForPatch58,
    ProviderPromotionID,
    ProviderIdForPatch27,
    SubClinicForClinic,
    ClinicIDForSubClinic,
    centreSubCLinics,
   ClinicIDForSubClinicOther,
ClinicIDForSubClinicDelete,
    unitNumberNamePatch,
    unitNumberIDPatchForSub
};
