# TypeScript<sub>IPC</sub>

TypeScript<sub>IPC</sub> is an extension of TypeScript, which adds propositional logic to interface declarations to express constraints on the presence of interface properties. This has consequences on how objects with an interface type are created, accessed and updated.

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
```
 let pm: PrivateMessage = {text: "Hi!", userid: 42}
 ```

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

* Usage
```shell
built/local/tsc.js paper.ts --strictNullChecks
```

The file `paper.ts` contains an extended version of all the code snippets shown in the paper.
