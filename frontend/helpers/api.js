export const fetchData = async (url, method = "GET", data = {}) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: method === "GET" ? undefined : JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Fetch error:", error.message);
        throw error;
    }
};

export const checkAndUpdate = async (url, data = {}, userId) => {
    try {
        // Check if entry exists for the user
        const response = await fetch(`${url}/`);
        if (response.ok) {
            const existingData = await response.json();
            const existingEntry = existingData.find(
                (entry) => Number(entry.user_id) === Number(userId)
            );
            if (existingEntry) {
                // Jeśli istnieje wpis, zaktualizuj go za pomocą PATCH
                await fetchData(`${url}/${existingEntry._id}`, "PATCH", data);
            } else {
                // Jeśli nie istnieje wpis, utwórz nowy za pomocą POST
                await fetchData(url, "POST", data);
            }
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
};

export const checkAndRegister = async (
    url,
    data = {},
    userLogin,
    updateProps
) => {
    try {
        const response = await fetch(`${url}/`);
        if (response.ok) {
            const existingData = await response.json();
            const existingEntry = existingData.find(
                (entry) =>
                    entry.userName.toLowerCase() === userLogin.toLowerCase()
            );
            if (existingEntry) {
                updateProps({
                    show: true,
                    color: "red",
                    title: "Wystąpił błąd.",
                    text: "Taki użytkownik już istnieje, spróbuj się zalogować.",
                });
            } else {
                await fetchData(url, "POST", data);
                updateProps({
                    show: true,
                    color: "green",
                    title: "Udało się.",
                    text: "Użytkownik został zarejestrowany.",
                });

                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            }
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
};

export const checkAndLogin = async (
    url,
    data = {},
    userLogin,
    userPassword,
    updateProps,
    navigateToMenu
) => {
    try {
        const response = await fetch(`${url}/`);
        if (response.ok) {
            const existingData = await response.json();
            const existingEntry = existingData.find(
                (entry) =>
                    entry.userName === userLogin &&
                    entry.password === userPassword
            );
            if (existingEntry) {
                localStorage.setItem("login", userLogin);
                navigateToMenu(); // Wywołanie funkcji nawigacji do menu
            } else {
                updateProps({
                    show: true,
                    text: "Wystąpił błąd..",
                    color: "red",
                    title: "Dane logowania są niepoprawne.",
                });
            }
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
};
