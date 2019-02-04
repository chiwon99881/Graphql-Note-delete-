import React , { Component } from 'react';
import { Query,Mutation } from 'react-apollo';
import { GET_NOTE } from '../../queries';
import gql from 'graphql-tag';
import DeleteProcess from './DeleteProcess';

const DELETE_NOTE = gql`
    mutation deleteNote($id:Int!) @client {
        deleteNote(id:$id) {
            id
        }
    }
`;


class Delete extends Component {

    _backHome = (id) => {
        const { history } = this.props;
        this.mutationFn({variables:{id:parseInt(id)}});
        history.push('/');
    }

    render() {
        const {match:{params:{id}}} = this.props;
        return (
            <Query query={GET_NOTE} variables={{id}}>
                {({data}) => {
                return (data.note ? 
                <Mutation mutation={DELETE_NOTE}>
                    {deleteNote => {
                        console.log(id)
                        this.mutationFn = deleteNote;
                        return <DeleteProcess id={id} onBack={this._backHome} />
                    }}</Mutation> : null)
            }}
            </Query>
        )
    }
}

export default Delete;