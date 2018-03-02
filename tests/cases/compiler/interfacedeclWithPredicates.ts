// @strictNullChecks: true

interface UsersShow{
    user_id?: number;
    screen_name?: string;
    text?: string;
} constrains {
    xor(present(user_id), present(screen_name));
    //type(user_id) == number; // obsolete but to test syntax
    //type(screen_name) == string; // obsolete but to test syntax
    //type(text) == string; // obsolete but to test syntax
}