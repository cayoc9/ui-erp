declare namespace Models {
  interface Sector {
    id: number;
    name: string;
    hospitalId: number;
  }

  interface Inconsistency {
    id: number;
    description: string;
    status: boolean;
  }
}
