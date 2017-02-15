//// [interfacedeclWithPredicatesError1.ts]
interface UsersShow{
    user_id?: number;
    screen_name?: string;
    text: string;
} with {
    5;
}

//// [interfacedeclWithPredicatesError1.js]
