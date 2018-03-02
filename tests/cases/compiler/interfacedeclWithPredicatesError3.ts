// @strictNullChecks: true

interface UsersShow{
    user_id?: number;
    screen_name?: string;
    text?: string;
} constrains {
    type(5) == string;
}