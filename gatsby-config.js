module.exports = {
    trailingSlash: 'never',
    plugins: [
        `gatsby-plugin-styled-components`,
        {
            resolve: `gatsby-plugin-s3`,
            options: {
                bucketName: 'kotechmarket.fe',
                region: 'us-west-1',
            },
        },
        `@gatsbyjs/reach-router`,
    ],
};
