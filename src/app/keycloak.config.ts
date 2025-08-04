import { KeycloakConfig } from 'keycloak-js';

export const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8180', // Your Keycloak server URL
  realm: 'digital-library', // Your realm name
  clientId: 'digital-library-frontend', // Your client ID
}; 