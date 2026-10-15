import { API_BASE_URL } from "./api";
import { getAccessToken } from "./auth";
import { ApiError } from "./errors";

export { ApiError, isApiError } from "./errors";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  // FormData is sent as multipart (fetch sets the header and boundary);
  // anything else is sent as JSON.
  body?: FormData | object;
}

const parseBody = (text: string) => {
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

/**
 * Makes an authenticated request to the API and returns the parsed JSON body
 * (or undefined for an empty response). Throws ApiError on any failure.
 */
export async function request<T = void>(path: string, { method = "GET", body }: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${await getAccessToken()}`,
  };

  let payload: FormData | string | undefined;
  if (body instanceof FormData) {
    payload = body;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { method, headers, body: payload });
  } catch {
    throw new ApiError(0, "서버에 연결할 수 없습니다");
  }

  const json = parseBody(await response.text());
  if (!response.ok) {
    throw new ApiError(response.status, json?.message ?? `Request failed with status ${response.status}`);
  }
  return json as T;
}
