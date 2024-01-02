import { FormEvent, SyntheticEvent, useState } from "react";
import ScrapModel from "./models/ScrapModel";

interface ScrapListProps {
    name: string;
    data: ScrapModel[];
    onCreate: (formData: ScrapModel) => void;
    onUpdate: (formData: ScrapModel) => void;
    onDelete: (id: number) => void;
    error?: {message: string};
}

function ScrapList({name, data, onCreate, onUpdate, onDelete, error}: ScrapListProps){
    const [formData, setFormData] = useState<ScrapModel>(new ScrapModel());
    const [editingId, setEditingId] = useState<number|null>(null);

    const handleFormChange = (e: SyntheticEvent): void => {
        const {name, value} = e.target as HTMLInputElement;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: SyntheticEvent): void => {
        e.preventDefault();
        if (editingId){
            onUpdate(formData);
            setEditingId(null);
        } else {
            onCreate(formData);
        }
        setFormData(new ScrapModel)
    };

    const handleEdit = (item: ScrapModel): void => {
        setEditingId(item.id);
        setFormData({
            id: item.id,
            name: item.name,
            description: item.description
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData(new ScrapModel())
    };

    return(
        <div>
            <h2>New {name}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleFormChange}
                />
                <input 
                    type="text" 
                    name="description"    
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleFormChange}
                />
                <button type="submit">{editingId ? "Update" : "Create"}</button>
                {editingId && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
            </form>
            {error && <div>{error.message}</div>}
            <h2>{name}s</h2>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <div>{item.name} - {item.description}</div>
                        <div>
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => onDelete(item.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScrapList;