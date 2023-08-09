export function baseNameReader(item) {
    return item == "email"
        ? "Email cím:" :
        item == "firstName"
            ? "Keresztnév:" :
            item == "lastName"
                ? "Vezetéknév:" :
                item == "username"
                    ? "Becenév:" :
                    item == "zipCode"
                        ? "Irányítószám" :
                        item == "city"
                            ? "Város" :
                            item == "state"
                                ? "Megye" :
                                item == "street"
                                    ? "Utca" :
                                    item == "houseNumber"
                                        ? "Házszám" :
                                        item == "moreInfo"
                                            ? "Egyéb információ"
                                            : ""
}