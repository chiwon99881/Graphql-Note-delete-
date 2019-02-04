import React,{Component} from 'react';
import { Query } from 'react-apollo';
import { GET_NOTES } from '../../queries';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.div`
    width:100%;
    padding:10px;
    margin-bottom:25px;
`;

const Title = styled.span`
    font-size:50px;
    font-weight:bold;
`;

const Button = styled.button`
    all:unset;
    text-align:center;
    float:right;
    margin-left:30px;
    width:70px;
    height:75px;
    font-size:50px;
    &:hover {
        background-color:#eeeeee;
    }
`;

const NoteContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
`;

const NoteTable = styled.div`
    width:100%;
    background-color:#f8c291;
    margin-bottom:40px;
`;
const NoteSpan = styled.span`
    text-align:center;
    margin-bottom:20px;
    &:hover {
        background-color:rgba(0,0,0,0.15);
    }
`;

const NoteTitle = styled.span`
    font-size:35px;
    font-weight:bold;
`;

class Notes extends Component {
    render() {
        return (
            <>
                <Header>
                <Title>Wo._.n's Notes</Title>
                <Link to={"/create"} >
                    <Button>⭐</Button>
                </Link>       
                </Header>
                <NoteContainer>
                <Query query={GET_NOTES}>{({data}) => {
                    return (data.notes ? data.notes.map(note => {
                        return  (<NoteTable key={note.id}>
                                <Link to={`/note/${note.id}`} >
                                    <NoteSpan>
                                        <NoteTitle>{note.title}</NoteTitle>
                                    </NoteSpan>
                                </Link>
                                <Link to={`/delete/${note.id}`}>
                                    <Button>❌</Button>
                                </Link>
                                </NoteTable>
                                )
                    }): null)
                }}</Query>
                </NoteContainer>         
            </>
        );
    }
}

export default Notes;