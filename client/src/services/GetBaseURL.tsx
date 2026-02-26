const GetBaseURL = (strURL: string) => {
  const strapiBaseUrl =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "http://localhost:1337";

  const normalizedBaseUrl = strapiBaseUrl.replace(/\/+$/, "");
  const normalizedEndpoint = strURL.replace(/^\/+/, "");

  return normalizedEndpoint
    ? `${normalizedBaseUrl}/${normalizedEndpoint}`
    : normalizedBaseUrl;
};

export default GetBaseURL;
