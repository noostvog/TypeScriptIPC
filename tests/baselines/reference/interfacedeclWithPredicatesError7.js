//// [interfacedeclWithPredicatesError7.ts]

interface UsersShow{
    user_id?: number;
    screen_name?: string;
    text?: string;
} constrains {
    present(unknown);
}


//// [interfacedeclWithPredicatesError7.js]
