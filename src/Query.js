const gitQuery = {
            query: `
            {
                viewer {
                    login
                    name
                    bio
                    avatarUrl
                    repositories(first: 2, orderBy: {field: CREATED_AT, direction: DESC}) {
                    nodes {
                        id
                        name
                        description
                    }
                    }
                }
            }
            `,
        };

export default gitQuery;