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
  iff(present(lat), present(long))
}

interface OSUTime {
  times?: number;
  ns?: number
} constrains {
  not(and(present(times),
          present(ns)));
}

let pic1: Picture = {caption: "On holiday"}; //OK
let pic2: Picture = {caption: "On holiday", lat: 5, long: 6, picture: "path"}; //OK

let time1: OSUTime = {}; //OK
let time2: OSUTime = {times: 5}; //OK
let time3: OSUTime = {ns: 6}; //OK
