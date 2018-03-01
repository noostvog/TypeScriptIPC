//// [interfacedeclWithPredicatesError14.ts]

interface UsersShow{
    user_id?: number;
    screen_name?: string;
    text?: string;
} with {
    present(text);
    or(and(present(user_id), not(present(screen_name))),
        and(present(screen_name), not(present(user_id))));

}

interface UsersShow2 extends UsersShow{
    //... inherit everything
} with {
    present(screen_name);
    present(user_id);
}

//// [interfacedeclWithPredicatesError14.js]
