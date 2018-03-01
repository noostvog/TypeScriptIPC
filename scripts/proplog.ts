/*
  This software is covered by the MIT licence, see http://opensource.org/licenses/MIT
  or http://en.wikipedia.org/wiki/MIT_License

  Copyright (c) 2015 Tanel Tammet (tanel.tammet at gmail.com)
*/

/// <reference path="proplog_convert.ts"/>
/// <reference path="proplog_dpll.ts"/>
/// <reference path="proplog_parse.ts"/>

namespace Proplog {

        export function solve(txt: string, trace_method: string): boolean {


            trace_method;
            let parsed;
            let converted;
            let maxvar;
            let clauses
            let res;
            let origvars;
            parsed=Proplog_parse.parse(txt);
            origvars=[];


            if (typeof parsed[0]=="number") {
                // dimacs
                clauses=parsed;
                maxvar=clauses.shift();
            } else if (parsed[0]==="error") {
                // err
                return;
            } else {
                // formula
                converted=Proplog_convert.formula_to_cnf(parsed);
                converted=Proplog_convert.rename_vars_in_clauses(converted);
                maxvar=converted[0];
                clauses=converted[1];
                origvars=converted[2];
            }


            res=Proplog_dpll.dpll(clauses,maxvar,trace_method,origvars);

            return res[0];
        }
}
