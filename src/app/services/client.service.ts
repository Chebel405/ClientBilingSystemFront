import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importation du module HttpClient pour effectuer des requêtes HTTP
import { Observable } from 'rxjs'; // Importation du module Observable pour gérer les données asynchrones
import { Client } from 'src/app/models/client'; // Importation de la classe Client

@Injectable({
  providedIn: 'root' // Spécifie que le service sera injecté au niveau de la racine de l'application
})
export class ClientService {


  private apiURL = 'http://localhost:8081/utilisateurs'


  constructor(private http: HttpClient) { } // Injection du module HttpClient dans le constructeur du service

  // Récupère la liste des clients à partir de l'API
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiURL); // Effectue une requête HTTP de type GET sur l'URL de l'API
  }

  // Ajoute un nouveau client à partir de l'API
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiURL, client); // Effectue une requête HTTP de type POST sur l'URL de l'API avec les données du nouveau client à ajouter
  }

  // Supprime un client existant à partir de l'API
  deleteClient(id: number): Observable<any> {
    const url = `${this.apiURL}/${id}`; // Construction de l'URL de l'API avec l'identifiant du client à supprimer
    return this.http.delete(url); // Effectue une requête HTTP de type DELETE sur l'URL de l'API pour supprimer le client correspondant
  }

  updateClient(client: Client, id:number): Observable<Client> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Client>(url, client);
  }
}

