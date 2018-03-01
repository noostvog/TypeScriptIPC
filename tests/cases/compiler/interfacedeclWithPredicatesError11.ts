// @strictNullChecks: true

interface UsersShow {
    user_id?: number;
    screen_name?: undefined;
    text?: string;
} with {
    present(text);
    present(user_id);
    present(screen_name);
}