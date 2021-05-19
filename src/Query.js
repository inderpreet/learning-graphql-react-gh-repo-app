const gitQuery = {
    query: `
            { 
              viewer { 
                login
              }
              search(query: "user:inderpreet sort:updated-desc", type: REPOSITORY, first:10) {
                nodes{
                  ... on Repository {
                  name
                  description
                  id
                  url
                  viewerSubscription
                  }
                }    
              }
            }
            `,
};

export default gitQuery;