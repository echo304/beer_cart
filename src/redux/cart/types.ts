export interface CartState {
  addedBeerIds: number[];
  addedBeersCount: { [beerId: string]: number };
}
