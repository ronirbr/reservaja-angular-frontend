import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    register(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
            tap((res: any) => {
                if (res && res.accessToken) {
                    localStorage.setItem('token', res.accessToken);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
