import GetAPIPath from "../GetAPIPath";

const GetGlobalPath = (queryString: string) => {
    const baseURL = GetAPIPath("global");
    return `${baseURL}?${queryString}`;
};

export default GetGlobalPath;