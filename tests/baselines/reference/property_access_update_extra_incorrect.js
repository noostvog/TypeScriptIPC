//// [property_access_update_extra_incorrect.ts]

interface Picture {
  caption?: string;
  picture?: string;
  lat?: number;
  long?: number;
} constrains {
  present(caption);
  implic(present(lat), present(picture));
  implic(present(long), present(picture));
  iff(present(lat), present(long))
}
interface OSUTime {
  times?: number;
  ns?: number
} constrains {
  not(and(present(times),
          present(ns)));
}

function updateWrongTime(time: OSUTime, times: number, ns: number) {
  objupdate(time, {times: times, ns: ns});
}
function updateWrongTime2(time: OSUTime, times: number) {
  objupdate(time, {times: times});
}
function wrongTime(time: OSUTime, times: number | undefined) {
  if(time.times) {
    time.times = times;
  }
}

function incorrectUpdate(pic: Picture, extra_lat: number, extra_long: number) {
  if (pic.lat) {
    //should not be accepted because it is not certain the picture property is present
    return objupdate(pic, {lat: pic.lat + extra_lat, long: pic.long + extra_long});
  }
}
function incorrectUpdate2(pic: Picture, extra_lat: number, extra_long: number) {
  if (pic.lat) {
    //should not be accepted because picture must be present for the location to be present
    return objupdate(pic, {picture: undefined, lat: pic.lat + extra_lat, long: pic.long + extra_long});
  }
}
function incorrectUpdate3(pic: Picture, extra_lat: number, extra_long: number) {
  //should not be accepted because it is not certain the picture property is present
  return objupdate(pic, {lat: pic.lat + extra_lat, long: pic.long + extra_long});
}

function wrongLocation(pic: Picture, extra_lat: number, extra_long: number) {
  if (pic.lat) {
    pic.long;
    return 5;
  }
  if(pic.long) {
    //impossible because pic.lat must be absent (otherwise the program would not reach this point)
    pic.lat;
  }
}


//// [property_access_update_extra_incorrect.js]
function updateWrongTime(time, times, ns) {
    { ...time, ...{ times: times, ns: ns }};
}
function updateWrongTime2(time, times) {
    { ...time, ...{ times: times }};
}
function wrongTime(time, times) {
    if (time.times) {
        time.times = times;
    }
}
function incorrectUpdate(pic, extra_lat, extra_long) {
    if (pic.lat) {
        //should not be accepted because it is not certain the picture property is present
        return { ...pic, ...{ lat: pic.lat + extra_lat, long: pic.long + extra_long }};
    }
}
function incorrectUpdate2(pic, extra_lat, extra_long) {
    if (pic.lat) {
        //should not be accepted because picture must be present for the location to be present
        return { ...pic, ...{ picture: undefined, lat: pic.lat + extra_lat, long: pic.long + extra_long }};
    }
}
function incorrectUpdate3(pic, extra_lat, extra_long) {
    //should not be accepted because it is not certain the picture property is present
    return { ...pic, ...{ lat: pic.lat + extra_lat, long: pic.long + extra_long }};
}
function wrongLocation(pic, extra_lat, extra_long) {
    if (pic.lat) {
        pic.long;
        return 5;
    }
    if (pic.long) {
        //impossible because pic.lat must be absent (otherwise the program would not reach this point)
        pic.lat;
    }
}
