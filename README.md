# Freiburg for Marlene

A personal, bilingual Freiburg guide built with Astro, derived from the official **CloudCannon Astro Component Starter**. English is the primary language (`/`); German lives at `/de/`. Includes 13 cafés, 6 bakeries, 66 locally stored photographs, and example sections for restaurants, shops and culture.

## In drei Schritten zu CloudCannon

1. ZIP entpacken. Den **Inhalt** von `freiburg-for-marlene` in die oberste Ebene deines privaten GitHub-Repositories hochladen. `package.json`, `astro.config.mjs` und `cloudcannon.config.yml` müssen direkt im Repository liegen. Alle versteckten Dateien und den Ordner `.cloudcannon` mitnehmen (Finder: `⌘ ⇧ .`). Nicht das ZIP selbst hochladen.
2. In CloudCannon: **Add / Create Site → GitHub → dein privates Repository → main** wählen. Astro verwenden. Die enthaltene `.cloudcannon/initial-site-settings.json` bereitet die Build-Einstellungen vor. Falls diese nicht automatisch übernommen werden: Node **22**, Installation **`npm ci`**, Build **`npm run build`**, Ausgabeordner **`dist`**.
3. Build abwarten, Testing Domain öffnen. Inhalte unter **Chapters & places** bearbeiten, speichern und den neuen Build abwarten. Eine eigene Domain kann später ergänzt werden. Danach unter **Site settings → site_url** die endgültige HTTPS-Adresse eintragen; dadurch werden Canonical- und Sprachverweise aktiviert.

Die Verbindung zu deinem Konto und ein tatsächliches Deployment wurden hier nicht durchgeführt. Die ZIP enthält eine lokal gebaute und getestete Website; ein Test mit deinem CloudCannon-Konto bleibt nach dem Import erforderlich.

## Inhalte bearbeiten

Die Kategorien erscheinen in CloudCannons **Data Editor**. Jede Kategorie ist eine JSON-Datei in `src/content/categories/`; du brauchst die Dateien nicht von Hand zu bearbeiten. Im Editor sind alle Orte unter **Places / sections** einzeln aufklappbar, sortierbar, duplizierbar und ergänzbar. Jeder Ort hat eigene Texte, Beobachtungen, Links, Tags und eine Galerie. EN und DE liegen direkt nebeneinander im selben Objekt. Änderungen werden nach Speichern und Build auf beiden Sprachseiten sichtbar. Der Starter ist als Grundlage erhalten; die neuen Guide-Seiten verwenden den strukturierten Data Editor, keine versprochene Live-Vorschau oder Inline-Bearbeitung.

### Kategorien und Bewertungsschemata

- **Category rating scheme:** Kriterien einmal pro Kategorie definieren. `id` bleibt technisch stabil; `label.en/de` bestimmt die Beschriftung für alle Orte. `kind` ist `text` oder `score`; `maximum` gilt für numerische Bewertungen.
- Pro Ort unter **Ratings / observations** als `criterion` dieselbe ID eintragen, dann entweder Text in EN/DE oder eine Zahl angeben. Eine leere Zahl (`null`) bedeutet „nicht bewertet“ und wird nicht als Nullwertung dargestellt. Keine erfundenen Bäckerei-, Restaurant-, Shop- oder Kultur-Bewertungen sind eingetragen.
- Eine neue Kategorie über **Add category** anlegen. Dateiname und `slug` jeweils eindeutig setzen, Navigationstitel, Titel und Einleitung übersetzen. `order` bestimmt die Navigation, `status` steuert „Coming soon“. Eine aktive Kategorie mit Orten füllen. Routen und Navigation entstehen ohne neue Programmierung automatisch: `/dein-slug/` und `/de/dein-slug/`.
- Beispielsektionen der drei kommenden Kategorien sind ausdrücklich als Beispiele erkennbar. `placeholder` ausschalten, wenn ein echter Eintrag daraus wird.

### Kategorie-Tags und Filter

1. Unter **Category tags** einen Tag mit stabiler `id` und Labels in beiden Sprachen hinzufügen.
2. Im gewünschten Ort unter **Assigned tag IDs** diese ID eintragen. Beispielsweise `terrace` oder `specialty-coffee`. Die Zuordnung erfolgt über Text-IDs; es gibt keinen zusätzlichen zentral zu pflegenden Code oder eine fest verdrahtete Tagliste.
3. Der nächste Build erzeugt die Filter automatisch. Mehrere ausgewählte Tags werden mit **UND** kombiniert. Der Sprachwechsel behält Suchbegriff, Tags und Sortierung bei. Die aktuelle Ansicht ist über ihre URL teilbar.

