import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client'; // Import du modèle Client
import { ClientService } from 'src/app/services/client.service'; // Import du service ClientService
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[] = []; // Déclaration de la variable clients qui est un tableau de clients
  showAddForm: boolean = false;
  clientForm!: FormGroup;

  /**
   * Constructeur du composant ClientComponent.
   *
   * @param clientService Service pour gérer les opérations liées aux clients.
   * @param fb FormBuilder pour créer des formulaires réactifs.
   */
  constructor(private clientService: ClientService, private fb: FormBuilder) { 
    this.createForm();
  } 


   /**
   * Crée le formulaire réactif pour l'ajout et la modification des clients.
   */
  createForm() {
    this.clientForm = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required]
    });
}


   /**
   * Méthode exécutée lors de l'initialisation du composant.
   *
   * Elle récupère la liste des clients via le service.
   */
  ngOnInit(): void  {
   this.getClients(); // Appel de la méthode getClients() lors de l'initialisation du composant
    
  }
  
  /**
   * Récupère la liste des clients depuis le service.
   * Met à jour la variable clients avec les données reçues.
   */
 getClients() {
  this.clientService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
  });
}


  /**
   * Affiche ou masque le formulaire d'ajout de client.
   * Si un client est passé en paramètre, le formulaire est prérempli avec ses informations.
   *
   * @param client Client à modifier (optionnel).
   */
showForm(client?: Client) {
  if (client) {
    // Initialiser le formulaire avec les valeurs actuelles du client
    this.clientForm.patchValue({
      nom: client.nom,
      prenom: client.prenom
    });
    client.editMode = true; // Activer le mode édition pour le client sélectionné
  } else {
    this.clientForm.reset(); // Réinitialiser le formulaire pour l'ajout
    this.showAddForm = !this.showAddForm; // Afficher le formulaire d'ajout
  }
}


  /**
     * Ajoute un nouveau client en utilisant les données du formulaire.
     */
addClient() {
  this.clientService.addClient(this.clientForm?.value).subscribe((client: Client) => {
      console.log(client);
      this.showAddForm = false;
  });
}


/**
   * Supprime un client spécifié.
   *
   * @param client Client à supprimer.
   */
deleteClient(client: Client) {
  this.clientService.deleteClient(client.id as unknown as number).subscribe(() => {
      console.log(`Client ${client.id} deleted`);
      const index = this.clients.indexOf(client);
      if (index > -1) {
          this.clients.splice(index, 1);
      }
  });
}


/**
   * Met à jour les informations d'un client existant.
   *
   * @param id Identifiant du client à mettre à jour.
   */
updateClient(id: number) {
  this.clientService.updateClient(this.clientForm.value, id).subscribe(() => {
      console.log(`Client ${id} updated`);
      // Mettre à jour le client dans la liste des clients
      const index = this.clients.findIndex((client) => client.id === id);
      this.clients[index] = this.clientForm.value;
      this.clientForm.reset();
      // Masquer les boutons d'édition
      //client.editMode = false;
  });
}

}

