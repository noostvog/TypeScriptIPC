//// [interfacedeclWithPredicatesError4.ts]

interface UsersShow{
    user_id?: number;
    screen_name?: string;
    text?: string;
} constrains {
    type(bla) == 5;
}

//// [interfacedeclWithPredicatesError4.js]