Sortierung: redaktionelle Reihenfolge, A–Z, Viertel sowie jedes numerische Kriterium der Kategorie. Nicht bewertete Orte stehen bei Bewertungssortierung am Ende. Die redaktionelle Reihenfolge entspricht der Reihenfolge der Sections im CMS.

### Galerien

Jede Section besitzt ein eigenes **Photo gallery**-Array. Bilder hinzufügen, austauschen, verschieben oder über **Show photo** ausblenden. Das erste Bild ist das Hauptbild. Neue Bilder nach `public/images/places` hochladen; der gespeicherte Webpfad beginnt mit `/images/places/`. Alttexte in beiden Sprachen eintragen. Bildart, Herkunft, Credit und Rechte-Status sind separat bearbeitbar. Das Hauptbild der Startseite liegt in **Site settings → hero_image**; sein Credit ist ebenfalls unter dem zugehörigen Café zu finden.

## Fotos: was enthalten ist und was offen bleibt

Für **jeden der 19 Orte** liegt mindestens ein eindeutig zugeordnetes Foto im Paket, insgesamt **66**. Galerien enthalten **1–5** Fotos. Außen-, Innen- und Essenfotos sind je nach Quelle vorhanden; nicht jeder Ort hat jede Perspektive. Betreiber-Websites wurden bevorzugt. Wo dort keine geeigneten Bilder vorlagen, wurden eindeutig zugeordnete Tourismus- oder Ortsseiten verwendet. Ein Teil der Bilder von Restaurant Guru ist dort als ursprünglich aus Google oder Facebook stammend gekennzeichnet. Eine Google-Maps-„Top 5“-Reihenfolge konnte nicht verifiziert werden; die Galerien sind redaktionell ausgewählt und werden nicht automatisch mit Google synchronisiert.

**Der Download und ein Quellenlink ersetzen keine Nutzungserlaubnis.** Für die enthaltenen Fremdfotos sind die Nutzungsrechte nicht bestätigt (`rights_status: unverified`). Vor öffentlicher Nutzung die Erlaubnis der jeweiligen Rechteinhaber einholen oder eigene/freigegebene Fotos im CMS einsetzen. `publish` steuert die Anzeige unabhängig vom Rechte-Status. Die Bilder sind für die gewünschte Vorschau sichtbar. Vollständige Original-URLs und Quellen stehen in `IMAGE-SOURCES.json`; Quellenlinks erscheinen auch neben den Galerien. Insbesondere professionelle Fotografenbilder wie Brotbruder/Blendwerk benötigen eine entsprechende Freigabe. Die mitgelieferten Quellenbezeichnungen ersetzen keine bestätigte Fotografenzuordnung.

Die persönlichen Bewertungen und Beschreibungen stammen aus der gelieferten Liste. Sie sind **keine Google-Bewertungen**, und wurden nicht durch aktuelle Plattformbewertungen ersetzt. Keine unbestätigten Öffnungszeiten wurden ergänzt.

## Lokal ansehen

Node 22.12 oder neuer verwenden:

```sh
npm ci
npm run dev
```

Die angezeigte lokale Adresse öffnen. `npm run validate` prüft Inhalte, Referenzen und Bilddateien. `npm run build` erstellt die statische Website in `dist`; `npm run preview` zeigt den fertigen Build. Dateien nicht per Doppelklick als `file://` öffnen: Die Website benötigt einen lokalen Webserver.

## Projektstruktur

- `src/guide/`: Guide-Layout, Ortskomponente, Styles, Filter, Galerien und globale Einstellungen.
- `src/content/categories/`: eine Datei je Kategorie; sämtliche EN-/DE-Texte und Ortsgalerien.
- `src/content.config.ts`: Astro-Inhaltsprüfung.
- `src/pages/`: automatisch erzeugte Kategorie- und Sprachrouten sowie 404.
- `cloudcannon.config.yml`: gemeinsame CMS-Felder und Strukturen.
- `.cloudcannon/schemas/category.json`: Vorlage für neue Kategorien.
- `public/images/places/`: optimierte lokale WebP-Fotos.
- `src/components/`, `src/layouts/`, `src/styles/`: erhaltene Bausteine des offiziellen Starters als Ausgangspunkt für Erweiterungen. Diese verwenden weiterhin die ursprünglichen Starter-Konventionen und werden nicht automatisch zu Guide-Sections.
- `UPSTREAM.md`: Herkunft und exakter Starter-Commit.

Die Schriften **DM Serif Display** und **DM Sans** werden lokal aus npm-Paketen ausgeliefert. Besucher laden keine Google Fonts, Google Maps-Embeds oder Instagram-Widgets; externe Karten und Websites öffnen erst nach Klick. Keine Cookies, Analytics, API-Schlüssel oder Datenbank nötig.
