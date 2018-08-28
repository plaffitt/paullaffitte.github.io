---
layout: page

information:
  firstname: Paul
  lastname: Laffitte
  profession: Développeur
  address: 20, Rue Ernest Michel
  zipCode: '34000'
  city: MONTPELLIER
  phoneNumber: "+33.01.04.24.96"
  emailAddress: paul.laffitte@epitech.eu
  linkedin: paul-laffitte-41b009140
  github: paullaffitte
  personalSite:
    label: localhost:8730
    icon: ''
    href: http://localhost:8730
  picture: https://avatars0.githubusercontent.com/u/23403270

about:
  label: A Propos
  content: Passionné d'informatique depuis jeune. Je cherche à an apprendre toujours
    plus, à améliorer mes compétences dans dse languages et technologies déjà connus
    ainsi qu'en apprendre de nouveaux.

skills:
- label: Compétences
  units:
  - type: text
    id: determination
    label: déterminé
  - type: text
    id: organisation
    label: organisé
  - type: text
    id: autonomy
    label: autonome
  - type: text
    id: inventiveness
    label: inventif
  - type: text
    id: sociability
    label: sociable
  - type: text
    id: toeic
    label: 750 points au TOEIC
- label: Languages
  sort: true
  units:
  - type: progressbar
    id: langC
    label: C
    value: 80
  - type: progressbar
    id: langJava
    label: Java
    value: 60
  - type: progressbar
    id: langCpp
    label: C++
    value: 60
  - type: progressbar
    id: langPython
    label: Python
    value: 40
  - type: progressbar
    id: langBash
    label: Bash
    value: 30
  - type: progressbar
    id: langCsharp
    label: C#
    value: 20

activities:
- label: EXPÉRIENCE PROFESSIONNELLE
  units:
  - title: Iamanys
    location: Fabrègues
    role: Développeur Java
    from: Aout 2015
    to: Mars 2016
    description: Participant au développement d'un gestionnaire de dossier de patient
      dans le domaine du médical.
    skills:
    - langJava
    - langCsharp

---
{{ page.information.firstname }} {{ page.information.lastname }}
