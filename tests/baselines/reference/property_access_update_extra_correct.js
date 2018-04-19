//// [property_access_update_extra_correct.ts]
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

interface OSUTime {
  times?: number;
  ns?: number
} constrains {
  not(and(present(times),
          present(ns)));
}

function updatePic(picture: Picture, newCap: string, newPic: string, newLat: number, newLong: number): Picture {
  picture.caption = newCap;
  if (picture.long) {
    picture.long = newLong;
    picture.lat = newLat;
    picture.picture = newPic; //bonus
  } else if (picture.picture) {
    picture.picture = newPic;
  }
  return picture;
}

function correctLocation(pic: Picture, extra_lat: number, extra_long: number) {
  if (pic.lat) {
    pic.long;
    return objupdate(pic, {picture: pic.picture, lat: pic.lat + extra_lat, long: pic.long + extra_long});
  }
}

function deleteTime(time: OSUTime): OSUTime {
  return objupdate(time, {ns: undefined, times: undefined});
}

function switchToNS(time: OSUTime, ns: number): OSUTime {
  if(time.ns) {
    time.ns = ns;
  } else if (time.times) {
    let tmp: OSUTime = time; //temporary variable is needed because the type of time is OSUTime + the present(times) constraint (which you do not want for the objupdate), so first cast back to original OSUTime interface
    time = objupdate(tmp, {times: undefined, ns: ns});
  }
  return time;
}


//// [property_access_update_extra_correct.js]
function updatePic(picture, newCap, newPic, newLat, newLong) {
    picture.caption = newCap;
    if (picture.long) {
        picture.long = newLong;
        picture.lat = newLat;
        picture.picture = newPic; //bonus
    }
    else if (picture.picture) {
        picture.picture = newPic;
    }
    return picture;
}
function correctLocation(pic, extra_lat, extra_long) {
    if (pic.lat) {
        pic.long;
        return { ...pic, ...{ picture: pic.picture, lat: pic.lat + extra_lat, long: pic.long + extra_long }};
    }
}
function deleteTime(time) {
    return { ...time, ...{ ns: undefined, times: undefined }};
}
function switchToNS(time, ns) {
    if (time.ns) {
        time.ns = ns;
    }
    else if (time.times) {
        var tmp = time; //temporary variable is needed because the type of time is OSUTime + the present(times) constraint (which you do not want for the objupdate), so first cast back to original OSUTime interface
        time = { ...tmp, ...{ times: undefined, ns: ns }};
    }
    return time;
}
