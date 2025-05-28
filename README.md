# Elektripaigaldiste Projekteerimise Juhend

See juhend on mõeldud elektripaigaldiste projekteerimise alustele ja parimatele praktikatele. Juhend sisaldab põhjalikku infot elektripaigaldiste projekteerimise erinevate aspektide kohta, alates sissejuhatusest kuni spetsiifiliste tehniliste detailideni.

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

## Tehnilised nõuded

- MkDocs Material teema
- Python 3.8+
- MkDocs 1.4.0+
- mkdocs-print-site plugin

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