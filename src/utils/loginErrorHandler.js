const loginErrorFormatter = (error) => {
    switch (error) {
        case "INVALID_PASSWORD":
            return "Helytelen jelszó."
        case "EMAIL_NOT_FOUND":
            return "Nem megfelelő email cím."
        case "USER_DISABLED":
            return "Felhasználó elutasítva."
        case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
            return "Túl sok próbálkozás, próbálkozz újra később."
        default:
            return "Sikertelen bejelentkezés."
    }
}

export default loginErrorFormatter;

