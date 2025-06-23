export const prefix = "doomscrolling-app:";

export namespace CookieUtilsInterface {
  export interface FindCallbackParams {
    (cookie: string): boolean;
  }
}

function getCookiesFromNavigator() {
  return document.cookie.split(";");
}

export const cookie = {
  set(name: string, value: unknown, days = 360): void {
    let expires = "";

    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days + 24 * 60 * 60 * 1000); // days in milliseconds
      expires = `; expires=${date.toUTCString()}`;
    }

    document.cookie = `${prefix}${name}=${value || ""}${expires}; path/`;
  },
  get<T>(name: string): string | null | T {
    const key = `${prefix}${name}=`;
    const cookies = getCookiesFromNavigator();

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];

      while (cookie.charAt(0) === " ")
        cookie = cookie.substring(1, cookie.length);

      if (cookie.indexOf(key) === 0) {
        return cookie.substring(key.length, cookie.length);
      }
    }

    return null;
  },
  find<T>(
    callback: CookieUtilsInterface.FindCallbackParams
  ): string | Record<string, unknown> | null | T {
    const cookies = getCookiesFromNavigator();

    let cookie = cookies.find((cookie) => callback(cookie.trim()));

    if (!cookie) {
      return null;
    }

    const value = cookie.split("=")[1];

    return JSON.parse(value);
  },
  destroy(name: string) {
    document.cookie = `${prefix}${name}=; Max-Age=-1; path=/;`;
  },
};
