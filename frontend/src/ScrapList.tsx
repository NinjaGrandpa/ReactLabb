import { SyntheticEvent, useState, useEffect } from "react";
import ScrapModel from "./models/ScrapModel";
import { TextField, Button, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from "@mui/icons-material";

interface ScrapListProps {
    name: string;
    data: ScrapModel[];
    onCreate: (formData: ScrapModel) => void;
    onUpdate: (formData: ScrapModel) => void;
    onDelete: (id: number) => void;
    error?: { message: string };
}

function ScrapList({ name, data, onCreate, onUpdate, onDelete, error }: ScrapListProps) {

    console.log(`Scrap List: ${JSON.stringify(data)}`);

    const [formData, setFormData] = useState<ScrapModel>(new ScrapModel());
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        if (editingId !== null) {

            const currentItem = data.find(item => item.id === editingId);

            if(currentItem instanceof ScrapModel){
                setFormData(currentItem);
                return;
            }
        }
        setFormData(new ScrapModel());
        return; 
    }, [editingId, data]);

    const handleFormChange = (e: SyntheticEvent): void => {
        
        let target = e.target as HTMLInputElement;

        console.log(`handleFormChange: ${target.name} ${target.value}`);
        
        const { name, value } = target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: SyntheticEvent): void => {
        e.preventDefault();

        console.log(`formData: ${JSON.stringify(formData)}`);

        if (editingId !== null) {
            
            console.log(`update item: ${JSON.stringify(formData)}`);

            onUpdate(formData);
        } else {
            onCreate(formData);
        }
        setFormData(new ScrapModel)
        setEditingId(null);
    };

    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleCancelEdit = () => {
        setFormData(new ScrapModel())
        setEditingId(null);
    };

    const handleDelete = (id: number) => {
        onDelete(id);
    };

    return (
        <Box className="Box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>{name}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TextField label="Name" name="name" value={formData.name} onChange={handleFormChange} />
                <TextField label="Description" name="description" value={formData.description} onChange={handleFormChange} />
                <Button sx={{ mr: 1 }} variant="contained" type="submit">{editingId === null ? 'Create' : 'Update'}</Button>
                {editingId !== null && <Button variant="contained" color="secondary" onClick={handleCancelEdit}>Cancel</Button>}
            </form>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                {data.map(item => (
                    <ListItem key={item.id} secondaryAction={
                        <>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item.id)}>
                                <Edit />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item.id)}>
                                <Delete />
                            </IconButton>
                        </>
                    }>
                        <ListItemText primary={item.name} secondary={item.description} />
                    </ListItem>
                ))}
            </List>
            {error && <p>{error.message}</p>}
        </Box>
    );
}
    export default ScrapList;