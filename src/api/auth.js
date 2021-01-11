import adminInfo from "./json/adminInfo.json";
import userInfo from "./json/userInfo.json";

export const tokens = {
  admin: "FFB61F5E-FC3E-4D02-81F4-4BA2C78920DA",
  other: "A5526404-BB1B-4E01-AEBA-03E0C85B6177"
};

export function login({ username, password }) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (username === "admin" && password === "123456") {
        resolve({
          access_token: tokens.admin,
          refresh_token: "75B0D88F-4F92-4271-918A-62705A84E34E"
        });
      } else {
        resolve({
          access_token: tokens.other,
          refresh_token: "7014A04E-C766-476C-A16D-18B7C4857716"
        });
      }
    }, 100);
  });
}

export function fetchUserInfo(_, username) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([false, username === "admin" ? adminInfo : userInfo]);
    }, 100);
  });
}
