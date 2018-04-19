// @strictNullChecks: true
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
function pic2(arg: Picture2) { arg };
pic0(p1); //OK
pic2(p0); //OK
pic2(p1); //OK

let var0: OSUTime = {times: 5};
let var1: OSUTime1 = {times: 5};
let var2: OSUTime2 = {times: 5};
function time0(arg: OSUTime) { arg };
function time1(arg: OSUTime1) { arg };
function time2(arg: OSUTime2) { arg };
time0(var2); //OK
time1(var2); //OK
if (var0.ns) {
    time2(var0); //OK
} else if (var0.times) {
    time2(var0); //OK
}

//Interface to Object Assignment
let pic:Picture = {caption: "Holiday", picture: "path"}; //OK
let obj0:{} = pic; //OK
let obj1:{caption: string} = pic; //OK
let obj2:{caption: string, picture?: string} = pic; //OK
let obj3:{caption: string, picture?: string, lat?: number, long?: number} = pic; //OK
let obj4:{caption: string, lat?: number, long?: number} = pic; //OK
let obj16:{lat?: number, long?: number} = pic; //ERROR

if (pic.lat) {
    let obj5:{caption: string, picture: string} = pic; //OK
    let obj6:{caption: string, picture: string, lat: number, long: number} = pic; //OK
} else if (pic.picture) {
    let obj7:{caption: string, picture: string} = pic; //OK
    let obj8:{caption: string, picture: string, lat?: number, long?: number} = pic; //OK
}

let time:OSUTime = {times: 5};
let obj10:{} = time; //OK
let obj11:{times?: number} = time; //OK
let obj12:{ns?: number} = time; //OK
let obj13:{times?: number, ns?: number} = time; //OK

if (time.ns) {
    let obj14:{ns: number} = time; //OK
    if (time.times) {
        //nothing here
    } else {
        let obj17:{ns: number, times: undefined} = time; //OK
        let obj19:{ns: number} = time; //OK
    }
} else if (time.times) {
    let obj15:{times: number} = time; //OK
    let obj20:{ns: undefined} = time; //OK
} else {
    let obj18:{times: undefined, ns: undefined} = time; //OK
}