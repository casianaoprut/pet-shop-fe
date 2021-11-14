import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../shared/model/product.model";

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit {

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

  showUploader = false;

  @Input()
  product: Product = {
    id: -1,
    description: "",
    name: "",
    forBreed: "",
    category: "",
    stock: -1,
    photo: new Blob(),
    price: -1
  };

  @Input()
  editMode = false;

  @Output()
  closeEditor = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    if(!this.editMode){
      this.showUploader = true;
    }
  }

  onClose() {
    this.closeEditor.emit();
  }

  onUpload(event: any) {
    const file = event.files[0] as File;
    console.log(file);
    this.product.photo = new Blob([file]);
    let fileToBlob = async (file: { arrayBuffer: () => Iterable<number> | PromiseLike<Iterable<number>>; type: any; }) => new Blob([new Uint8Array(await file.arrayBuffer())], {type: file.type });
    console.log(this.product.photo);
  }

  public handleUploader() {
    this.showUploader = !this.showUploader;
  }
}
