//// [interfacedeclWithPredicatesError5.ts]

interface UsersShow{
    user_id?: number;
    screen_name?: string;
    text?: string;
} with {
    //type(bla) == string;
}

//// [interfacedeclWithPredicatesError5.js]
