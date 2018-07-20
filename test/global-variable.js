
/*---------------------------------include library---------------------------- */
var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://159.100.241.121:5002');
const addContext = require('mochawesome/addContext');
/*-----------------------------------Token---------------------------------------- */
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzIwNzQwMDUsImV4cCI6MTU2MzYxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoiYW55UGF0Y2hSbzJqTENhY0BtYWlsLmNvbSIsInJvbGVzIjpbIlNVUEVSX0FETUlOIiwiU1VQRVJfQURNSU4iXX0.5-ofOLZvvmMUyummmyYgqazQqafPeEnJEnQJIEWeosM';

/*---------------------------------Clinic---------------------------- */

var ClinicID = "";
var ClinicName = "";
var ClinicIDForProvider = "";
var ClinicIDForProviderPatch = "";

/*---------------------------------Consumer---------------------------- */
var ConsumerID = "";
var ConsumerIDForProvider = "";
var ConsumerIDForProviderPatch = "";
var ProviderIdForPatch = "";
var DayOffId = "";
var DayOffIdDayOff = "";
var ProviderIdForPatchAnyChanges = "";

/*---------------------------------Working Day---------------------------- */

var ClinicIDForProviderWorkingDay = "";
var ConsumerIDForProviderWorkingDay = "";
var ProviderIdForPatchWorkingDay = "";
var WorkingDayIdWorkingDay = "";
var ClinicIDForProvider2WorkingDay = "";


var randomValueName = randomString(5); /*use for name*/
var randomValueMail = randomString(7); /*use for mail*/
var randomValueProviderMail = randomString(8); /*use for mail*/
var emailForProviders = randomValueProviderMail + '@mail.com';
var dublicateData = "2018-01-01";


var randomValueNameProvider = randomString(3); /*use for name*/
var randomValueMailProvider = randomString(4); /*use for mail*/
var randomValueProviderMailProvider = randomString(5); /*use for mail*/
var emailForProvidersProvider = randomValueProviderMailProvider + '@mail.com';
var ScheduleIdForProviders = "";

var randomValueNameShedule = randomString(4); /*use for name*/
var randomValueMailShedule = randomString(5); /*use for mail*/
var randomValueProviderMailShedule = randomString(3); /*use for mail*/
var emailForProvidersShedule = randomValueProviderMailShedule + '@mail.com';

var WorkingDayId = "";


var randomValueNameDayOff = randomString(5); /*use for name*/
var randomValueMailDayOff = randomString(3); /*use for mail*/
var randomValueProviderMailDayOff = randomString(4); /*use for mail*/
var emailForProvidersDayOff = randomValueProviderMailDayOff + '@mail.com'
var ClinicIDForProviderDayOff = "";
var ConsumerIDForProviderDayOff = "";
var ProviderIdForPatchDayOff = "";



var randomValueNameWorkingDay = randomString(3); /*use for name*/
var randomValueMailWorkingDay = randomString(7); /*use for mail*/
var randomValueProviderMailWorkingDay = randomString(4); /*use for mail*/
var emailForProvidersWorkingDay = randomValueProviderMailWorkingDay + '@mail.com';


function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}




var centreCLinics = {
    name: randomValueName,
    latitude: 0,
    longitude: 0,
    confirmed: true
}

var centreDayOff = {
    name: randomValueNameDayOff,
    latitude: 0,
    longitude: 0,
    confirmed: true
}

var centreProvider = {
    name: randomValueNameProvider,
    latitude: 0,
    longitude: 0,
    confirmed: true
}

var centreShedule = {
    name: randomValueNameShedule,
    latitude: 0,
    longitude: 0,
    confirmed: true
}

var centreWorkingDay = {
    name: randomValueNameWorkingDay,
    latitude: 0,
    longitude: 0,
    confirmed: true
}

var consumerObj = {
    email: randomValueMail + '@mail.com',
    name: randomValueName,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}

var consumerObjProvider = {
    email: randomValueMailProvider + '@mail.com',
    name: randomValueNameProvider,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}


var consumerObjShedule = {
    email: randomValueMailShedule + '@mail.com',
    name: randomValueNameShedule,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}

var consumerObjDayOff = {
    email: randomValueMailDayOff + '@mail.com',
    name: randomValueNameDayOff,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}

var consumerObjWorkingDay = {
    email: randomValueMailWorkingDay + '@mail.com',
    name: randomValueNameWorkingDay,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
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
ClinicIDForProvider2WorkingDay

}
