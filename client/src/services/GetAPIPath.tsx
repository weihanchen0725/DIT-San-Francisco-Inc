import GetBaseURL from "./GetBaseURL";

const GetAPIPath = (endpoint: string) => {
  const strapiBaseUrl = GetBaseURL("");

  const normalizedBaseUrl = strapiBaseUrl.replace(/\/+$/, "");
  const normalizedEndpoint = endpoint.replace(/^\/+/, "");

  return `${normalizedBaseUrl}/api/${normalizedEndpoint}`;
};

export default GetAPIPath;
