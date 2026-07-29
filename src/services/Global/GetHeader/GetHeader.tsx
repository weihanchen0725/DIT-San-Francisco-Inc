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
              imageDark: {
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
    next: { revalidate: 3600 }, // Refresh CMS data hourly without forcing dynamic rendering
  });
  const data = await response.json();
  return data;
};

export default GetHeader;
