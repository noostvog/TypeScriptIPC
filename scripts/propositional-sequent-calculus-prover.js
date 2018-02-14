/*
 * Propositional sequent calculus prover
 *
 * Copyright (c) 2017 Project Nayuki
 * All rights reserved. Contact Nayuki for licensing.
 * https://www.nayuki.io/page/propositional-sequent-calculus-prover
 */
var Prover;
(function (Prover) {
    /*
        function doProve(inputSequent) {
            document.getElementById("inputSequent").value = inputSequent;
    
            var msgElem = document.getElementById("message");
            var codeOutElem = document.getElementById("codeOutput");
            var proofElem = document.getElementById("proof");
            clearChildren(msgElem);
            clearChildren(codeOutElem);
            clearChildren(proofElem);
    
            var proof;
            try {
                var sequent = parseSequent(new Tokenizer(inputSequent));
                proof = prove(sequent);
                msgElem.appendChild(document.createTextNode("Proof:"));
                proofElem.appendChild(proof.toHtml());
    
            } catch (e) {
                if (typeof e == "string") {
                    msgElem.appendChild(document.createTextNode("Error: " + e));
                } else if ("position" in e) {
                    msgElem.appendChild(document.createTextNode("Syntax error: " + e.message));
                    codeOutElem.appendChild(document.createTextNode(inputSequent.substring(0, e.position)));
                    var highlight = document.createElement("u");
                    if (e.position < inputSequent.length) {
                        highlight.appendChild(document.createTextNode(inputSequent.substr(e.position, 1)));
                        codeOutElem.appendChild(highlight);
                        codeOutElem.appendChild(document.createTextNode(inputSequent.substring(e.position + 1, inputSequent.length)));
                    } else {
                        highlight.appendChild(document.createTextNode(" "));
                        codeOutElem.appendChild(highlight);
                    }
                } else {
                    msgElem.appendChild(document.createTextNode("Error: " + e));
                }
            }
        }
    */
    /* Data types */
    /*
     * Constructs a proof tree. Has zero, one, or two children.
     *   sequent: The value at this node - either a sequent or the string "Fail".
     *   left: Zeroth child tree or null.
     *   right: First child tree or null. (Requires left to be not null.)
     */
    var Tree = (function () {
        function Tree(sequent, left, right) {
            if (typeof sequent == "string" && sequent != "Fail" || left == null && right != null)
                throw "Invalid value";
            this.sequent = sequent;
            this.left = left || null;
            this.right = right || null;
        }
        Tree.prototype.getSequent = function () {
            return this.sequent;
        };
        ;
        Tree.prototype.getLeft = function () {
            return this.left;
        };
        ;
        Tree.prototype.getRight = function () {
            return this.right;
        };
        ;
        return Tree;
    }());
    /*
     * Constructs a term. Valid options:
     * - type = "var", left = string name       , right = null
     * - type = "NOT", left = sole argument term, right = null
     * - type = "AND", left = left argument term, right = right argument term
     * - type = "OR" , left = left argument term, right = right argument term
     */
    var Term = (function () {
        function Term(type, left, right) {
            if (!(type == "var" || type == "NOT" || type == "AND" || type == "OR"))
                throw "Invalid type";
            if ((type == "var" || type == "NOT") && right != null || (type == "AND" || type == "OR") && right == null)
                throw "Invalid value";
            this.type = type;
            this.left = left || null;
            this.right = right || null;
        }
        Term.prototype.getType = function () {
            return this.type;
        };
        ;
        Term.prototype.getLeft = function () {
            return this.left;
        };
        ;
        Term.prototype.getRight = function () {
            if (this.type == "var" || this.type == "NOT")
                throw "No such value";
            return this.right;
        };
        ;
        // Returns a string representation of this term, e.g.: "(A ∧ (¬B)) ∨ C".
        // isRoot is an argument for internal use only.
        Term.prototype.toString = function (isRoot) {
            if (this.type == "var")
                return this.left;
            else {
                if (isRoot === undefined)
                    isRoot = true;
                var s = isRoot ? "" : "(";
                if (this.type == "NOT")
                    s += NOT + this.left.toString(false);
                else if (this.type == "AND")
                    s += this.left.toString(false) + " " + AND + " " + this.right.toString(false);
                else if (this.type == "OR")
                    s += this.left.toString(false) + " " + OR + " " + this.right.toString(false);
                else
                    throw "Assertion error";
                s += isRoot ? "" : ")";
                return s;
            }
        };
        ;
        return Term;
    }());
    /*
     * Constructs a sequent.
     *   left : Array of zero or more terms.
     *   right: Array of zero or more terms.
     */
    var Sequent = (function () {
        function Sequent(left, right) {
            this.left = left.slice();
            this.right = right.slice();
        }
        Sequent.prototype.getLeft = function () {
            return this.left.slice();
        };
        Sequent.prototype.getRight = function () {
            return this.right.slice();
        };
        // Returns a string representation of this sequent, e.g.: "¬(A ∧ B) ⊦ C, D ∨ E".
        Sequent.prototype.toString = function () {
            var s = "";
            if (this.left.length == 0)
                s += EMPTY;
            else {
                s += this.left[0].toString();
                for (var i = 1; i < this.left.length; i++)
                    s += ", " + this.left[i].toString();
            }
            s += " " + TURNSTILE + " ";
            if (this.right.length == 0)
                s += EMPTY;
            else {
                s += this.right[0].toString();
                for (var i = 1; i < this.right.length; i++)
                    s += ", " + this.right[i].toString();
            }
            return s;
        };
        return Sequent;
    }());
    /* Sequent prover */
    function prove(sequent) {
        var left = sequent.getLeft();
        var right = sequent.getRight();
        // Try to find a variable that is common to both sides, to try to derive an axiom.
        // This uses a dumb O(n^2) algorithm, but can theoretically be sped up by a hash table or such.
        for (var i = 0; i < left.length; i++) {
            if (left[i].getType() == "var") {
                var name = left[i].getLeft();
                for (var j = 0; j < right.length; j++) {
                    if (right[j].getType() == "var" && right[j].getLeft() == name) {
                        if (left.length > 1 || right.length > 1) {
                            var axiom = new Tree(new Sequent([new Term("var", name)], [new Term("var", name)]), null, null);
                            return new Tree(sequent, axiom, null);
                        }
                        else
                            return new Tree(sequent, null, null);
                    }
                }
            }
        }
        // Try to find an easy operator on left side
        for (var i = 0; i < left.length; i++) {
            var term = left[i];
            var type = term.getType();
            if (type == "NOT") {
                left.splice(i, 1);
                right.push(term.getLeft());
                var seq = new Sequent(left, right);
                return new Tree(sequent, prove(seq), null);
            }
            else if (type == "AND") {
                left.splice(i, 1, term.getLeft(), term.getRight());
                var seq = new Sequent(left, right);
                return new Tree(sequent, prove(seq), null);
            }
        }
        // Try to find an easy operator on right side
        for (var i = 0; i < right.length; i++) {
            var term = right[i];
            var type = term.getType();
            if (type == "NOT") {
                right.splice(i, 1);
                left.push(term.getLeft());
                var seq = new Sequent(left, right);
                return new Tree(sequent, prove(seq), null);
            }
            else if (type == "OR") {
                right.splice(i, 1, term.getLeft(), term.getRight());
                var seq = new Sequent(left, right);
                return new Tree(sequent, prove(seq), null);
            }
        }
        // Try to find a hard operator (OR on left side, AND on right side)
        for (var i = 0; i < left.length; i++) {
            var term = left[i];
            if (term.getType() == "OR") {
                left.splice(i, 1, term.getLeft());
                var seq0 = new Sequent(left, right);
                left = left.slice();
                left.splice(i, 1, term.getRight());
                var seq1 = new Sequent(left, right);
                return new Tree(sequent, prove(seq0), prove(seq1));
            }
        }
        for (var i = 0; i < right.length; i++) {
            var term = right[i];
            if (term.getType() == "AND") {
                right.splice(i, 1, term.getLeft());
                var seq0 = new Sequent(left, right);
                right = right.slice();
                right.splice(i, 1, term.getRight());
                var seq1 = new Sequent(left, right);
                return new Tree(sequent, prove(seq0), prove(seq1));
            }
        }
        // No operators remaining, and not an axiom
        return new Tree(sequent, new Tree("Fail", null, null), null);
    }
    /* Parser functions */
    function parseSequent(tok) {
        var lhs = [];
        var rhs = [];
        // Parse left side
        var expectComma = false;
        while (true) {
            var next = tok.peek();
            if (next == TURNSTILE) {
                tok.consume(TURNSTILE);
                break;
            }
            else if (next == null)
                throw { message: "Comma or turnstile expected", position: tok.position() };
            else {
                if (expectComma) {
                    if (next == ",")
                        tok.consume(",");
                    else
                        throw { message: "Comma expected", position: tok.position() };
                    if (tok.peek() == null)
                        throw { message: "Term expected", position: tok.position() };
                }
                else {
                    if (tok.peek() != ",")
                        expectComma = true;
                    else
                        throw { message: "Term or turnstile expected", position: tok.position() };
                }
                var term = parseTerm(tok);
                if (term != null)
                    lhs.push(term);
            }
        }
        // Parse right side
        expectComma = false;
        while (true) {
            var next = tok.peek();
            if (next == null)
                break;
            else if (next == TURNSTILE)
                throw { message: "Turnstile not expected", position: tok.position() };
            else {
                if (expectComma) {
                    if (next == ",")
                        tok.consume(",");
                    else
                        throw { message: "Comma expected", position: tok.position() };
                    if (tok.peek() == null)
                        throw { message: "Term expected", position: tok.position() };
                }
                else {
                    if (tok.peek() != ",")
                        expectComma = true;
                    else
                        throw { message: "Term or end expected", position: tok.position() };
                }
                var term = parseTerm(tok);
                if (term != null)
                    rhs.push(term);
            }
        }
        return new Sequent(lhs, rhs);
    }
    // Parses and returns a term, or null if the leading token is the empty symbol.
    function parseTerm(tok) {
        if (tok.peek() == EMPTY) {
            tok.consume(EMPTY);
            return null;
        }
        // Mutant LR parser with deferred reductions
        var stack = []; // The stack consists of terms (variables/subexpressions) and strings (operators)
        function reduce() {
            while (true) {
                if (stack.length >= 2 && stack[stack.length - 2] == NOT) {
                    var term = stack.pop();
                    stack.pop(); // NOT
                    stack.push(new Term("NOT", term));
                }
                else if (stack.length >= 3 && stack[stack.length - 2] == AND) {
                    var right = stack.pop();
                    stack.pop(); // AND
                    var left = stack.pop();
                    stack.push(new Term("AND", left, right));
                }
                else
                    break;
            }
        }
        function finalReduce() {
            while (true) {
                if (stack.length >= 3 && stack[stack.length - 2] == OR) {
                    var right = stack.pop();
                    stack.pop(); // OR
                    var left = stack.pop();
                    stack.push(new Term("OR", left, right));
                }
                else
                    break;
            }
        }
        function checkBeforePushingUnary() {
            if (!(stack.length == 0 || typeof stack[stack.length - 1] == "string"))
                throw { message: "Unexpected item", position: tok.position() };
        }
        function checkBeforePushingBinary() {
            if (stack.length == 0 || typeof stack[stack.length - 1] == "string")
                throw { message: "Unexpected item", position: tok.position() };
        }
        while (true) {
            var next = tok.peek();
            if (next == null || next == TURNSTILE || next == ",")
                break;
            else if (/^[A-Za-z][A-Za-z0-9]*$/.test(next)) {
                checkBeforePushingUnary();
                stack.push(new Term("var", tok.take()));
                reduce();
            }
            else if (next == NOT) {
                checkBeforePushingUnary();
                stack.push(tok.take());
            }
            else if (next == AND) {
                checkBeforePushingBinary();
                stack.push(tok.take());
            }
            else if (next == OR) {
                checkBeforePushingBinary();
                if (stack.length >= 3 && stack[stack.length - 2] == OR) {
                    var right = stack.pop();
                    stack.pop(); // OR
                    var left = stack.pop();
                    stack.push(new Term("OR", left, right));
                }
                stack.push(tok.take());
            }
            else if (next == "(") {
                checkBeforePushingUnary();
                stack.push(tok.take());
            }
            else if (next == ")") {
                finalReduce();
                if (stack.length < 2 || stack[stack.length - 2] != "(")
                    throw { message: "Binary operator without second operand", position: tok.position() };
                tok.consume(")");
                stack.splice(stack.length - 2, 1);
                reduce();
            }
            else if (next == EMPTY)
                throw { message: "Empty not expected", position: tok.position() };
            else
                throw "Assertion error";
        }
        finalReduce();
        if (stack.length == 1)
            return stack[0];
        else if (stack.length == 0)
            throw { message: "Blank term", position: tok.position() };
        else
            throw { message: "Binary operator without second operand", position: tok.position() };
    }
    /* Tokenizer object */
    // Tokenizes a formula into a stream of token strings.
    function Tokenizer(str) {
        var i = 0;
        // Returns the index of the next character to tokenize.
        this.position = function () {
            return i;
        };
        // Returns the next token as a string, or null if the end of the token stream is reached.
        this.peek = function () {
            if (i == str.length)
                return null;
            var match = /^([A-Za-z][A-Za-z0-9]*|[,()!&|>\u2205\u00AC\u2227\u2228\u22A6]| +)/.exec(str.substring(i));
            if (match == null)
                throw { message: "Invalid symbol", position: i };
            // Normalize notation
            var token = match[0];
            if (token == "!")
                token = NOT;
            else if (token == "&")
                token = AND;
            else if (token == "|")
                token = OR;
            else if (token == ">")
                token = TURNSTILE;
            return token;
        };
        // Returns the next token as a string and advances this tokenizer past the token.
        this.take = function () {
            var result = this.peek();
            if (result == null)
                throw "Advancing beyond last token";
            i += result.length;
            skipSpaces();
            return result;
        };
        // Takes the next token and checks that it matches the given string, or throws an exception.
        this.consume = function (s) {
            if (this.take() != s)
                throw "Token mismatch";
        };
        function skipSpaces() {
            var match = /^[ \t]*/.exec(str.substring(i));
            i += match[0].length;
        }
        skipSpaces();
    }
    /* Miscellaneous */
    // Unicode character constants (because this script file's character encoding is unspecified)
    var TURNSTILE = "\u22A6";
    var EMPTY = "\u2205";
    var NOT = "\u00AC";
    var AND = "\u2227";
    var OR = "\u2228";
    // Removes all the children of the given DOM node.
    /*    function clearChildren(node) {
            while (node.firstChild != null)
                node.removeChild(node.firstChild);
        }*/
    function proveString(inputSequent) {
        var sequent = parseSequent(new Tokenizer(inputSequent));
        try {
            /* var proof = */ prove(sequent);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    Prover.proveString = proveString;
})(Prover || (Prover = {}));
;
