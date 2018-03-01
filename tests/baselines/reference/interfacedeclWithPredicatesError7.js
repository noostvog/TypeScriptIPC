//// [interfacedeclWithPredicatesError7.ts]

interface UsersShow{
    user_id?: number;
    screen_name?: string;
    text?: string;
} with {
    present(unknown);
}


//// [interfacedeclWithPredicatesError7.js]
