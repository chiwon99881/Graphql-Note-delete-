import { FRAGMENT } from './fragment';
import { GET_NOTES } from './queries';
import { spreadNotes,saveNotes } from './offline';
export const defaults = {
    notes:spreadNotes()
};
export const typeDefs = [
   `
    schema {
        query:Query
        mutation:Mutation
    }
    type Query {
        notes:[Note]!
        note(id:Int!):Note
    }
    type Mutation {
        createNote(title:String!, content:String!):Note
        updateNote(id:Int!, title:String!, content:String!):Note
        deleteNote(id:Int!):Note
    }
    type Note {
        id:Int!
        title:String!
        content:String!
    }
   ` 
];

export const resolvers = {
    Query : {
        note: (_,variables,{cache}) => {
            const id = cache.config.dataIdFromObject({
                __typename: "Note",
                id : variables.id
            });
            const note = cache.readFragment({fragment:FRAGMENT, id})
            return note;
        }
    },
    Mutation : {
        createNote: (_,variables,{cache}) => {
            const {notes} = cache.readQuery({query:GET_NOTES});
            console.log(notes)
            const {title,content} = variables;
            const newNote = {
                __typename:"Note",
                id: notes.length+1,
                title,
                content
            }
            cache.writeData({
                data: {
                    notes : [...notes,newNote]
                }
            })
            saveNotes(cache);
            return newNote;
        },
        updateNote: (_,variables,{cache}) => {
            const id = cache.config.dataIdFromObject({
                __typename: "Note",
                id : variables.id
            });
            const updatedNote = cache.readFragment({fragment:FRAGMENT, id})
            const {title,content} = variables;

            const updateWillNote = {
                ...updatedNote,
                title,
                content
            }
            cache.writeFragment({
                id,
                fragment:FRAGMENT,
                data:updateWillNote
            })
            saveNotes(cache);
            return updateWillNote;
        },
        deleteNote:(_,variables,{cache}) => {
            const {notes} = cache.readQuery({query:GET_NOTES});
            const id = cache.config.dataIdFromObject({
                __typename: "Note",
                id : variables.id
            });
            const deletedNote = cache.readFragment({fragment:FRAGMENT, id})

            const deleteNotesArray = notes.filter(note => {
                console.log(note.id, variables.id)
                return note.id !== variables.id 
            })

            let i = 1;
            const mapArray = deleteNotesArray.map(each => {
                each.id = i;
                i++;
                return each;
            });
            console.log(mapArray);

            cache.writeData({
                data: {
                    notes: mapArray
                }
            })
            saveNotes(cache);
            return deletedNote;
        }
     }
};
