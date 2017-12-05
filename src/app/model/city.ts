export class City {
  public id: number;
  private _name: string;

  constructor() {
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }
}
