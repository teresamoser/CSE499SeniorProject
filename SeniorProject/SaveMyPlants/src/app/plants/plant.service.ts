import { Subject } from "rxjs";

import { Injectable } from '@angular/core';
import { Plant } from './plant.model';
import { HttpClient } from "@angular/common/http";


@Injectable ({
    providedIn: 'root'
})

export class PlantService {
    plantListChangedEvent = new Subject<Plant[]>();
    plantSelectedEvent = new Subject<Plant[]>();
    plantsListClone: Plant[];


    private plants: Plant [] = [];
    private maxPlantId: number;
    http: HttpClient;
    plantsUpdated: any;

    constructor(http: HttpClient); 
    
    constructor() {
        //this.plants = 'mongoDB';
        this.maxPlantId = this.getMaxId();
        }

    getPlants(): Plant[] {
        this.http.get<{ message: string; plants: Plant[]; }>("http://localhost:3000/api/plants")
            .subscribe((plantData) => {
                this.plants = plantData.plants;
                this.plantsUpdated.next([...this.plants]);
            });
            return this.plants;
        };

    getPlant(id: string): Plant {
    return this.plants.find((plant) => plant.id === id);
        };
    
    getPlantUpdateListener(){
        return this.plantsUpdated.asObservable();
    }

    addPlant(newPlant: Plant){
        if (newPlant === null || newPlant === undefined) return;
            this.maxPlantId++;
            newPlant.id = `${this.maxPlantId}`;
            this.http.post<{message: string}>("http://localhost:3000/api/plants", Plant)
                .subscribe((responseData) => {
                    console.log(responseData.message);
                    this.plants.push(newPlant);
                    this.plantListChangedEvent.next(this.plants.slice());
                });
        }

    updatePlant(original: Plant, newPlant: Plant) {
        if (
            newPlant === null || newPlant === undefined ||
            original === null || original === undefined
            ) {
            return;
            };
        const pos = this.plants.indexOf(original);
        if (pos < 0) return;   
            newPlant.id = original.id;
            this.plants[pos] = newPlant;
            this.plantsListClone = this.plants.slice();
            this.plantListChangedEvent.next(this.plantsListClone);
        }

    deletePlant(plant: Plant)  {
        if (!plant) {
            return;
            }
        const pos = this.plants.indexOf(plant);
        if (pos < 0) {
            return;
            }
        this.plants.splice(pos, 1);
        this.plantSelectedEvent.next(this.plants.slice());
        } 
        
    getMaxId(): number {
        let maxId = 0;
        this.plants.forEach((d) => {
            if(+d.id > maxId) maxId = +d.id;
        });
        return maxId;
        }
        
}