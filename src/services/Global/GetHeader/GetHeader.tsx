import GetGlobalPath from '../GetGlobalPath';
import qs from 'qs';

const GetHeader = async () => {
  const params = {
    populate: {
      Header: {
        populate: {
          Logo: {
            populate: {
              image: {
                fields: ['documentId', 'url', 'alternativeText'],
              },
            },
          },
          Navigations: '*',
          CTA: '*',
        },
      },
    },
  };
  const query = qs.stringify(params, { encodeValuesOnly: true });
  const url = GetGlobalPath(query);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // Ensure fresh data on each request
  });
  const data = await response.json();
  return data;
};

export default GetHeader;
