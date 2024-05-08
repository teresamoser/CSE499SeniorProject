 export class Plant {
        constructor (
             public id: string,
             public name: string,
             public type: string,
             public water: string,
             public light: string,
             public imageUrl: string,
             public group: Plant[]
        ) {};
     }