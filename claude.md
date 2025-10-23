# Elektripaigaldiste Projekteerimise Juhend - Projekti Ülevaade

## 🎯 Projekti Eesmärk

See on **eestikeelne elektripaigaldiste projekteerimise juhend**, mis on loodud standardiseerima ja parandama elektrisüsteemide projekteerimise kvaliteeti Eestis. Projekt on inspireeritud Soome "Sähkötieto ry ST-kortisto" standarditest, kuid kohandatud Eesti õigusruumi ja tööpraktikate jaoks.

## 📊 Projekti Informatsioon

- **Nimi:** Elektripaigaldiste Projekteerimise Juhend
- **Versioon:** v1.0 – 15.04.2025
- **Keel:** Eesti
- **Litsents:** MIT (2024 Dmitri Gridin)
- **Repository:** https://github.com/dmitrig372/ElektriJuhend
- **Live Site:** https://dmitrig372.github.io/ElektriJuhend/

## 🏗️ Projekti Struktuur

```
ElektriJuhend/
├── docs/                           # Dokumentatsiooni lähtekood
│   ├── 1_Sissejuhatus/            # Sissejuhatus (5 faili)
│   ├── 2_Projekteerimine/         # Projekteerimise põhimõtted (4 faili)
│   ├── 3_Dokument/                # Dokumentatsioon (7 faili)
│   ├── 4_Tugevvool/               # Tugevvoolasüsteemid (6 faili)
│   ├── 5_Norkvool/                # Nõrkvoolasüsteemid (9 faili)
│   ├── 6_Automaatika/             # Automaatikasüsteemid (7 faili)
│   ├── 7_BIM/                     # BIM ja info-mudeldamine (6 faili)
│   ├── 8_Kvaliteet/               # Kvaliteedikontroll (4 faili)
│   ├── 9_Lisad/                   # Lisad ja viited (5 faili)
│   ├── _assets/media/             # Pildid ja meediumifailid
│   └── stylesheets/extra.css      # Kohandatud stiilid
├── overrides/                      # MkDocs teema ülekirjutused
├── .github/workflows/              # GitHub Actions CI/CD
├── mkdocs.yml                      # MkDocs peamine konfiguratsioon
├── requirements.txt                # Python sõltuvused
└── README.md                       # Projekti README

Kokku: 60 Markdown faili, ~2,946 rida dokumentatsiooni
```

## 🛠️ Tehnoloogiad ja Tööriistad

### Põhitehnoloogiad
- **MkDocs** (1.4.0+) - Staatiliste saitide generaator dokumentatsioonile
- **Material for MkDocs** - Professionaalne Material Design teema
- **Python** (3.8+) - Backend runtime ehitamiseks

