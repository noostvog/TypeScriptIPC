// @strictNullChecks: true

interface UsersShow{
    user_id?: number;
    screen_name?: string;
    text?: string;
} constrains {
    or(and(present(user_id), not(present(screen_name))),
       and(present(screen_name), not(present(user_id))));
}