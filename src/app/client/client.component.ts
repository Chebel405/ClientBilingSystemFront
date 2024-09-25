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

  constructor(private clientService: ClientService, private fb: FormBuilder) { 
    this.createForm();
  } // Injection du service ClientService dans le constructeur


  createForm() {
    this.clientForm = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required]
    });
}

  ngOnInit(): void  {
   // this.getClients(); // Appel de la méthode getClients() lors de l'initialisation du composant
   this.getClients();
    
  }
  

 getClients() {
  this.clientService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
  });
}

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


addClient() {
  this.clientService.addClient(this.clientForm?.value).subscribe((client: Client) => {
      console.log(client);
      this.showAddForm = false;
  });
}

deleteClient(client: Client) {
  this.clientService.deleteClient(client.id as unknown as number).subscribe(() => {
      console.log(`Client ${client.id} deleted`);
      const index = this.clients.indexOf(client);
      if (index > -1) {
          this.clients.splice(index, 1);
      }
  });
}

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

