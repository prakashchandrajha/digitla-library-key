# Digital Library with Keycloak Authentication

A modern Angular application with Keycloak integration for secure authentication and user management.

## 🔐 Features

- **Keycloak Integration**: Centralized authentication and user management
- **Login/Register**: Secure authentication with Keycloak-hosted forms
- **Route Protection**: Guards for protected routes
- **User Profile**: Display user information after authentication
- **Modern UI**: Beautiful, responsive design with gradient backgrounds
- **SSO Support**: Single Sign-On capabilities

## 🚀 Quick Start

### Prerequisites

1. **Keycloak Server**: You need a running Keycloak instance
2. **Node.js**: Version 18 or higher
3. **Angular CLI**: Latest version

### Keycloak Setup

1. **Install and Start Keycloak**:
   ```bash
   # Download Keycloak from https://www.keycloak.org/downloads
   # Or use Docker:
   docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
   ```

2. **Create Realm**:
   - Access Keycloak Admin Console at `http://localhost:8080`
   - Login with admin/admin
   - Create a new realm called `digital-library`

3. **Create Client**:
   - Go to Clients → Create
   - Client ID: `digital-library-client`
   - Client Protocol: `openid-connect`
   - Access Type: `public`
   - Valid Redirect URIs: `http://localhost:4200/*`
   - Web Origins: `http://localhost:4200`

4. **Create User** (Optional):
   - Go to Users → Add User
   - Create a test user with username and password

### Application Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Update Keycloak Configuration**:
   Edit `src/app/keycloak.config.ts`:
   ```typescript
   export const keycloakConfig: KeycloakConfig = {
     url: 'http://localhost:8080', // Your Keycloak server URL
     realm: 'digital-library', // Your realm name
     clientId: 'digital-library-client', // Your client ID
   };
   ```

3. **Start the Application**:
   ```bash
   npm start
   ```

4. **Access the Application**:
   - Open `http://localhost:4200`
   - You'll be redirected to the auth page
   - Click Login or Register to authenticate with Keycloak

## 📁 Project Structure

```
src/app/
├── components/
│   ├── auth/           # Authentication page component
│   └── home/           # Home page for authenticated users
├── guards/
│   └── auth.guard.ts   # Route protection guard
├── services/
│   └── auth.service.ts # Keycloak authentication service
├── keycloak.config.ts  # Keycloak configuration
├── app.routes.ts       # Application routes
└── app.config.ts       # App configuration with Keycloak
```

## 🔧 Configuration

### Keycloak Configuration

The main configuration is in `src/app/keycloak.config.ts`:

```typescript
export const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080',      // Keycloak server URL
  realm: 'digital-library',          // Realm name
  clientId: 'digital-library-client' // Client ID
};
```

### Routes

- `/auth` - Authentication page (login/register)
- `/home` - Protected home page (requires authentication)
- `/` - Redirects to `/auth`

## 🎨 UI Features

- **Modern Design**: Gradient backgrounds and smooth animations
- **Responsive**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during authentication
- **User Information**: Displays user profile after login
- **Logout Functionality**: Secure logout with Keycloak

## 🔒 Security Features

- **Centralized Authentication**: All auth handled by Keycloak
- **Route Protection**: Guards prevent unauthorized access
- **Token Management**: Automatic token refresh
- **SSO Support**: Single Sign-On across applications
- **Password Reset**: Built-in password reset functionality

## 🛠️ Development

### Available Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Watch for changes
npm run watch
```

### Keycloak Features Used

- **OpenID Connect**: Standard authentication protocol
- **User Management**: Centralized user administration
- **Session Management**: Secure session handling
- **Token Refresh**: Automatic token renewal
- **Logout**: Secure logout with session cleanup

## 🚀 Deployment

1. **Build the Application**:
   ```bash
   npm run build
   ```

2. **Configure Production Keycloak**:
   - Update `keycloak.config.ts` with production URLs
   - Configure production realm and client
   - Update redirect URIs for production domain

3. **Deploy**:
   - Deploy the `dist/` folder to your web server
   - Ensure HTTPS is configured for production

## 📝 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure Keycloak client has correct Web Origins
2. **Redirect Issues**: Check Valid Redirect URIs in Keycloak client
3. **Authentication Failures**: Verify realm and client configuration
4. **Token Issues**: Check client protocol and access type settings

### Debug Mode

Enable debug logging in the browser console by adding to `keycloak.config.ts`:

```typescript
export const keycloakConfig: KeycloakConfig = {
  // ... existing config
  enableLogging: true
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding! 🎉**
