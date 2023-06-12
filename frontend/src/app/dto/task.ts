export class Task {
  constructor(public id:number,
              public description:string,
              public status: 'COMPLETED' | 'NOT_COMPLETED') {

  }
}