### MkDocs Konfiguratsioon
- **Teema:** Material Design
- **Keel:** Eesti (et)
- **Värvid:**
  - Primaarne: Roheline (#2E7D32)
  - Aktsent: Terasesinine (#607D8B)
- **Funktsioonid:**
  - Navigatsioonitabid
  - Sektsiooni navigatsioon
  - Sisukord külgribal
  - "Tagasi üles" nupp
  - Jalus navigatsiooniga
  - GitHub repositooriumi lingid
  - Hele/tume režiim

### Markdown Laiendused ja Pluginad
- **toc** - Sisukord permalinkidega
- **admonition** - Tähelepanu blokid (callouts)
- **footnotes** - Joonealused märkused
- **search** - Täisteksti otsing
- **print-site** - PDF eksport kogu dokumentatsioonist

### CI/CD ja Hosting
- **GitHub Pages** - Automaatne hosting
- **GitHub Actions** - Automaatne ehitamine ja deploy main haru push'imisel
- **Workflow:** `.github/workflows/gh-pages.yml`

## 📚 Dokumentatsiooni Struktuur

Juhend on jagatud 9 põhipeatükiks, järgides loogilist progressiooni üldisest konkreetseni:

### 1. Üldine Tase (Peatükid 1-3)
- **1. Sissejuhatus** - Juhendi eesmärk, kasutamine, terminoloogia
- **2. Projekteerimise põhimõtted** - Projektifaasid, nõuded, koostöö
- **3. Dokumentatsioon** - Üldised nõuded, vormindus, joonised

### 2. Tehnilised Erialad (Peatükid 4-6)
- **4. Tugevvool** - Elektriskeemid, kilbid, kaabliteed, valgustus, maandus
- **5. Nõrkvool** - Andmevõrgud, side, turvalisus, antennid, audio
- **6. Automaatika** - Hooneautomaatika (BACS), struktuuriskeemid, BIM

### 3. Kaasaegsed Praktikad (Peatükk 7)
- **7. BIM** - Info-mudeldamine, LOD tasemed, IFC, koostöö

### 4. Kvaliteet ja Tugi (Peatükid 8-9)
- **8. Kvaliteet** - Kvaliteedijuhtimine, testimine, standardid
- **9. Lisad** - Viited, sõnastik, näited, tabelid

### Projektifaasid (EVS 932:2017)
Dokumentatsioonis kasutatakse järgmisi faase:
- **EP** (Eelprojekt) - Esialgne projekt
- **PP** (Põhiprojekt) - Põhiprojekt/detailprojekt
- **TP** (Töövõtja/ehitusprojekt) - Tööprojekt

## 🎯 Sihtgrupp

- Elektriinsenerid ja projekteerijad
- Projektijuhid ja peaprojekteerijad
- Ehituse tellijad ja arendajad
- Ehitusfirmad
- Järelevalve ja inspektsioonipersonal
- Kutseorganisatsioonid ja õppeasutused

## 📋 Peamised Standardid ja Viited

- **EVS 932:2017** - Eesti ehitusprojekti standardid
- **EVS-EN ISO standardid** - ISO standardid tehniliste jooniste jaoks
- **IEC 60617** - Elektrilised sümbolid ja konventsioonid
- **IEC 61082** - Elektriliste seadmete dokumentide koostamine
- **IFC (Industry Foundation Classes)** - Avatud BIM standard

## 🚀 Kuidas Projektiga Töötada

### Eeldused
```bash
# Vajalik tarkvara
- Python 3.8 või uuem
- pip (Python package manager)
- Git
```

### Paigaldamine ja Seadistamine

1. **Klooni repositoorium:**
```bash
git clone https://github.com/dmitrig372/ElektriJuhend.git
cd ElektriJuhend
```

2. **Loo virtuaalkeskkond (soovituslik):**
```bash
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
# või
.venv\Scripts\activate     # Windows
```

3. **Paigalda sõltuvused:**
```bash
pip install mkdocs
pip install mkdocs-material
pip install -r requirements.txt
```

### Lokaalne Arendus

**Käivita arendusserver:**
```bash
mkdocs serve
```
Ava brauser aadressil: http://127.0.0.1:8000

**Automaatne värskendamine:**
MkDocs jälgib faile ja laeb brauseri automaatselt ümber, kui teed muudatusi.

### Ehitamine

**Genereeri staatiline sait:**
```bash
mkdocs build
```
Väljund: `site/` kataloog sisaldab valmis HTML-i

**Ehita range režiimiga (soovituslik):**
```bash
mkdocs build --strict
```
Katkestab hoiatuste korral (kasulik CI/CD-s)

### Deployment

**Automaatne deployment:**
- Push'i `main` harusse
- GitHub Actions käivitab automaatselt workflow
- Sait ilmub GitHub Pages'i: https://dmitrig372.github.io/ElektriJuhend/

**Manuaalne deployment:**
```bash
mkdocs gh-deploy
```

## 📝 Dokumentatsiooni Redigeerimine

### Failistruktuur
- Kõik Markdown failid on kataloogis `docs/`
- Kasuta loogilist hierarhiat peatükkide kaupa
- Lisa pildid kataloogi `docs/_assets/media/`

### Vormindusreeglid
```markdown
# H1 - Peatüki pealkiri (ainult üks faili kohta)
## H2 - Alapeatükk
### H3 - Sektsiooni pealkiri

**Rasvane tekst** - olulised terminid
*Kursiivis* - rõhutus

- Punktloend
1. Nummerdatud loend

[Link tekst](URL)
![Pildi alt-tekst](../_assets/media/pilt.png)
```

### Admonition Blokid (Tähelepanuväljad)
```markdown
!!! note "Märkus"
    See on märkus.

!!! warning "Hoiatus"
    See on hoiatus.

!!! info "Informatsioon"
    See on info blokk.
```

## 🔍 Kasutegurid

### Otsing
- Live site sisaldab täisteksti otsingut
- Kasuta otsinguriba ülaosas

### PDF Eksport
- Print Site plugin võimaldab eksportida kogu dokumentatsiooni PDF-i
- Ava live saidil ja kasuta "Print Site" funktsiooni

### Redigeerimine GitHubis
- Igal lehel on "Edit on GitHub" link
- Võimaldab kiireid parandusi brauseri kaudu

## 🤝 Panustamine

### Workflow
1. Fork'i repositoorium
2. Loo uus branch (`git checkout -b feature/uus-funktsioon`)
3. Tee muudatused
4. Commit'i muudatused (`git commit -m 'Lisa uus funktsioon'`)
5. Push'i branch'i (`git push origin feature/uus-funktsioon`)
6. Ava Pull Request

### Kontrollimisel
- Testi lokaalselt: `mkdocs serve`
- Ehita range režiimiga: `mkdocs build --strict`
- Kontrolli linke ja pilte
- Jälgi vormindusreegleid

## 📊 Projekti Staatus

- **Hetkeseisund:** Aktiivselt arendatav
- **Versioon:** v1.0
- **Viimati uuendatud:** Vastavalt git log'ile
- **Haru:** main
- **CI/CD:** ✅ Aktiivne (GitHub Actions)

## 🔗 Kasulikud Lingid

- [MkDocs Dokumentatsioon](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [EVS 932:2017 Standard](https://www.evs.ee/)
- [GitHub Repository](https://github.com/dmitrig372/ElektriJuhend)
- [Live Juhend](https://dmitrig372.github.io/ElektriJuhend/)

## 📞 Kontakt

- **Autor:** Dmitri Gridin
- **GitHub:** [@dmitrig372](https://github.com/dmitrig372)
- **Issues:** [GitHub Issues](https://github.com/dmitrig372/ElektriJuhend/issues)

---

**Märkus:** See fail on loodud, et aidata mõista projekti struktuuri ja töövoogu. Kui sul on küsimusi või soovitusi, ava Issue või Pull Request GitHubis.
