import { Component, Input, OnInit } from '@angular/core';

import { Plant } from '../plant.model'; 

@Component({
  selector: 'app-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrl: './plant-item.component.css'
})
export class PlantItemComponent implements OnInit {
  @Input() plant: Plant;
  @Input() index: number;

  ngOnInit(): void {
    
  }

}
