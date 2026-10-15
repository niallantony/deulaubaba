// Demo mode swaps Auth0 and the Spring API for a mock login and an in-memory
// backend, so the app can be shown without any deployed infrastructure.
// Set EXPO_PUBLIC_DEMO_MODE=false to use the real Auth0 + server flow.
export const DEMO_MODE = process.env.EXPO_PUBLIC_DEMO_MODE !== "false";
