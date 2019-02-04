import React,{Component} from 'react';
import Editor from '../../Components/Editor';
import gql from 'graphql-tag';
import { Query,Mutation } from 'react-apollo';
import { GET_NOTE } from '../../queries';

const UPDATE_NOTE = gql`
    mutation updateNote($id:Int!,$title:String!,$content:String!) @client{
        updateNote(id:$id, title:$title, content:$content) {
            id
        }
    }
`;

class Update extends Component {

    _onSave = (title,content,id) => {
        const { history } = this.props;
        if(title !== '' && content !== '' && id) {
            this.mutationFn({variables:{title,content,id}});
            history.push('/');
        }
    }

    render() {
        const {match:{params:{id}}} = this.props;
        console.log(id)
        return (
            <Query query={GET_NOTE} variables={{id}}>
            {({data}) => {
                console.log(data)
               return  (data.note ? 
                <Mutation mutation={UPDATE_NOTE}>
                {updateNote => {
                    this.mutationFn = updateNote;
                    return <Editor id={id} 
                                   title={data.note.title}
                                   content={data.note.content}
                                   onSave={this._onSave} />
                }}</Mutation> :null )
            }}
            </Query>
        );
    }
}

export default Update;