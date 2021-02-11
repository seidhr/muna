---
id: installation
title: Installation
sidebar_label: Installation
---

export const ButtonLink = ({children, color, href}) => (
  <a
    class="button"
    style={{
      display: 'inline-block',
      backgroundColor: color,
      borderRadius: '5px',
      border: 'none',
      color: '#fff',
      padding: '0.5rem',
      margin: '0 0.5rem 0.5rem 0',
      fontSize: '1.1rem',
      textTransform: 'uppercase',
      textDecoration: 'none',
    }}
    href={href}>
    {children}
  </a>
)

:::warning
**Muna** will be unstable for some time. Fork and do you own thing or [suggest improvements!](https://github.com/tarjelavik/sanity-plugin-muna/issues) 
:::

## [Experimental] "One-click" installation

Combine the experimental community feature of [sanity.io/create](https://www.sanity.io/create) with the unstable nature of the **Muna** schema! Great fun!

<ButtonLink color="#25c2a0" href="https://www.sanity.io/create?template=tarjelavik/sanity-template-muna">💥 Create your Muna Studio 💥</ButtonLink> <a href="https://github.com/tarjelavik/sanity-template-muna">Muna Template (WIP)</a>

The template for Sanity Studio comes with the **Muna** plugin installed and a predefined desk structure.

## [Experimental] Install as a plugin in your existing Studio

```bash
npm install -g @sanity/cli
sanity init
sanity install muna
sanity start
```

The Sanity studio will fire up on http://localhost:3333/, but without the desk structure you deserve!.

### Desk structure

Copy the content of the deskStructure folder into your Sanity studio and add this to sanity.json:

```json
  ...
  "parts": [
    {
      "name": "part:@sanity/desk-tool/structure",
      "path": "./deskStructure.js"
    },
  ]
  ...
```

Finally install react-icons, since the version that Sanity uses is old.

```bash
# For the icons in deskStructure.js
npm install --save react-icons
```
