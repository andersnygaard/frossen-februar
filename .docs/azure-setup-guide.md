# Frossen Februar - Azure Deployment Guide

> PWA hosting på Azure med Resource Group

**Anbefalt**: Azure Static Web Apps (gratis, optimalisert for PWA/SPA)
**Alternativ**: Azure App Service (mer fleksibelt, men overkill for statiske sider)

---

## Forutsetninger

- Azure CLI installert og innlogget
- pnpm installert
- Azure-abonnement (gratis tier fungerer)

```bash
# Verifiser Azure-innlogging
az account show --query "{Name:name, SubscriptionId:id}" -o table

# Logg inn om nødvendig
az login
```

---

## Alternativ 1: Azure Static Web Apps (Anbefalt)

Static Web Apps er designet for PWA/SPA-applikasjoner med gratis global CDN.

### 1.1 Opprett Resource Group

```bash
az group create \
  --name frossen-februar-rg \
  --location norwayeast
```

### 1.2 Bygg Applikasjonen

```bash
# Fra prosjektrot
pnpm install
pnpm build
```

Build-output havner i `packages/app/dist/`.

### 1.3 Installer SWA CLI

```bash
npm install -g @azure/static-web-apps-cli
```

### 1.4 Deploy med SWA CLI

```bash
# Fra prosjektrot
swa deploy packages/app/dist \
  --resource-group frossen-februar-rg \
  --app-name frossen-februar \
  --env production
```

Ved første deploy blir du bedt om å logge inn og velge abonnement.

### 1.5 Alternativ: Deploy via Azure Portal

1. Gå til [Azure Portal](https://portal.azure.com)
2. Søk etter "Static Web Apps" → Create
3. Velg resource group: `frossen-februar-rg`
4. Navn: `frossen-februar`
5. Plan type: Free
6. Region: Norway East
7. Deployment source: Other (for manuell deploy)
8. Klikk "Review + Create"

Etter opprettelse, bruk SWA CLI for å deploye:

```bash
# Hent deployment token fra Portal → Static Web App → Manage deployment token
swa deploy packages/app/dist --deployment-token <YOUR_TOKEN>
```

### 1.6 Verifiser Deployment

```bash
# Hent URL
az staticwebapp show \
  --name frossen-februar \
  --resource-group frossen-februar-rg \
  --query "defaultHostname" -o tsv
```

Åpne `https://<hostname>` i nettleseren.

---

## Alternativ 2: Azure App Service

App Service gir mer kontroll, men er overkill for en statisk PWA.

### 2.1 Opprett Resource Group

```bash
az group create \
  --name frossen-februar-rg \
  --location norwayeast
```

### 2.2 Opprett App Service Plan (Free Tier)

```bash
az appservice plan create \
  --name frossen-februar-plan \
  --resource-group frossen-februar-rg \
  --location norwayeast \
  --sku F1 \
  --is-linux
```

**Free Tier (F1) begrensninger:**
- 1 GB lagring
- 60 min/dag CPU
- Delt compute
- Ingen custom domains eller SSL
- Ingen SLA

### 2.3 Opprett Web App

```bash
az webapp create \
  --name frossen-februar \
  --resource-group frossen-februar-rg \
  --plan frossen-februar-plan \
  --runtime "NODE|20-lts"
```

### 2.4 Bygg Applikasjonen

```bash
pnpm install
pnpm build
```

### 2.5 Deploy

```bash
# Naviger til build-mappen
cd packages/app/dist

# Deploy direkte
az webapp up \
  --name frossen-februar \
  --resource-group frossen-februar-rg \
  --html

# Tilbake til prosjektrot
cd ../../..
```

**Alternativ med zip-deploy:**

```bash
# Lag zip av dist-mappen
cd packages/app/dist
zip -r ../../../deploy.zip .
cd ../../..

# Deploy zip-filen
az webapp deploy \
  --name frossen-februar \
  --resource-group frossen-februar-rg \
  --src-path deploy.zip \
  --type zip

# Rydd opp
rm deploy.zip
```

### 2.6 Konfigurer for SPA Routing

For at Vue Router skal fungere korrekt, opprett `staticwebapp.config.json` i `packages/app/public/`:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  }
}
```

For App Service, opprett `web.config` i `packages/app/public/`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="SPA Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

### 2.7 Verifiser Deployment

```bash
# Hent URL
az webapp show \
  --name frossen-februar \
  --resource-group frossen-februar-rg \
  --query "defaultHostName" -o tsv
```

---

## GitHub Actions CI/CD (Valgfritt)

For automatisk deploy ved push til main:

### For Static Web Apps

Opprett `.github/workflows/azure-static-web-apps.yml`:

```yaml
name: Deploy to Azure Static Web Apps

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: upload
          app_location: packages/app/dist
          skip_app_build: true
```

Hent API token fra Azure Portal → Static Web App → Manage deployment token, og legg til som GitHub secret.

### For App Service

Opprett `.github/workflows/azure-app-service.yml`:

```yaml
name: Deploy to Azure App Service

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v3
        with:
          app-name: frossen-februar
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: packages/app/dist
```

Hent publish profile fra Azure Portal → App Service → Download publish profile, og legg til som GitHub secret.

---

## Kostnader

| Tjeneste | Tier | Kostnad |
|----------|------|---------|
| Static Web Apps | Free | Gratis |
| Static Web Apps | Standard | $9/mnd |
| App Service | F1 (Free) | Gratis |
| App Service | B1 (Basic) | ~$13/mnd |

**Anbefaling**: Bruk Static Web Apps Free tier for denne PWA-en.

---

## Feilsøking

### "Application Error" etter deploy

Sjekk logger:
```bash
# Static Web Apps
az staticwebapp show --name frossen-februar --query "buildProperties"

# App Service
az webapp log tail --name frossen-februar --resource-group frossen-februar-rg
```

### PWA Service Worker ikke aktiv

Sjekk at `vite-plugin-pwa` er konfigurert korrekt og at appen serveres over HTTPS.

### SPA routing fungerer ikke

Verifiser at `navigationFallback` (SWA) eller `web.config` (App Service) er korrekt konfigurert.

---

## Opprydding

Slett alle ressurser når du er ferdig med testing:

```bash
az group delete --name frossen-februar-rg --yes --no-wait
```

---

## Kilder

- [Deploy a Vue app on Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-vue)
- [Vite Static Deploy Guide](https://vite.dev/guide/static-deploy)
- [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/)
- [Azure App Service QuickStart](https://docs.azure.cn/en-us/app-service/quickstart-html)
