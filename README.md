# 8kajis.lv — LIAA projekts (dizaina prototips)

Mājaslapas redizaina sākotnējās skices [8kajis.lv](https://8kajis.lv) — bērnu attīstošu rotaļlietu un sensoro telpu zīmols.

## Konteksts

- **Projekts:** LIAA līdzfinansēts redizains
- **Partneris:** [beleduc Lernspielwaren](https://www.beleduc.de/)
- **Valodas:** LV / EN / RU / LT / EE
- **Tehniskā integrācija:** [Swotzy](https://www.swotzy.com/) piegāde, [MakeCommerce](https://makecommerce.lv/) maksājumi
- **Dizaina rīks:** [Google Stitch](https://stitch.withgoogle.com/) (Maritime Sensory dizaina sistēma)

## Ekrāni

| Lapa | Ceļš |
|------|------|
| Sākumlapa (Hero) | `/` |
| Pārskats (visi prototipi) | `/overview` |
| Veikals | `/pages/veikals` |
| Sensorā telpa Bimini | `/pages/sensora-bimini` |
| Produkts | `/pages/produkts` |
| Kontakti (forma) | `/pages/kontakti` |
| Mobilā galvenā lapa | `/pages/mobile` |

## Lokāli

```bash
npx serve .
```

## Deploy

Auto-deploy uz Vercel pie katra `git push` uz `main`.

## Stack

Plain HTML + Tailwind CSS (CDN). Nav build process. Statisks hosting.
