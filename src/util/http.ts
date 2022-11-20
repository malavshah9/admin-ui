import COPY_TEXT from "@util/copyText";

const API_BASE = import.meta.env.VITE_API_BASE;


async function http(
  endpoint: string,
  options?: RequestInit,
) {

  const config: RequestInit = {
    ...options,
  }

  return window.fetch(`${API_BASE}${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      return Promise.reject({message: COPY_TEXT.ERRORS.loginAgain})
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export default http
