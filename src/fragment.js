import gql from 'graphql-tag';

export const FRAGMENT = gql`
    fragment NoteParts on Note {
        id
        title
        content
    }
`;