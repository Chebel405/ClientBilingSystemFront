export class Client {
    id: number;
    nom: string;
    prenom: string;
    editMode: boolean;

  
    constructor(
      id: number,
      nom: string,
      prenom: string,
      editMode: boolean// définir la propriété editMode dans la classe
       ) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.editMode = editMode; // assigner la valeur de editMode à l

      

    }
  }
  