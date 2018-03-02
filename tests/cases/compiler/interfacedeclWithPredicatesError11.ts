// @strictNullChecks: true

interface UsersShow {
    user_id?: number;
    screen_name?: undefined;
    text?: string;
} constrains {
    present(text);
    present(user_id);
    present(screen_name);
}