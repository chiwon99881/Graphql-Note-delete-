import gql from 'graphql-tag';

export const GET_NOTES = gql`
    query {
        notes @client {
            id 
            title
            content
        }
    }
`

export const GET_NOTE = gql`
    query getNote($id:Int!) @client {
        note(id:$id) {
            id
            title
            content
        }
    }
`;