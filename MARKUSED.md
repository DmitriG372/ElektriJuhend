# 💬 Märkuste Süsteem

**Versioon 3.0 - Lihtsustatud ja lollikindel**

## Ülevaade

See on lihtne süsteem märkuste tegemiseks elektripaigaldiste juhendis. Märkused salvestatakse brauseri mällu ja saadetakse automaatselt e-postiga projektijuhile.

## 🎯 Kuidas kasutada?

### 1️⃣ Märkuse lisamine

1. **Vali tekst** - Märgi hiire kursoriga tekst, mille kohta soovid märkuse teha
2. **Lisa märkus** - Klõpsa "💬 Lisa märkus" nuppu, mis ilmub
3. **Täida vorm**:
   - Sinu nimi
   - Märkuse tekst
4. **Salvesta** - Vajuta "💾 Salvesta märkus"

✅ Valmis! Märkus on salvestatud.

### 2️⃣ Märkuste vaatamine

- Märgitud tekst on **kollaselt esile tõstetud**
- Teksti kõrval on **💬 ikoon**
- Klõpsa ikoonil, et märkust vaadata või kustutada

### 3️⃣ Badge (Märkuste arv)

Ekraani paremas alanurgas olev nupp näitab **punast badge'i**, kus on kirjas **KÕIGI märkuste arv kogu juhendist**:

```
💬 (3)  ← 3 märkust kokku
```

Badge näitab märkusi KÕIGILT lehtedelt, mitte ainult praeguselt!

### 4️⃣ Märkuste saatmine

1. **Vajuta nuppu** 💬 ekraani paremas alanurgas
2. **Klõpsa** "📧 Saada e-postiga"
3. **E-posti klient avaneb automaatselt** koos valmis kirjaga

E-posti kiri sisaldab:
- Kõik märkused grupeerituna lehtede kaupa
- Automaatne pealkiri: `Juhendi märkused / kuupäev / autor`
- Adressaat: `dmitri@meliorprojekt.ee`

### 5️⃣ Hoiatus lehe sulgemisel

⚠️ Kui sul on **saatmata märkuseid** ja proovid lehte sulgeda, tuleb **hoiatus**:

```
Sul on saatmata märkuseid! Kas oled kindel, et soovid lahkuda?
```

See aitab vältida märkuste kaotamist.

## 🔧 Tehnilised detailid

### Salvestamine

- Kõik märkused salvestatakse **brauseri localStorage**
- Võti: `elektri-juhend-all-comments`
- Märkused on nähtavad **ainult samas brauseris**

### Märkuse struktuur

```json
{
  "id": "1234567890-abc123",
  "author": "Jaan Tamm",
  "text": "Siin võiks olla täpsem selgitus",
  "selectedText": "kaablite ristlõige",
  "timestamp": "2025-10-23T14:30:00.000Z",
  "pageUrl": "/ElektriJuhend/4_Tugevvool/4.1_Kaabelarvutus.html",
  "pageTitle": "4.1. Kaabelarvutus - Elektripaigaldiste Juhend",
  "xpath": "/html/body/div[1]/main/article/p[3]"
}
```

### E-posti formaat

```
Juhendi märkused / 23.10.2025 / Jaan Tamm

KOKKU MÄRKUSI: 5
KUUPÄEV: 23.10.2025
TEOSTAJA: Jaan Tamm

============================================================
LEHT 1: 4.1. Kaabelarvutus
MÄRKUSI: 2
============================================================

1. MÄRKUS
   Autor: Jaan Tamm
   Kuupäev: 23.10.2025, 14:30:15
   Valitud tekst: "kaablite ristlõige"
   Kommentaar: Siin võiks olla täpsem selgitus

...
```

## 🛡️ Lollikindlus

Süsteem on loodud olema maksimaalselt lihtne:

✅ **Ei vaja Git-i teadmisi** - Kõik toimib brauseris
✅ **Ei vaja JSON failide käsitsemist** - Automaatne
✅ **Hoiatus saatmata märkuste eest** - Ei kao ära
✅ **Automaatne e-posti kiri** - Kopeeri ja saada
✅ **Üks nupp** - Lihtne kasutada

## ❓ KKK

### Kas märkused sünkroniseeruvad arvutite vahel?

❌ Ei. Märkused salvestatakse **brauseri localStorage**, seega nad on nähtavad ainult samas brauseris.

**Lahendus**: Saada märkused e-postiga enne kui vahentad arvutit.

### Kas märkused kaovad kui kustutan brauseri ajaloo?

✅ Jah. localStorage kustutakse koos brauseri andmetega.

**Lahendus**: Saada märkused regulaarselt e-postiga.

### Mitu märkust saab teha?

🔢 Teoreetiliselt **piiramatu** (localStorage limit ~5-10MB), praktiliselt **umbes 1000+ märkust** enne kui täitub.

### Kas märkused jäävad alles kui värskenda lehte?

✅ Jah. Märkused laaditakse iga kord localStorage'ist.

### Kuidas märkusi kustutada?

2 võimalust:
1. **Üksikuid** - Klõpsa 💬 ikoonil ja vajuta "🗑️ Kustuta"
2. **Kõiki** - Ava brauseri konsool (F12) ja kirjuta:
   ```javascript
   localStorage.removeItem('elektri-juhend-all-comments')
   location.reload()
   ```

## 📞 Abi

Kui midagi ei tööta:

1. **Värskenda lehte** - `Ctrl+Shift+R` (Windows) või `Cmd+Shift+R` (Mac)
2. **Kontrolli konsooli** - `F12` → Console tab
3. **Tühista localStorage** - Vaata ülaltpoolt

Tehnilised küsimused: dmitri@meliorprojekt.ee

---

**Versioon**: 3.0
**Viimati uuendatud**: 23.10.2025
**Autor**: Claude + Dmitri Gridin
