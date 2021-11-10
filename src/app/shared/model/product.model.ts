export class Product{

  constructor(public id: number,
              public description: string,
              public name: string,
              public forBreed: string,
              public category: string,
              public stock: number,
              public photo: Blob,
              public price: number) {
  }
}
