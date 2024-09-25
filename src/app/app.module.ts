import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // <-- Importez HttpClientModule ici
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importer ReactiveFormsModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientComponent } from './client/client.component'; // <-- Importez ClientComponent ici
import { FactureComponent } from './facture/facture.component';
import { ParametreComponent } from './parametre/parametre.component';
import { FormsModule } from '@angular/forms';
import { EntrepriseComponent } from './entreprise/entreprise.component';

@NgModule({
  declarations: [
   
    AppComponent,
    ClientComponent,
   FactureComponent,
   ParametreComponent,
   EntrepriseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // <-- Importez HttpClientModule ici
    RouterModule, 
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
