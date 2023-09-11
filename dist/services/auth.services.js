"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleUserInfos = exports.getGoogleLoginLink = void 0;
const googleapis_1 = require("googleapis");
const GoogleOAuth2 = googleapis_1.google.auth.OAuth2;
const getGoogleLoginLink = async () => {
    const oauth2Client = newGoogleOauth2();
    const loginLink = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ],
    });
    return loginLink;
};
exports.getGoogleLoginLink = getGoogleLoginLink;
const getGoogleUserInfos = async (code) => {
    const oauth2Client = newGoogleOauth2();
    const token = await oauth2Client.getToken(code);
    if (!token)
        throw new Error('Invalid token');
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('JWT secret is not defined');
    oauth2Client.credentials = token.tokens;
    const oauth2 = googleapis_1.google.oauth2({
        auth: oauth2Client,
        version: 'v2',
    });
    const { data } = await oauth2.userinfo.get();
    return data;
};
exports.getGoogleUserInfos = getGoogleUserInfos;
function newGoogleOauth2() {
    return new GoogleOAuth2(process.env.GOOGLE_ClientID, process.env.GOOGLE_ClientSecret, process.env.GOOGLE_REDIRECT_URI);
}
