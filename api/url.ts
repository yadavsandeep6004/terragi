export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error("Base url not specified");
}

export const REFRESH_TOKEN = "auth/token/refresh";
export const LOGIN_URL = "auth/login";
export const SIGNUP_URL = "auth/register";

export const LANDING = "landing";
export const RAZORPAY_SDK_URL = "https://checkout.razorpay.com/v1/checkout.js";

export const CREATE_ORDERS_URL = "orders/create";
export const VERIFY_ORDERS_URL = "orders/verify";

export const GET_USER = "users";
export const USER_STATS = "users/stats";
export const SEND_OTP = "auth/otp/send";
export const FORGOT_PASS_SEND_OTP = "auth/otp/send/forgotpassword";
export const PROFILE = "users";
export const UPLOAD_IMAGE = "users/profile-image/upload";
export const RESET_PASSWORD = "auth/password/update";

export const GET_LEADS = "leads";
export const GET_PROPERTIES = "properties";
export const GET_LOCATIONS = "localities";
export const GET_BUILDERS = "properties/builders";

export const GET_CONFIGS = "config";

export const GET_BOOKMARKS = "bookmarks";
export const GET_SAVED_PROPERTIES = "saved-properties";
export const POST_BOOKMARKS = "saved-properties";
export const REMOVE_BOOKMARK = "saved-properties";

export const CREATE_LEAD = "leads";
export const DELETE_LEAD = "leads";
export const UPDATE_LEAD = "leads";

export const CREATE_COMMUNITY_POST_URL = "posts";
export const GET_COMMUNITY_POSTS = "posts/search";
export const GET_COMMUNITY_SECTION_CONFIG = "properties/config";

export const POST_EVENTS = "events";

export const GET_SHOWED_PROPERTIES = "saved-properties";

export const GET_SOCIETIES = "societies";

export const CONNECT_99ACRES = "/leads/credentials";

export const DISCONNECT_PORTAL = "/users/disconnect/portal";

export const CONTACTS_US = "/contactus";
