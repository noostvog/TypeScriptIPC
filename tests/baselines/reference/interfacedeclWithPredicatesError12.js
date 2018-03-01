//// [interfacedeclWithPredicatesError12.ts]

interface UsersShow {
    user_id?: number;
    screen_name?: string;
    text?: string;
} with {
    present(text);
    present(user_id);
    present(screen_name);
    not(present(text));
}

//// [interfacedeclWithPredicatesError12.js]
