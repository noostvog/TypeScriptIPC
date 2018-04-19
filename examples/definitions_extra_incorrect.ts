// @strictNullChecks: true
interface Unsatisfiable {
  a?: string;
  b?: string;
} constrains {
  implic(present(a), not(present(b)));
  implic(present(b), present(a));
  present(b);
}

interface MustBeOptional {
  a: string;
  b: string;
} constrains {
  or(present(a), present(b));
}

interface NotUndefined {
  a?: string;
  b?: undefined;
} constrains {
  or(present(a), present(b));
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

interface IncorrectExtended extends PrivateMessage {
  //inherit all properties
} constrains {
  not(present(text));
}
