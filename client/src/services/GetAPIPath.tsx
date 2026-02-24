const GetAPIPath = (endpoint: string) => {
  const baseURL = process.env.API_BASE_URL || "";
  return `${baseURL}${endpoint}`;
};

export default GetAPIPath;