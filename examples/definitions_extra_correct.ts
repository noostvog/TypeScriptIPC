// @strictNullChecks: true
/*Inter-property constraints are commonly found in web APIs and libraries of dynamic languages.
For example, when the latitude and longitude properties are both optional, but should only occur together.*/
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

/*Inter-property constraints are also found in the Python standard library, where the function os.utime sets both the access and modification time of a file.
The documentation describes that the function takes two optional parameters to set the time: times and ns, moreover it states that “It is an error to specify tuples for both times and ns ”.*/
interface OSUTime {
  times?: number;
  ns?: number
} constrains {
  not(and(present(times),
          present(ns)));
}

interface PrivateMessage {
  text?: string;
  userid?: number;
  screenname?: string;
} constrains {
  present(text);
  or(and(present(userid), not(present(screenname))),
     and(not(present(userid)), present(screenname)));
}

interface PrivateMessageStrict extends PrivateMessage {
  //inherit properties
} constrains {
  present(screenname);
}
