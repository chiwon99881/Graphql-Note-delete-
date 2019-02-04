import React,{Component} from 'react';
import Editor from '../../Components/Editor';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_NOTE = gql`
    mutation createNote($title:String!, $content:String!) @client {
        createNote(title:$title, content:$content) {
            id
        }
    }
`;

class Create extends Component {

    _onSave = (title,content) => {
        const { history } = this.props;
        if(title !== '' && content !== '') {
            this.mutationFn({variables :{title,content}});
            history.push('/');
        }
    }
    render() {
        return (
            <Mutation mutation={CREATE_NOTE}>
            {createNote => {
                this.mutationFn = createNote;
                return <Editor onSave={this._onSave} />
            }}
            </Mutation>
        );
    }
}

export default Create;