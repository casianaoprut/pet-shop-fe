import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Filter} from "../shared/model/filter.model";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{

  filter = {
    name: undefined,
    maxPrice: undefined,
    minPrice: undefined,
    breed: undefined,
    category: undefined
  }

  categories = [
    "Food",
    "Accessories",
    "Shampoo",
    "Furniture",
    "Toys"
  ];

  breeds = [
    "Cat",
    "Dog",
    "Bird"
  ];

  @Output()
  filtersChanged = new EventEmitter<Filter>();

  constructor() { }

  ngOnInit(): void {
  }

  public onApplyFilters() {
    this.filtersChanged.emit(this.filter);
  }

  public onClearFilters() {
    this.filter = {
      name: undefined,
      maxPrice: undefined,
      minPrice: undefined,
      breed: undefined,
      category: undefined
    };
    this.filtersChanged.emit({});
  }
}
