import { Component, OnInit } from '@angular/core';
import { Entreprise } from '../models/entreprise';
import { EntrepriseService } from '../services/entreprise.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})

export class EntrepriseComponent implements OnInit {
  entreprises: Entreprise[] = [];
  showAddForm: boolean = false;
  entrepriseForm!: FormGroup;


  constructor(private entrepriseService: EntrepriseService, private fb: FormBuilder) { 
    this.createForm();
  }


 /**
   * Crée le formulaire réactif pour l'ajout et la modification des entreprises.
   */
 createForm() {
  this.entrepriseForm = this.fb.group({
    siret: ['', Validators.required],
    siren: ['', Validators.required],
    ape: ['', Validators.required], 
    numeroTva: ['', [Validators.required]], 
    adresse: ['', Validators.required],
    codePostal: ['', Validators.required],
    commune: ['', Validators.required],
    portable: ['', Validators.required], 
    raisonSocial: ['', Validators.required],
    siege: ['', Validators.required],
    rcs: ['', Validators.required],
    cfe: ['', Validators.required], 
    codeActivite: ['', [Validators.required]],
    mail: ['', Validators.required, Validators.email],
    site: ['', Validators.required],
    note: ['', Validators.required],
    editMode: ['', [Validators.required]],
    factures: ['', Validators.required]
  });
}


  ngOnInit() {
    this.getEntreprises(); // Appel de la méthode getEntreprises() lors de l'initialisation du composant
  }


  // Méthode pour récupérer la liste des entreprises
  getEntreprises(): void {
    this.entrepriseService.getEntreprises().subscribe(entreprises => {
      // Pour chaque entreprise, on ajoute une propriété editMode initialisée à false
      this.entreprises = entreprises.map(entreprise => ({
        ...entreprise,
        editMode: false // Chaque entreprise commence en mode vue (non modifiable)
      }));
    });
  }

    // Méthode pour activer le mode édition pour une entreprise
    showForm(entreprise: Entreprise): void {
      entreprise.editMode = true;
    }
  
    // Méthode pour désactiver le mode édition (annuler la modification)
    cancelEdit(entreprise: Entreprise): void {
      entreprise.editMode = false;
    }
  
    // Méthode pour sauvegarder les modifications d'une entreprise
    updateEntreprise(entreprise: Entreprise): void {
      // Appelle le service pour mettre à jour l'entreprise
      this.entrepriseService.updateEntreprise(entreprise.id, entreprise).subscribe(() => {
        // Après mise à jour, désactiver le mode édition
        entreprise.editMode = false;
      });
    }

  
}
