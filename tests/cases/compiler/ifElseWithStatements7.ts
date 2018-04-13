interface PM1 {
    text?: string;
} constrains {
    or(present(text), not(present(text)));
}
interface PM2 {
    text?: string;
} constrains {
    present(text);
}

function bar(pm2: PM2) {
    pm2.text;
}
let pm1: PM1 = {};
bar(pm1); //NOK
if (pm1.text) {
    bar(pm1); //OK
}
bar(pm1); //NOK