# Build APK FoodRush

## Commande recommandee

Depuis la racine du projet:

```bash
EAS_SKIP_AUTO_FINGERPRINT=1 eas build -p android --profile preview --clear-cache
```

Le profil `preview` genere un fichier `.apk`.

## Si Git Bash colle mal la variable

Utilise deux lignes:

```bash
export EAS_SKIP_AUTO_FINGERPRINT=1
eas build -p android --profile preview --clear-cache
```

## Pourquoi cette variable

Elle evite un blocage possible au calcul du fingerprint EAS. Le build Android reste normal.

## Si le build echoue encore

Ouvre le lien EAS affiche dans le terminal, puis regarde la phase:

```txt
Install dependencies
```

L'erreur exacte a envoyer est la derniere erreur npm/yarn affichee dans cette phase.
