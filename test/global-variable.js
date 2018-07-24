
/*---------------------------------include library---------------------------- */
var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://159.100.241.121:5002');
const addContext = require('mochawesome/addContext');
/*-----------------------------------Token---------------------------------------- */
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzI0MTY1MzcsImV4cCI6MTU2Mzk1MjUzNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoic3VwZXItYWRtaW5AZ21haWwuY29tIiwicm9sZXMiOlsiU1VQRVJfQURNSU4iLCJTVVBFUl9BRE1JTiJdfQ.qu2lvCFOEK30n7g4GJDNL8Ya1eXD_WhyjPnhsKn-tb0';
var Invalidtoken = 'eyD0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzEzODc2MTEsImV4cCI6MTU2MjkyMzYxMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoic3VwZXItYWRtaW5AbWFpbC5jb20iLCJyb2xlcyI6WyJQUk9WSURFUiIsIlNVUEVSX0FETUlOIl19.RfeB6N6kRFVCGR_mvsXbtqcuWa2KdpFhHPN9DgnHsmU';
/*---------------------------------Clinic---------------------------- */

var ClinicID = "";
var ClinicName = "";
var ClinicIDForProvider = "";
var ClinicIDForProviderForTimeSlot = "";
var ClinicIDForProviderForDiscount = "";
var ClinicIDForProviderPatch = "";
var unitNumberID = "";
var unitNumberIDPatch ="";

/*---------------------------------SubClinic---------------------------- */
var SubClinicIDForProvider = "";

/*---------------------------------Provider---------------------------- */
var ConsumerID = "";
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
var ConsumerIDForProviderWorkingDay = "";
var ProviderIdForPatchWorkingDay = "";
var WorkingDayIdWorkingDay = "";
var ClinicIDForProvider2WorkingDay = "";


/*---------------------------------Promotion---------------------------- */
var ServiceId = "";
var ServiceIdForChangePatch = "";

/*---------------------------------Clinics---------------------------- */
var randomValueName = randomString(5); /*use for name*/
var randomValueMail = randomString(7); /*use for mail*/
var randomValueProviderMail = randomString(3); /*use for mail*/
var emailForProviders = randomValueProviderMail + '@mail.com';
var dublicateData = "2018-01-01";

/*---------------------------------Providers---------------------------- */
var randomValueNameProvider = randomString(3); /*use for name*/
var randomValueMailProvider = randomString(4); /*use for mail*/
var randomValueProviderMailProvider = randomString(5); /*use for mail*/
var emailForProvidersProvider = randomValueProviderMailProvider + '@mail.com';
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
var emailForProvidersShedule = randomValueProviderMailShedule + '@mail.com';

/*---------------------------------Shedules Time Slots---------------------------- */
var randomValueNameSheduleTimeSlot = randomString(5); /*use for name*/
var randomValueMailSheduleTimeSlot = randomString(7); /*use for mail*/
var randomValueProviderMailSheduleTimeSlot = randomString(4); /*use for mail*/
var emailForProvidersSheduleTimeSlot = randomValueProviderMailSheduleTimeSlot + '@mail.com';

/*---------------------------------ShedulesOne---------------------------- */

var ProviderIdForPatchForShedulesOne = "";
var randomValueNameSheduleOne = randomString(6); /*use for name*/
var randomValueMailSheduleOne = randomString(7); /*use for mail*/
var randomValueProviderMailSheduleOne = randomString(5); /*use for mail*/
var emailForProvidersSheduleOne = randomValueProviderMailSheduleOne + '@mail.com';
var ScheduleIdForProvidersOne = "";


/*---------------------------------Provider Discount---------------------------- */
var DiscountId = '';
var DiscountId2 = '';
var randomValueNameDiscount = randomString(6); /*use for name*/
var randomValueMailDiscount = randomString(5); /*use for mail*/
var randomValueProviderMailDiscount = randomString(4); /*use for mail*/
var emailForProvidersDiscount = randomValueProviderMailDiscount + '@mail.com';
var ScheduleIdForProvidersDiscount = "";

/*---------------------------------DayOffs---------------------------- */
var randomValueNameDayOff = randomString(6); /*use for name*/
var randomValueMailDayOff = randomString(7); /*use for mail*/
var randomValueProviderMailDayOff = randomString(8); /*use for mail*/
var emailForProvidersDayOff = randomValueProviderMailDayOff + '@mail.com'
var ClinicIDForProviderDayOff = "";
var ConsumerIDForProviderDayOff = "";
var ProviderIdForPatchDayOff = "";
/*---------------------------------WorkingDays---------------------------- */
var randomValueNameWorkingDay = randomString(3); /*use for name*/
var randomValueMailWorkingDay = randomString(7); /*use for mail*/
var randomValueProviderMailWorkingDay = randomString(4); /*use for mail*/
var emailForProvidersWorkingDay = randomValueProviderMailWorkingDay + '@mail.com';
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
}

