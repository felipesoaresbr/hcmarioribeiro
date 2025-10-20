import csrf from "csurf";
import dotenv from "dotenv";

dotenv.config();

const csrfProtection = csrf({
    cookie: {
        key: "_csrf",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    }
});

export default csrfProtection;