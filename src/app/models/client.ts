export class Client {
    id: number;
    nom: string;
    prenom: string;
    fonction: string;
    mail: string;
    adresse: string;
    editMode: boolean = false;

  
    constructor(
      id: number,
      nom: string,
      prenom: string,
      fonction: string,
      mail: string,
      adresse: string,
      editMode: boolean// définir la propriété editMode dans la classe
       ) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.fonction = fonction;
      this.mail = mail;
      this.adresse = adresse;
      this.editMode = editMode; // assigner la valeur de editMode à l

      

    }
  }
  