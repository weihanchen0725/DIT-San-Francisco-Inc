import GetAPIPath from "../GetAPIPath";

const GetGlobalPath = (queryString: string) => {
  const baseURL = GetAPIPath("global");
  return queryString ? `${baseURL}?${queryString}` : baseURL;
};

export default GetGlobalPath;
