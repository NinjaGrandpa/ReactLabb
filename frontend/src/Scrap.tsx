import { useState, useEffect } from "react";
import ScrapModel from "./models/ScrapModel";
import ScrapList from "./ScrapList"

const term = "Scrap"

function Scrap() {
    const [data, setData] = useState<ScrapModel[]>([]);
    const [maxId, setMaxId] = useState(0);

    useEffect(() => {
        fetchScrapData();
    }, []);

    const fetchScrapData = () => {
        const scrapData: ScrapModel[] = [
            new ScrapModel({
                id: 1, 
                name: 'Old Engine', 
                description: 'An old engine from a Nebula-Cruiser'}),
            new ScrapModel({
                id: 2, 
                name: 'Transflux Capacitor', 
                description: "A Transflux Capacitor from some poor bastard's ship."}),
            new ScrapModel({
                id: 3,
                name: 'Coffe Machine',
                description: 'A coffe machine, model Insto-Coffe 3000'})
        ];
        
        setData(scrapData);
        setMaxId(Math.max(...scrapData.map(scrap => scrap.id)));
    };

    const handleCreate = (item: any) => {
        const newItem = {...item, id: data.length + 1 };
        setData([...data, newItem]);
        setMaxId(maxId + 1);
    }

    const handleUpdate = (item: any) => {
        const updatedData = data.map(scrap => scrap.id === item.id ? item : scrap);
        setData(updatedData);
    };

    const handleDelete = (id: number) => {
        const updatedData = data.filter(scrap => scrap.id !== id);
        setData(updatedData);
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