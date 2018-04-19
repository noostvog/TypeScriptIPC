//// [property_assign_extra_incorrect.ts]
interface Picture {
    caption?: string;
    picture?: string;
    lat?: number;
    long?: number;
} constrains {
    present(caption);
    implic(present(lat), present(picture));
    implic(present(long), present(picture));
    iff(present(long), present(lat));
}

interface Picture1 {
    caption?: string;
    picture?: string;
} constrains {
    present(caption);
}

interface Picture2 {
    caption?: string;
    picture?: string;
    lat?: number;
    long?: number;
} constrains {
    present(caption);
    iff(present(lat), present(long));
}

interface OSUTime {
    times?: number;
    ns?: number
} constrains {
    not(and(present(times),
        present(ns)));
}
interface OSUTime1 {
    times?: number;
    ns?: number;
} constrains {
    or(present(times), present(ns));
}

interface OSUTime2 {
    times?: number;
    ns?: number;
} constrains {
    or(and(present(times), not(present(ns))),
        and(not(present(times)), present(ns)));
}
//Interface to Interface Assignment
let p0: Picture = {caption: "Holiday"};
let p1: Picture1 = {caption: "Holiday"};
let p2: Picture2 = {caption: "Holiday"};
function pic0(arg: Picture) { arg };
function pic1(arg: Picture1) { arg };
pic0(p2); //ERROR
pic1(p0); //ERROR
pic1(p2); //ERROR

let var0: OSUTime = {times: 5};
let var1: OSUTime1 = {times: 5};
let var2: OSUTime2 = {times: 5};
function time0(arg: OSUTime) { arg };
function time1(arg: OSUTime1) { arg };
function time2(arg: OSUTime2) { arg };
time2(var0); //ERROR
time2(var1); //ERROR
time0(var1); //ERROR
time1(var0); //ERROR
if (var0.ns) {

} else if (var0.times) {

} else {
    time2(var0); //ERROR
}

//Interface to Object Assignment
let pic:Picture = {caption: "Holiday", picture: "path"}; //OK
let obj2:{caption: string, picture: string} = pic; //ERROR
let obj4:{caption: string, picture: string, lat: number, long: number} = pic; //ERROR
let obj5:{lat: number, long: number} = pic; //ERROR
let obj7:{something: number} = pic; //ERROR
let obj19:{caption: string, lat: number, long: number} = pic; //ERROR

if (pic.long) {
    let obj9:{caption: string, picture: undefined} = pic; //ERROR
} else if (pic.picture) {
    let obj8:{caption: string, picture: string, lat: number, long: number} = pic; //ERROR
}

let time:OSUTime = {times: 5}; //OK
let obj10:{times: number} = time; //ERROR
let obj11:{ns: number} = time; //ERROR
let obj12:{times: number, ns: number} = time; //ERROR
let obj13:{times?: number, ns: number} = time; //ERROR geeft geen fout...
let obj14:{times: number, ns?: number} = time; //ERROR

if (time.ns) {
    let obj14:{ns: undefined} = time; //ERROR
    if (time.times) {
        time; //unsatisfiable
    } else {
        let obj17:{ns: undefined, times: number} = time; //ERROR
    }
} else if (time.times) {
    let obj15:{times: undefined} = time; //ERROR
    let obj16:{ns: number} = time; //ERROR
} else {
    let obj16:{times: number} = time; //ERROR
}

//// [property_assign_extra_incorrect.js]
//Interface to Interface Assignment
var p0 = { caption: "Holiday" };
var p1 = { caption: "Holiday" };
var p2 = { caption: "Holiday" };
function pic0(arg) { arg; }
;
function pic1(arg) { arg; }
;
pic0(p2); //ERROR
pic1(p0); //ERROR
pic1(p2); //ERROR
var var0 = { times: 5 };
var var1 = { times: 5 };
var var2 = { times: 5 };
function time0(arg) { arg; }
;
function time1(arg) { arg; }
;
function time2(arg) { arg; }
;
time2(var0); //ERROR
time2(var1); //ERROR
time0(var1); //ERROR
time1(var0); //ERROR
if (var0.ns) {
}
else if (var0.times) {
}
else {
    time2(var0); //ERROR
}
//Interface to Object Assignment
var pic = { caption: "Holiday", picture: "path" }; //OK
var obj2 = pic; //ERROR
var obj4 = pic; //ERROR
var obj5 = pic; //ERROR
var obj7 = pic; //ERROR
var obj19 = pic; //ERROR
if (pic.long) {
    var obj9 = pic; //ERROR
}
else if (pic.picture) {
    var obj8 = pic; //ERROR
}
var time = { times: 5 }; //OK
var obj10 = time; //ERROR
var obj11 = time; //ERROR
var obj12 = time; //ERROR
var obj13 = time; //ERROR geeft geen fout...
var obj14 = time; //ERROR
if (time.ns) {
    var obj14_1 = time; //ERROR
    if (time.times) {
        time; //unsatisfiable
    }
    else {
        var obj17 = time; //ERROR
    }
}
else if (time.times) {
    var obj15 = time; //ERROR
    var obj16 = time; //ERROR
}
else {
    var obj16 = time; //ERROR
}
