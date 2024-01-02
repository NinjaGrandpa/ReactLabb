import { useState, useEffect } from "react";
import ScrapModel from "./models/ScrapModel";
import ScrapList from "./ScrapList"

const term = "Scrap"
const API_URL = "/scrap";
const headers = {
    "Content-Type": "application/json"
};

function Scrap() {
    const [data, setData] = useState<ScrapModel[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchScrapData();
    }, []);

    const fetchScrapData = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error));
    };

    const handleCreate = (item: any) => {
        console.log(`add item: ${JSON.stringify(item)}`)
        
        fetch(API_URL, {
            method: "POST",
            headers,
            body: JSON.stringify({name: item.name, description: item.description}),
        })
            .then(response => response.json())
            .then(returnedItem => setData([...data, returnedItem]))
            .catch(error => setError(error));
    };

    const handleUpdate = (updatedItem: any) => {
        
        console.log(`update item: ${JSON.stringify(updatedItem)}`);

        fetch(API_URL, {
            method: "PUT",
            headers,
            body: JSON.stringify(updatedItem)
        })
            .then(() => setData(data.map(item => item.id === updatedItem.id ? updatedItem : item)))
            .catch(error => setError(error));
    };

    const handleDelete = (id: number) => {
        fetch(`${API_URL}/${id}`,{
            method: "DELETE",
            headers
        })
            .then(() => setData(data.filter(item => item.id !== id)))
            .catch(error => console.error("Error deleting item:", error));
    };

    return(
        <div>
            <ScrapList
                name={term}
                data={data}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );

}

export default Scrap;