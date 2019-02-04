import React, { Component } from 'react';
import styled from 'styled-components';
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutosize from "react-textarea-autosize";

const TitleInput = styled(TextareaAutosize)`
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
font-family: 'Ubuntu', sans-serif;
  font-size: 50px;
  font-weight: 600;
  width: 100%;
  &::placeholder {
    font-weight: 600;
  }
`;

const ContentPreview = styled.div`
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
font-family: 'Ubuntu', sans-serif;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutosize)`
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
font-family: 'Ubuntu', sans-serif;
  font-size: 25px;
  margin-top: 15px;
`;

const TitleContainer = styled.div`
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
font-family: 'Ubuntu', sans-serif;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.button`
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
font-family: 'Ubuntu', sans-serif;
`;

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id || null,
            title: props.title || "",
            content: props.content || ""
        }
    }

    _onInputChange = (e) => {
        const {target:{value,name}} = e;
        this.setState({
            [name] : value
        })
    }

    _onSave = () => {
        const { onSave } = this.props;
        const {title,content,id} = this.state;
        onSave(title,content,id);
    }
    
    render() {
        const {title,content} = this.state;
        return (
            <>
                <TitleContainer>
                    <TitleInput 
                        value={title} 
                        placeholder={"Untitled..."} 
                        name={"title"} 
                        onChange={this._onInputChange}/>
                    <Button onClick={this._onSave}>Save</Button>
                </TitleContainer>
                <ContentPreview>
                    <ContentInput 
                        value={content}
                        placeholder={"# we provide Markdown for you!"}
                        name={"content"}
                        onChange={this._onInputChange}/>
                    <MarkdownRenderer markdown={content} className={"markdown"} />
                </ContentPreview>
            </>
        );
    }
}

export default Editor;