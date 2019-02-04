import React,{Component} from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import {GET_NOTE} from '../../queries';
import { Link } from 'react-router-dom';



const TitleContainer = styled.div`
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
font-family: 'Ubuntu', sans-serif;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
    width:100%;
    font-size:50px;
    font-weight:bold;
`;

const Button = styled.button`
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
font-family: 'Ubuntu', sans-serif;
`;

const ContentContainer = styled.div`
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
font-family: 'Ubuntu', sans-serif;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Content = styled.h3`
    font-size:25px;
    font-weight:bold;
`;

class Note extends Component {
    render() {
        const {match:{params:{id}}} = this.props;
        return (
            <Query query={GET_NOTE} variables={{id}}>
            {({data}) => 
                data.note ? (<> 
                <TitleContainer>
                    <Title>{data.note.title}</Title>
                    <Link to={`/update/${data.note.id}`}>
                    <Button>Edit</Button>
                    </Link>
                </TitleContainer>
                <ContentContainer>
                    <Content>{data.note.content}</Content>
                </ContentContainer>
                </>) : null
            }</Query>
        );
    }
}

export default Note;