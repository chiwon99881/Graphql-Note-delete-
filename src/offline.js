import { GET_NOTES } from './queries';

export const saveNotes = (cache) => {
    const {notes} = cache.readQuery({query:GET_NOTES});
    const stringNotes = JSON.stringify(notes);
    try {
        localStorage.setItem("wonNotes",stringNotes);
    }catch(error) {
        console.log(error)
    }
}

export const spreadNotes = () => {
    const willParseNotes = localStorage.getItem("wonNotes");
    if(willParseNotes) {
        try{
            const parsedNotes = JSON.parse(willParseNotes);
            return parsedNotes;
        }catch(error) {
            console.log(error)
            return [];
        }
    }else {
        return [];
    }
}