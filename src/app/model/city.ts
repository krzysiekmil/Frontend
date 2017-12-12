export class City {
  public id: number;
  public name: string;

  constructor() {
  }

  public getname(): string {
    return this.name;
  }

  public setname(value: string) {
    this.name = value;
  }
}
