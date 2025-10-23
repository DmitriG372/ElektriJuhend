# 📝 Märkuste Kataloog

See kataloog sisaldab eksporditud märkuseid/kommentaare dokumentatsiooni lehtede kohta.

## 📁 Struktuur

Iga lehe märkused on salvestatud eraldi JSON faili:

```
comments/
├── README.md                          # See fail
├── 5_Norkvool_5.1_Norkvool.json      # Näide: Nõrkvool peatüki märkused
├── 7_BIM_7.1_Üldpõhimõtted.json      # Näide: BIM peatüki märkused
└── ...                                # Muud lehtede JSON failid
```

## 🔄 Kuidas Sünkroniseerida

### 1. Lisa Märkus Lokaalselt

1. Ava juhend brauseris: `mkdocs serve`
2. Vali tekst lehel
3. Parema hiire klõps → "📝 Lisa märkus"
4. Kirjuta märkus ja salvesta

### 2. Ekspordi Märkused

1. Klõpsa **📥 nuppu** paremas alanurgas
2. Vali **"📄 JSON (selle lehe märkused)"**
3. Fail laetakse alla (näiteks: `5_Norkvool_5.1_Norkvool.json`)

### 3. Salvesta Projekti

1. Kopeeri allalaetud JSON fail siia kataloogi:
   ```bash
   cp ~/Downloads/5_Norkvool_5.1_Norkvool.json docs/comments/
   ```

2. Commit ja push GitHubi:
   ```bash
   git add docs/comments/*.json
   git commit -m "Lisa märkused: Nõrkvool peatükk 5.1"
   git push
   ```

### 4. Teised Kasutajad Saavad Märkused

1. Pull'i uusimad muudatused:
   ```bash
   git pull
   ```

2. Märkused laetakse automaatselt JSON failidest!

## 🔍 JSON Faili Formaat

Iga JSON fail sisaldab:

```json
{
  "pageId": "5_Norkvool_5.1_Norkvool",
  "pageUrl": "/ElektriJuhend/5_Norkvool/5.1_Norkvool.html",
  "exportDate": "2025-10-23T17:00:00.000Z",
  "commentsCount": 2,
  "comments": [
    {
      "id": "comment-1729702800000",
      "text": "See vajab täpsustamist",
      "selectedText": "Nõrkvoolupaigaldised",
      "pageUrl": "/ElektriJuhend/5_Norkvool/5.1_Norkvool.html",
      "pageId": "5_Norkvool_5.1_Norkvool",
      "timestamp": "2025-10-23T17:00:00.000Z",
      "author": "Dmitri",
      "position": {
        "xpath": "/html/body/...",
        "text": "Nõrkvoolupaigaldised"
      }
    }
  ]
}
```

## 📦 Ekspordi Kõik Märkused

Kui soovid eksportida KÕIK lehtede märkused korraga:

1. Klõpsa **📥 nuppu**
2. Vali **"📦 JSON (kõik lehed)"**
3. Fail: `elektrijuhend-markused-koik-2025-10-23.json`

See fail sisaldab KÕIKI lehtede märkuseid:

```json
{
  "exportDate": "2025-10-23T17:00:00.000Z",
  "pagesCount": 3,
  "totalComments": 7,
  "pages": {
    "5_Norkvool_5.1_Norkvool": [ /* märkused */ ],
    "7_BIM_7.1_Üldpõhimõtted": [ /* märkused */ ],
    "4_Tugevvool_4.4_Kaabliteed": [ /* märkused */ ]
  }
}
```

## 📥 Impordi Märkused

Kui keegi jagab sinuga JSON faili:

1. Klõpsa **📥 nuppu**
2. Vali **"📥 Impordi JSON"**
3. Vali JSON fail oma arvutist
4. Märkused imporditud! ✓

## 🗑️ Märkuste Kustutamine

### Üksik Märkus
- Klõpsa 💬 ikoonile
- Vajuta "🗑️ Kustuta"

### Kõik Lehe Märkused
Brauseri konsool (F12):
```javascript
localStorage.removeItem('doc-comments-5_Norkvool_5.1_Norkvool');
location.reload();
```

### Kõik Märkused (kõik lehed)
Brauseri konsool (F12):
```javascript
Object.keys(localStorage)
  .filter(key => key.startsWith('doc-comments-'))
  .forEach(key => localStorage.removeItem(key));
location.reload();
```

## 📝 Markdown Eksport

Kui soovid märkuseid inimloetavas formaadis:

1. Klõpsa **📥 nuppu**
2. Vali **"📝 Markdown"**
3. Fail: `5_Norkvool_5.1_Norkvool-markused.md`

See fail sisaldab kõiki märkuseid Markdown formaadis ja saab panna otse dokumentatsiooni või GitHubi Issue'sse.

## 🔐 Turvanõuded

- ❌ **Ära** commit'i tundlikku infot märkustesse
- ✅ Märkused on avalikud kõigile, kes projekti kloonivad
- ✅ Kasuta professionaalset keelt

## 💡 Parimad Praktikad

### Märkuse Kirjutamine
```
✅ HYVÄ: "Lisa selgitus LOD 350 kohta ptk 7.2 näitel"
❌ HALB: "See on vale"

✅ HYVÄ: "Kontrollida standardit EVS-EN 61439 viite"
❌ HALB: "???"
```

### Commiti Sõnum
```bash
# Hea
git commit -m "Lisa märkused: Nõrkvool ptk 5.1 (3 märkust)"

# Parem
git commit -m "Revisioon: Nõrkvool 5.1 - standardite viited (DG)"
```

## 🆘 Abi

Kui on probleeme, vaata:
- `MARKUSED.md` failist projekti juurkaustas - Üldine kasutusjuhend
- [GitHub Issues](https://github.com/dmitrig372/ElektriJuhend/issues)

---

**Märkus:** See on ajutine funktsioon revisjooni ajaks. Pärast revisjoni võib kaaluda professionaalsemat lahendust (nt GitHub Discussions, Confluence, jms).
