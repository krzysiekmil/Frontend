export class City {
  public id: number;
  private name: string;

  constructor() {
  }

  public getname(): string {
    return this.name;
  }

  public setname(value: string) {
    this.name = value;
  }
}
