# Portfolio Network-Centric : "The Core Switch"

## 🌐 Concept

Un site "One-Page" ou multi-pages hybride qui allie un design moderne/épuré (UX classique) avec une section technique interactive représentant un Switch réseau pour la navigation dans le parcours académique.
Tout d'abord, rapide présentation sur moi avec une page fluide et discrète.
Ensuite, arrivée sur la partie menant aux différents projets
Le site est conçu comme une infrastructure réseau virtuelle. L'utilisateur navigue à travers des couches (OSI) pour découvrir mon parcours.

## 🏗️ Architecture du Site (Sitemap)
- **Layer 3 (Home)** : `index.html` (The Core Switch)
    - **Layer 2 (Semestres)** : 5 VLANs (VLAN 10 à 50)
        - **Layer 1 (Projets)** : 6 Endpoints (Nodes) par VLAN (Soit 30 pages projets au total)

## 🏗️ Architecture des Pages
1. **Home Page (index.html)** :
   - Header (Navigation classique)
   - Hero Section (Intro & Background)
   - **Switch Dashboard** (Navigation interactive vers les semestres)
   - Footer (Contact Permanent)
2. **Pages Semestres (5 pages)** : Détail des modules et des 6 projets.
3. **Pages Projets (30 pages ou Modale)** : Focus technique sur chaque réalisation.

## 🗺️ Plan de Navigation
1. **Root (/)** : Intro simple + Interface du Switch physique.
2. **VLAN [1-5] (/semestre-X)** : Vue topologique du semestre.
3. **Node [1-6] (/semestre-X/projet-Y)** : Détails techniques du projet.

## 🛠️ Stack Technique Suggestion
- **Frontend** : HTML5 / CSS3 (Grid & Flexbox) / JS Vanille ou React.
- **Style** : Thème Dark Mode "Terminal" (Noir, Gris Anthracite, Bleu Électrique).


