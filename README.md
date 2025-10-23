# Elektripaigaldiste Projekteerimise Juhend

See juhend on mõeldud elektripaigaldiste projekteerimise alustele ja parimatele praktikatele. Juhend sisaldab põhjalikku infot elektripaigaldiste projekteerimise erinevate aspektide kohta, alates sissejuhatusest kuni spetsiifiliste tehniliste detailideni.

## 🆕 Viimased Uuendused

**v1.2 (2025-10-23)**
- 🐛 Parandatud lõpmatu tsükkel MutationObserver'is
- ⚡ Optimeeritud highlight meetod (innerHTML.replace)
- 🎯 Parem töökindlus GitHub Pages'is
- 🔒 Re-entry kaitse ja debouncing

**v1.1**
- ✨ Märkuste redigeerimine ja kustutamine
- 📋 Märkuste nimekiri ekspordi dialoogis
- ℹ️ Pulseeriv info nupp juhendiga

**v1.0**
- 💬 Interaktiivne märkuste süsteem
- 📧 E-posti integratsioon
- 🎨 Material teema kujundus

## 💬 Märkuste süsteem

Juhendis on integreeritud interaktiivne märkuste süsteem, mis võimaldab kasutajatel:
- ✏️ **Lisada märkuseid** - Vali tekst ja tee paremklõps
- 👁️ **Vaadata märkuseid** - Kollaselt esile tõstetud tekstid
- 📧 **Saata e-postiga** - Kogutud märkused saadetakse automaatselt
- 🔄 **Redigeerida** - Muuda olemasolevaid märkuseid
- 🗑️ **Kustutada** - Eemalda mittevajalikud märkused

### Kuidas kasutada?

1. Vali juhendis tekst, mille kohta soovid märkuse teha
2. Tee **paremklõps** (right-click)
3. Klõpsa "💬 Lisa märkus"
4. Täida vorm (nimi ja märkus)
5. Vajuta "💾 Salvesta märkus"

Kõik märkused kuvatakse ekraani paremas ülanurgas 💬 nupu all. Info nupp (ℹ️) avab detailse juhendi.

**Tähelepanu:** Märkused salvestatakse brauseri localStorage'is ja ei sünkroniseeru automaatselt. Saada märkused regulaarselt e-postiga!

## Sisukord

1. [Sissejuhatus](docs/1_Sissejuhatus/index.md)
   - Juhendi eesmärk ja käsitlusala
   - Juhendi kasutamine
   - Terminid ja määratlused
   - Normatiivsed viited
   - Vastutus ja pädevus

2. [Projekteerimise põhimõtted](docs/2_Projekteerimine/index.md)
   - Projekteerimise etapid
   - Lähteülesanne ja lähteandmed
   - Koostöö teiste osapooltega
   - Riskianalüüs ja ohutus

3. [Dokumentatsioon](docs/3_Dokument/index.md)
   - Üldnõuded dokumentatsioonile
   - Digitaalne vormistamine
   - Dokumentide struktuur
   - Jooniste ja skeemide nõuded

4. [Tugevvool](docs/4_Tugevvool/index.md)
   - Üldskeemid
   - Kilbiskeemid
   - Kaabliteed
   - Valgustus- ja jõupaigaldised
   - Maandus ja piksekaitse

5. [Nõrkvool](docs/5_Norkvool/index.md)
   - Andmevõrgud
   - Turvasüsteemid
   - Juurdepääsukontroll
   - Videojälgimine
   - Side- ja helisüsteemid

6. [Automaatika](docs/6_Automaatika/index.md)
   - Juhtimissüsteemid
   - Andurid ja mõõteseadmed
   - Ajamid ja võllid
   - Juhtimispaneelid

7. [BIM](docs/7_BIM/index.md)
   - Üldpõhimõtted
   - Mudeli detailsusaste
   - Modelleerimise standardid
   - Koostöö mudelis

8. [Kvaliteet](docs/8_Kvaliteet/index.md)
   - Kontroll ja testimine
   - Dokumentatsioon
   - Standardid ja nõuded

9. [Lisad](docs/9_Lisad/index.md)
   - Viited
   - Sõnastik
   - Näited
   - Tabelid

## Funktsioonid

### 📚 Dokumentatsioon
- 9 põhjalikku peatükki elektripaigaldiste projekteerimisest
- GitHub Pages hosting automaatse CI/CD-ga
- Material for MkDocs teema
- Eestikeelne sisu

### 💬 Interaktiivne märkuste süsteem
- **Teksti valimine ja märkuste lisamine** - Paremklõps valitud tekstil
- **localStorage põhine salvestamine** - Märkused säilivad brauseris
- **E-posti integratsioon** - Saada kõik märkused ühes e-kirjas (mailto:)
- **Märkuste redigeerimine ja kustutamine** - Muuda või eemalda märkuseid
- **Pulseeriv info nupp** - Kasutamise juhend alati kättesaadav (ℹ️)
- **Badge märkuste arvuga** - Näitab kõigi lehekülgede märkusi (💬)
- **Hoiatus lehe sulgemisel** - Kui märkused on saatmata
- **Optimeeritud GitHub Pages jaoks** - Lihtsustatud innerHTML.replace() meetod
- **Lõpmatu tsükli kaitse** - MutationObserver debouncing ja re-entry kaitse

## Tehnilised nõuded

### Backend
- Python 3.8+
- MkDocs 1.4.0+
- MkDocs Material teema

### Frontend
- JavaScript (ES6+)
  - localStorage API
  - MutationObserver (DOM muutuste jälgimine)
  - innerHTML.replace() (teksti highlight'imine)
- CSS3
  - Animatsioonid (@keyframes pulse)
  - Flexbox layout
  - Fixed positioning
- HTML5
  - Context menu events
  - Range API (teksti valimine)

## Paigaldus

```bash
# Klooni repositoorium
git clone https://github.com/dmitrig372/ElektriJuhend.git

# Liigu projekti kausta
cd ElektriJuhend

# Paigalda sõltuvused
pip install -r requirements.txt

# Käivita arendusserver
mkdocs serve
```

## Kaastöö

Kui soovid kaasa aidata juhendi täiendamisel:

1. Tee fork repositooriumist
2. Loo uus haru (`git checkout -b feature/amazing-feature`)
3. Tee oma muudatused
4. Commit muudatused (`git commit -m 'Lisa uus funktsionaalsus'`)
5. Push haru (`git push origin feature/amazing-feature`)
6. Ava Pull Request

## Litsents

See projekt on litsentseeritud MIT litsentsi all - vaata [LICENSE](LICENSE) faili detaile.

## Kontakt

Dmitri Gridin - [@dmitrig372](https://github.com/dmitrig372)

Projekti link: [https://github.com/dmitrig372/ElektriJuhend](https://github.com/dmitrig372/ElektriJuhend)