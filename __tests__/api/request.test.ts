import { ApiError, isApiError, request } from "@/api/request";
import { API_BASE_URL } from "@/api/api";

jest.mock("@/api/auth", () => ({
  getAccessToken: jest.fn().mockResolvedValue("token"),
}));

const mockFetch = (status: number, body = "") => {
  global.fetch = jest.fn().mockResolvedValue(new Response(body || null, { status }));
}

describe("request", () => {
  it("returns the parsed JSON body", async () => {
    mockFetch(200, JSON.stringify({ name: "민준" }));
    await expect(request("/student")).resolves.toEqual({ name: "민준" });
  });

  it("returns undefined for an empty body", async () => {
    mockFetch(204);
    await expect(request("/dictionary/1", { method: "DELETE" })).resolves.toBeUndefined();
  });

  it("sends the auth token and path", async () => {
    mockFetch(200, "{}");
    await request("/me");
    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/me`, expect.objectContaining({
      method: "GET",
      headers: { "Authorization": "Bearer token" },
    }));
  });

  it("sends objects as JSON", async () => {
    mockFetch(200);
    await request("/feed/abc", { method: "POST", body: { body: "hi" } });
    const [, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(init.headers["Content-Type"]).toBe("application/json");
    expect(init.body).toBe(JSON.stringify({ body: "hi" }));
  });

  it("sends FormData without setting Content-Type", async () => {
    mockFetch(200);
    const formData = new FormData();
    await request("/dictionary", { method: "POST", body: formData });
    const [, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(init.headers["Content-Type"]).toBeUndefined();
    expect(init.body).toBe(formData);
  });

  it("throws ApiError with the server's message", async () => {
    mockFetch(404, JSON.stringify({ message: "Student not found" }));
    const error = await request("/student").catch(e => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 404, message: "Student not found" });
  });

  it("throws ApiError with a fallback message when the error body isn't JSON", async () => {
    mockFetch(500, "<html>Internal Server Error</html>");
    await expect(request("/student")).rejects.toMatchObject({
      status: 500,
      message: "Request failed with status 500",
    });
  });

  it("throws ApiError with status 0 when the server can't be reached", async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError("Network request failed"));
    await expect(request("/student")).rejects.toMatchObject({ status: 0 });
  });
});

describe("isApiError", () => {
  it("matches ApiErrors, optionally by status", () => {
    const error = new ApiError(404, "Not found");
    expect(isApiError(error)).toBe(true);
    expect(isApiError(error, 404)).toBe(true);
    expect(isApiError(error, 500)).toBe(false);
    expect(isApiError(new Error("other"))).toBe(false);
  });
});
