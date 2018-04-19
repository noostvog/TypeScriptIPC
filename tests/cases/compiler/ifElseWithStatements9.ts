// @strictNullChecks: true
interface PM1 {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    or(present(text), not(present(text)));
}
interface PM2 {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
    or(and(present(userid), not(present(screenname))),
        and(not(present(userid)), present(screenname)));
}

function bar(pm2: PM2) {
    pm2.text;
}
let pm1: PM1 = {};
bar(pm1); //NOK
if (pm1.text) {
    bar(pm1); //NOK
    if (pm1.screenname) {
        bar(pm1); //NOK
        if (pm1.userid) {
            bar(pm1); //NOK
        } else {
            bar(pm1); //OK
        }
        bar(pm1); //NOK
    } else {
        bar(pm1); //NOK
        if (pm1.userid) {
            bar(pm1); //OK
        } else {
            bar(pm1); //NOK
        }
        bar(pm1); //NOK
    }
    bar(pm1); //NOK
}
bar(pm1); //NOK