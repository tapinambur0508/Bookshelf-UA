// Extracts error message from API errors, falls back to default if extraction fails
export function getErrorMessage(error: unknown, defaultMessage: string): string {
  if (error !== null && error !== undefined && typeof error === "object" && "response" in error) {
    const response = error.response as { data?: { error?: string } };
    if (response?.data?.error !== null && response?.data?.error !== undefined) {
      return response.data.error;
    }
    return defaultMessage;
  }
  return defaultMessage;
}
