const gitQuery = {
            query: `
            {
                viewer {
                    login
                    name
                    bio
                    avatarUrl
                    repositories(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
                        nodes {
                            id
                            name
                            description
                            url
                        }
                    }
                }
            }
            `,
        };

export default gitQuery;