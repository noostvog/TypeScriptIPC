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

let pic1: Picture = {}; //ERROR
let pic2: Picture = {caption: "On holiday", lat: 5, long: 6}; //ERROR
let pic3: Picture = {lat: 5, long: 6, picture: "path"}; //ERROR
let pic4: Picture = {caption: "On holiday", lat: 6, picture: "path"}; //ERROR
let pic5: Picture = {caption: "On holiday", long: 6, picture: "path"}; //ERROR
let time: OSUTime = {times: 5, ns: 6}; //ERROR
