# TypeScript<sub>IPC</sub>
TypeScript<sub>IPC</sub> is a variant of TypeScript in which complex dependency constraints on properties of interfaces can be expressed.

  * [Getting and building TypeScript<sub>IPC</sub>](#getting-and-building-typescriptipc)
  * [Running TypeScript<sub>IPC</sub>](#running-typescriptipc)
  * [Virtual Machine](#virtual-machine)
  * [Tutorial: programming with inter-property constraints](#tutorial-programming-with-inter-property-constraints)
    + [Defining interfaces with constraints](#defining-interfaces-with-constraints)
    + [Object creation](#object-creation)
    + [Property access](#property-access)
    + [Property update](#property-update)
    + [Assignment](#assignment)
  * [Differences between the implementation and the formalisation](#differences-between-the-implementation-and-the-formalisation)
  * [Mapping of formalisation onto implementation](#mapping-of-formalisation-onto-implementation)
  * [Running tests](#running-tests)

## Getting and building TypeScriptIPC
Before building TypeScript<sub>IPC</sub>, make sure `node`, `npm` (at least version 5.7.1, to support `npm ci`) and `git` are installed.

Run the following commands to build TypeScript<sub>IPC</sub>:
```
git clone -b aec https://github.com/noostvog/TypeScriptIPC.git
cd TypeScriptIPC
npm install -g gulp
npm ci
gulp local
```

## Running TypeScriptIPC
To run a TypeScript<sub>IPC</sub> file, use the following command. 
```
node built/local/tsc.js paper.ts --strictNullChecks
```
The file `paper.ts` contains all code examples from the paper. The file `examples/correct.ts` should type check without errors. In case of errors, it might help to run the command without relative paths (to avoid running with different versions of `node` and `npm` dependencies).

There are several `gulp` *shortcuts* for running files in TypeScript<sub>IPC</sub>: `gulp runpaper` runs TypeScript<sub>IPC</sub> with `paper.ts` and `gulp runcorrect` with `examples/correct.ts`.
To run a TypeScript<sub>IPC</sub>, use `gulp run --file yourfile.ts`, which is identical to the command above.

## Virtual Machine
A virtual machine with a built version of TypeScript<sub>IPC</sub> can be found here: [here](http://soft.vub.ac.be/~noostvog/typescriptipc/TypeScriptIPC.ova.zip) . The username is `ecoop`, and the password is `ecoop` as well.

TypeScript<sub>IPC</sub> can be found in `Documents/TypeScriptIPC`.

## Tutorial: programming with inter-property constraints
TypeScript<sub>IPC</sub> allows programmers to express a dependency logic between het presence of properties, using propositional logic. Moreover, it enforces these enforcing complex dependency logic defined by the programmer when an object is created, accessed or modified.

The `examples` directory contains all code snippets in this tutorial, as well as extra examples.
### Defining interfaces with constraints
An interface is defined as shown below. This interface defines a PrivateMessage (https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/new-message).
The first part of the interface is identical to the default TypeScript interface. The second part indicates the constraints on the presence of the properties. Constraints are composed using logical operators (and, or, not, implic, iff). Next to the message itself (which is a required field, cfr. the first constraint), the interface has two properties to indicate the receiver. However, only (and exactly) one of these two properties should be present. This is enforced using the second constraint.
```typescript
//File: examples/definitions.ts
//gulp runexample --example definitions.ts
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
 When inter-property constraints are defined, all properties must be indicated as optional in the first part, as the constraints on the presence of those properties are defined below. The second part of the interface must contain at least one constraint in order to not be treated as a regular TypeScript interface.

The files `examples/defintions_extra_correct.ts` and `examples/defintions_extra_incorrect.ts` contain extra examples of interface definitions.

### Object creation
Objects can only be of an interface type when they satisfy all its constraints:

```typescript
//File: examples/object_creation.ts
//gulp runexample --example object_creation.ts
let msg1: PrivateMessage = {text: "Hello", userid: 42}; //OK
let msg2: PrivateMessage = {text: "Hello"}; //ERROR
let msg3: PrivateMessage = {text: "Hello", userid: 42, screenname: "Alice"}; //ERROR
```

The files `examples/object_creation_extra_correct.ts`  and `examples/object_creation_extra_incorrect.ts` contain extra examples of interface definitions.

### Property access
Object properties of an interface type with constraints can only be accessed when those properties are known to be present, or absent. When the property is present, it receives the intended type. When the property is absent, it receives the `undefined` type.

To prevent errors from accessing undefined properties, programmers must verify whether they are present before using them. This can be done using if statements. The type system combines the extra knowledge from the if statement with the existing constraints:
```typescript
//File: examples/property_access.ts
//gulp runexample --example property_access.ts
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
The files `examples/property_access_update_extra_correct.ts` and `examples/property_access_update_extra_correct.ts` contain examples of property accesses for other interfaces.
### Property update
Updating a property that was already guaranteed to be present is safe. Only `undefined` can be assigned to properties that are known to be absent.
```typescript
//File: examples/property_update.ts
//gulp runexample --example property_update.ts
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
Updating multiple properties at once (for example to switch between the user ID and the screen name) can be done using a new built-in function `objupdate`. Note that this function is functional.
```typescript
let msg6: PrivateMessage = {text: "Hello", userid: 42};
let msg7: PrivateMessage = objupdate(msg6, {userid: undefined, screenname: "Alice"}); //OK
```
The files `examples/property_access_update_extra_correct.ts` and `examples/property_access_update_extra_correct.ts` contain examples of property updates for other interfaces.

### Assignment
Next to assigning object literals to interfaces, it is of course also possible to assign objects with interface types to each other and to assign interface instances to object literal types. TypeScript<sub>IPC</sub> ensures that no constraints are violated during these assignments. Examples can be found in `examples/property_assign.ts` (for `PrivateMessage` variants) and in `examples/property_assign_extra_correct.ts` and `examples/property_assign_extra_incorrect.ts` (for variants of other interfaces).

## Differences between the implementation and the formalisation
Because TypeScript<sub>IPC</sub> is implemented on top of TypeScript (version 2.1.6), there are some differences between the implementation and the formalisation.

* In order to stay consistent with existing TypeScript programs, we did not replace the existing interface definition of TypeScript with the interface definitions from the paper. Instead, required and optional properties can still be expressed in this implementation. Constraints are an optional extension of interfaces, and should always be combined with properties which are all optional (required properties are not taken into consideration when there is a constraints section). Properties of interfaces with constraints should not have the type "undefined". The interface must contain at least one constraint for it to be considered an _interface with constrainst_ (if there are no presence constraints on any of the objects, this can be circumvented by adding an `or(present(x), not(present(x))))` constraint). For example, the running example from the paper should be defined as follows (underscores in property names are not supported yet):

  ```typescript
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

* To prevent the existence of _hidden_ properties in objects, the paper limits the creation of objects with as type an interface to the cast of an object literal to that interface.
Since TypeScript 1.6, object literals cannot contain extra properties anymore. However, it is still possible to have _hidden_ properties when a variable with an interface type is assigned to a variable with an object type (literal or interface). Therefore, our implementation still limits these assignments.
Variables with interface types can only be assigned to each other if both have or lack constraints.

* Casts are currently not supported, and should not be used in combination with interfaces with constraints.
  Instead of `<PrivateMessage> {text: "Hi!", userid: 42}` use an assignment:
  `let pm: PrivateMessage = {text: "Hi!", userid: 42}`

* The paper does not take object literals with optional properties into account. To deal with this, the following additional check is added: when assigning an interface with predicates to an object literal with optional properties, the type checker requires that that optional property is a part of the property list of the interface. Additional constraint checks are unnecessary as an _optional_ presence constraint is always true.

* In the formalisations, extra constraints extracted from the if statement condition are added to a new type (`I+` or `I-`). These types are assigned to the object in the `then` resp. `else` branch. As assigning a new type to a variable is a non-trivial task in the implementation of the TypeScript typechecker, our implementation takes a different approach: for every object with a special interface type, the type system checks whether the object access happens inside an if-statement that contains extra information about the object. If that is the case, this information is taken into account when type checking that object.

* Scoping in if statements: inside if-statements, only `let` declarations should be used, as `var` declarations are also visible outside the if-statement (because of the lack of block scoping in JavaScript). The type checker does not enforce this, yet.

* Currently only presence checks in if statements of the following form are accepted:
  ```typescript
  if(o.m){
    //...
  } else {
    //...
  }
  ```

* `objupdate` only accepts objects with special interface types

## Mapping of formalisation onto implementation
The adaptations to the TypeScript type system are scattered throughout many files and code lines. The following table gives an overview of most of the changes to the type system: 

What | Implementation (`src/compiler/checker.ts`)
--- | ---
Interface definition | `checkInterfaceDeclaration`
Inheritance | `resolveObjectTypeMembers`
Creation (adapted I-AssertInf) | `predicatesRelatedTo`
Assignability (A-Interface) | `predicatesRelatedTo`
Assignability (A-IntObj) | `predicatesRelatedTo`
Objupdate (I-UpdateInf) | `checkObjectUpdate`
Lookup (I-Prop)| `checkPropertyAccessExpressionOrQualifiedName` 
Extra info from if statements (I-IfPresenceInterface) | `checkIdentifier` + `checkIfStatement`

## Running tests
The test suite of TypeScriptIPC contains all TypeScript tests, but also contains extra tests to test all aspects of programming with interfaces.

To verify the correctness of all tutorial files, run the following commands:
```
gulp tests
gulp runtests -t "tutorial" --lint=false
```

To run all compiler tests of TypeScript, run the following commands: 
```
gulp tests
gulp runtests -t "/compiler" --lint=false
```

When running _all_ tests (`gulp runtests`), it is normal that some tests fail. These tests are unrelated to the correctness of the type system. 

```
  1) fourslash tests tests/cases/fourslash/commentsClassMembers.ts fourslash test commentsClassMembers.ts runs correctly:
       TypeError: undefined is not iterable
        at getJSDocTags

  2) fourslash tests tests/cases/fourslash/commentsCommentParsing.ts fourslash test commentsCommentParsing.ts runs correctly:
       TypeError: undefined is not iterable
        at getJSDocTags

  3) fourslash tests tests/cases/fourslash/commentsFunctionDeclaration.ts fourslash test commentsFunctionDeclaration.ts runs correctly:
       TypeError: undefined is not iterable
        at getJSDocTags

  4) fourslash tests tests/cases/fourslash/commentsFunctionExpression.ts fourslash test commentsFunctionExpression.ts runs correctly:
       TypeError: undefined is not iterable
        at getJSDocTags

  5) fourslash tests tests/cases/fourslash/commentsInheritance.ts fourslash test commentsInheritance.ts runs correctly:
       TypeError: undefined is not iterable
        at getJSDocTags

  6) fourslash tests tests/cases/fourslash/commentsInterface.ts fourslash test commentsInterface.ts runs correctly:
       TypeError: undefined is not iterable
        at getJSDocTags

  7) fourslash tests tests/cases/fourslash/commentsOverloads.ts fourslash test commentsOverloads.ts runs correctly:
       TypeError: undefined is not iterable
        at getJSDocTags

  8) fourslash tests tests/cases/fourslash/indentationWithBaseIndent.ts fourslash test indentationWithBaseIndent.ts runs correctly:
       Error: Marker: 
    verifyIndentationAtPosition failed at line 195, col 0 - expected: 21, actual: 25
        at TestState.raiseError (fourslash.ts:417:19)

  9) fourslash tests tests/cases/fourslash/jsDocFunctionSignatures12.ts fourslash test jsDocFunctionSignatures12.ts runs correctly:
       TypeError: undefined is not iterable
        at getJSDocTags

  10) fourslash tests tests/cases/fourslash/jsDocFunctionSignatures9.ts fourslash test jsDocFunctionSignatures9.ts runs correctly:
       TypeError: undefined is not iterable
        at getJSDocTags

  11) fourslash tests tests/cases/fourslash/smartIndentInterface.ts fourslash test smartIndentInterface.ts runs correctly:
       Error: Marker: 
    verifyIndentationAtPosition failed at line 8, col 0 - expected: 0, actual: 4
        at TestState.raiseError (fourslash.ts:417:19)

```