/*---------------------------------Center obj for Promotion---------------------------- */
var centreCLinicsPromo = {
    name: "Promo" + randomValueName,
    latitude: 0,
    longitude: 0,
    confirmed: true
}
/*---------------------------------Center obj for DayOff---------------------------- */
var centreDayOff = {
    name: randomValueNameDayOff,
    latitude: 0,
    longitude: 0,
    confirmed: true
}
/*---------------------------------Center obj for Provider---------------------------- */
var centreProvider = {
    name: randomValueNameProvider,
    latitude: 0,
    longitude: 0,
    confirmed: true
}
/*---------------------------------Center obj  for Shedule---------------------------- */
var centreShedule = {
    name: randomValueNameShedule,
    latitude: 0,
    longitude: 0,
    confirmed: true
}

/*---------------------------------Center obj  for Shedule Time Slots---------------------------- */
var centreSheduleTimeSlot = {
    name: randomValueNameSheduleTimeSlot,
    latitude: 0,
    longitude: 0,
    confirmed: true
}
/*---------------------------------Center obj  for Provider Discount---------------------------- */
var centreProviderDiscount = {
    name: randomValueNameDiscount,
    latitude: 0,
    longitude: 0,
    confirmed: true
}
/*---------------------------------Center obj  for SheduleOne---------------------------- */
var centreSheduleOne = {
    name: randomValueNameSheduleOne,
    latitude: 0,
    longitude: 0,
    confirmed: true
}
/*---------------------------------Center obj for WorkingDay---------------------------- */
var centreWorkingDay = {
    name: randomValueNameWorkingDay,
    latitude: 0,
    longitude: 0,
    confirmed: true
}

/*---------------------------------Consumer obj ---------------------------- */

var consumerObj = {
    email: randomValueMail + '@mail.com',
    firstName: randomValueName,
    lastName: "last" + randomValueName,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}
/*---------------------------------Consumer obj for Provider---------------------------- */
var consumerObjProvider = {
    email: randomValueMailProvider + '@mail.com',
    firstName: randomValueNameProvider,
    lastName: "last" + randomValueNameProvider,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}
/*---------------------------------Consumer obj for Shedule---------------------------- */

var consumerObjShedule = {
    email: randomValueMailShedule + '@mail.com',
    firstName: randomValueNameShedule,
    lastName: "last" + randomValueNameShedule,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}

/*---------------------------------Consumer obj for Shedule Time Slot---------------------------- */

var consumerObjSheduleTimeSlot = {
    email: randomValueMailSheduleTimeSlot + '@mail.com',
    firstName: randomValueNameShedule,
    lastName: "last" + randomValueNameShedule,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}
/*---------------------------------Consumer obj for Provider Discount---------------------------- */

var consumerObjDiscount = {
    email: randomValueMailDiscount + '@mail.com',
    firstName: randomValueNameDiscount,
    lastName: "last" + randomValueNameDiscount,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}
/*---------------------------------Consumer obj for SheduleONe---------------------------- */

var consumerObjSheduleOne = {
    email: randomValueMailSheduleOne + '@mail.com',
    firstName: randomValueNameSheduleOne,
    lastName: "last" + randomValueNameSheduleOne,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}
/*---------------------------------Consumer obj for DayOff---------------------------- */
var consumerObjDayOff = {
    email: randomValueMailDayOff + '@mail.com',
    firstName: randomValueNameDayOff,
    lastName: "last" + randomValueNameDayOff,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}

/*---------------------------------Consumer obj for WorkingDay---------------------------- */

var consumerObjWorkingDay = {
    email: randomValueMailWorkingDay + '@mail.com',
    firstName: randomValueNameWorkingDay,
    lastName: "last" + randomValueNameWorkingDay,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}

/*---------------------------------Consumer obj for promotions---------------------------- */

var consumerObjPromotions = {
    email: "promo"+ randomValueMailWorkingDay + '@mail.com',
    firstName: "promo"+ randomValueNameWorkingDay,
    lastName: "lastPromo" + randomValueNameWorkingDay,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    receiveNewsLetters: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}



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
unitNumberIDPatch

}
