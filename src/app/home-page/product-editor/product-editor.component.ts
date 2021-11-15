import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Product} from "../../shared/model/product.model";
import {environment} from "../../../environments/environment";
import {ProductService} from "../product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit, OnDestroy {

  @Output()
  listChanged = new EventEmitter<void>();

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

  photoUrl: string | ArrayBuffer | null = "";

  @Input()
  product: Product = {
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

  subscription = new Subscription();

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    if(!this.editMode){
      this.showUploader = true;
    }
    this.photoUrl = environment.apiUrl + `/product/photo/${this.product.id}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClose() {
    this.closeEditor.emit();
  }

  handleUpload(event: any) {
    const file = event.files[0] as File;
    this.product.photo = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.photoUrl = reader.result;
      this.handleUploader();
    };
  }

  public handleUploader() {
    this.showUploader = !this.showUploader;
  }

  public onSave() {
    if(this.editMode){
      this.subscription = this.productService.edit(this.product).subscribe(() => {
        this.closeEditor.emit();
        this.listChanged.emit();
      });
    } else {
      this.subscription = this.productService.add(this.product).subscribe(() =>{
        this.listChanged.emit();
      this.closeEditor.emit()}
      );
    }
  }
}
