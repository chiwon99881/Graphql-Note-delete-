import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    all:unset;
    text-align:center;
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

const NoteSpan = styled.span`
    text-align:center;
    margin-bottom:20px;
    &:hover {
        background-color:rgba(0,0,0,0.15);
    }
`;
class DeleteProcess extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : props.id || null
        }
    }

    _thisBack = () => {
        const { onBack } = this.props;
        const {id} = this.state;
        onBack(id);
    }

    render() {
        return (
            <NoteContainer>
                <NoteSpan>Delete Success</NoteSpan>
                <Button onClick={this._thisBack}>↪</Button>
            </NoteContainer>
        )
    }
}

export default DeleteProcess;