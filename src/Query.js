const gitQuery = {
  query: `
            { 
              viewer { 
                login
              }
              search(query: "user:inderpreet sort:updated-desc", type: REPOSITORY, first:20) {
                nodes{
                  ... on Repository {
                  name
                  description
                  id
                  url
                  viewerSubscription
                  licenseInfo{
                    spdxId
                  }
                }    
              }
            }
            `,
};

export default gitQuery;
