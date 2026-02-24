import GetGlobalPath from "../GetGlobalPath";

const GetHeader = async () => {
    const qs = require('qs');
    const params = {
        populate: {
            Header: { 
                populate: {
                    Logo: {
                        populate: { 
                            image: { fields: ['url', 'alternativeText'] } 
                        }
                    },
                    Navigations: '*',
                    CTA: '*'
                }
            }
        }
    };
    const query = qs.stringify(params, { encodeValuesOnly: true });
    const url = GetGlobalPath(`?${query}`);
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }, 
        cache: 'no-store' // Ensure fresh data on each request
    });
    const data = await response.json();
    return data;
}

export default GetHeader;