export const getCookie = (): string | undefined => {
  return document.cookie.split(';').pop()?.split('access_token=').pop()
}

export const setCookie = (token: string): void => {
  document.cookie = `access_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`
}