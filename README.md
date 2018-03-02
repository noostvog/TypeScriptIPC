
# TypeScript<sub>IPC</sub>

TypeScript<sub>IPC</sub> is an extension of TypeScript, which adds propositional logic to interface declarations to express constraints on the presence of interface properties. This has consequences on how objects with an interface type are created, accessed and updated.

## Programming with inter-property constraints
Inter-property constraints are often a part of the documentation of libraries and APIs. For example, in the Twitter API, users can be identified using ***either*** a _user ID_ or a _screen name_. Another example is found in the Python standard library, where the function `os.utime` sets both the access and modification time of a file. The documentation describes that the function takes two optional parameters to set the time: _times_ and _ns_, moreover it states that _“It is an error to specify tuples for both times and ns”_.

Existing programming languages are unable to express these more advanced constraints on the presence of properties or parameters. For example, TypeScript only allows properties or parameters to be required or optional. This would mean that the type system accepts objects containing none or both of the properties.

TypeScript<sub>IPC</sub> allows programmers to express a dependency logic between het presence of properties, using propositional logic. Moreover, it enforces these enforcing complex dependency logic defined by the programmer when an object is created, accessed or modified.

In the rest of this section, we introduce TypeScript<sub>IPC</sub> and show to program with inter-property constraints. More examples of how to program with interfaces with inter-property constraints can be found in `paper.ts`. You can run your own code snippets as follows (using the code found in the _interproperty_ branch):
  ```shell
  built/local/tsc.js paper.ts --strictNullChecks
  ```

### Definition of interfaces with constraints
The first part of the interface is identical to the default TypeScript interface. The second part indicates the constraints on the presence of the properties. Constraints are composed using logical operators (and, or, not, implic, iff). When inter-property constraints are defined, all properties must be indicated as optional in the first part, as the constraints on the presence of those properties is defined below.

The following example shows the interface for the data Twitter requires for sending a direct message. Next to the message itself (which is a required field, cfr. the first constraint), the interface has two properties to indicate the receiver. As already explained, only (and exactly) one of these two properties should be present. This is enforced using the second constraint.
```
interface PrivateMessage {
  text?: string;
  userid?: number;
  screenname?: string;
} constrains {
  present(text);
  or(and(present(userid), not(present(screenname))),
     and(not(present(userid)), present(screenname)));
}
```
### Object creation
Objects only satisfy the interface if all constraints are satisfied:
```
let msg1: PrivateMessage = {text: "Hello", userid: 42}; //OK
let msg2: PrivateMessage = {text: "Hello"}; //ERROR
let msg3: PrivateMessage = {text: "Hello", userid: 42, screenname: "Alice"}; //ERROR
  ```

### Property access
Object properties of an interface type with constraints can only be accessed when those properties are known to be present, or absent. When the property is present, it receives the intended type. When the property is absent, it receives the `undefined` type.

To prevent errors from accessing undefined properties, programmers must verify whether they are present before using them. This can be done using the if statements. The type checker combines the extra knowledge from the if statement with the existing constraints:
```
function getUser(msg: PrivateMessage) {
  msg.text; //OK
  msg.userid; //ERROR
  if (msg.userid) {
    msg.userid;     //OK: number
    msg.screenname; //OK: undefined
  } else {
    msg.userid;     //OK: undefined
    msg.screenname; //OK: string
  }
}
```
### Property update
Updating a property that was already guaranteed to be present is safe. Only `undefined` can be assigned to properties that are known to be absent.
```
function setMsg(msg: PrivateMessage, text: string, userid: number) {
  msg.text = text;      //OK
  msg.text = undefined; //ERROR
  msg.userid = userid;  //ERROR
  if (msg.userid) {
    msg.userid = userid;        //OK
    msg.screenname = undefined; //OK
  }
}
```
Updating multiple properties at once (for example to switch between the user ID and the screen name) can be done using a new built-in function `objupdate`:
```
let msg6: PrivateMessage = {text: "Hello", userid: 42};
let msg7: PrivateMessage = objupdate(msg6, {userid: undefined, screenname: "Alice"}); //OK
```


## Differences between the implementation and the formalisation
This project contains a prototype implementation of TypeScript<sub>IPC</sub>. Because TypeScript<sub>IPC</sub> is implemented as an extension of a recent version of TypeScript, there are some differences between the implementation and the formalisation.

* In order to stay consistent with existing TypeScript programs, we did not replace the existing interface definition of TypeScript with the interface definitions from the paper. Instead, required and optional properties can still be expressed in this implementation. Constraints are an optional extension of interfaces, and should always be combined with properties which are all optional (presence constraints in the first section of an interface definition (required properties are not taken into consideration when there is a constraints section). Properties of interfaces with constraints should not have the type "undefined". For example, the running example from the paper should be defined as follows (underscores in property names are not supported yet):

  ```
   interface PrivateMessage {
     text?: string;
     userid?: number;
     screenname?: string;
   } constrains {
     present(text);
     or(and(present(userid), not(present(screenname))),
        and(not(present(userid)), present(screenname)));
   }
  ```

* To prevent the existence of _hidden_ properties in objects, the paper limits the creation of object with as type an interface to the cast of an object literal to that interface.
Since TypeScript 1.6, object literals cannot contain extra properties anymore. However, it is still possible to have _hidden_ properties when a variable with an interface type is assigned to a variable with an object type (literal or interface). Therefore, our implementation still limits these assignments.
Variables with interface types can only be assigned to each other if both have or lack constraints.

  Casts are currently not supported, and should not be used in combination with interfaces with constraints.
  Instead of `<PrivateMessage> {text: "Hi!", userid: 42}` use an assignment:
  `let pm: PrivateMessage = {text: "Hi!", userid: 42}`

  The paper does not take object literal with optional properties into account. To deal with this, the following additional check is added: when assigning an interface with predicates to an object literal with optional properties, the type checker requires that that optional property is a part of the property list of the interface. Additional constraint checks are unnecessary as an _optional_ presence constraint is always true.

* Scoping in if statements: inside if-statements, only `let` declarations should be used, as `var` declarations are also visible outside the if-statement (because of the lack of block scoping in JavaScript). The type checker does not enforce this, yet.

* Currently only presence checks in if statements of the following form are accepted:
  ```javascript
  if(o.m){
    //...
  } else {
    //...
  }
  ```

* The file `paper.ts` contains an extended version of all the code snippets shown in the paper.
