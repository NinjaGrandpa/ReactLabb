class ScrapModel{

    public constructor(init?:Partial<ScrapModel>){
        Object.assign(this, init);
    }

    public id: number = 0;
    public name: string = "";
    public description: string = "";
}

export default ScrapModel;