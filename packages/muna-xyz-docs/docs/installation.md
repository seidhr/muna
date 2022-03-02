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
**Muna** will be unstable for some time. Fork and do you own thing or [suggest improvements!](https://github.com/seidhr/sanity-template-muna/issues)
:::

## Installation

spin up your own Muna project with [sanity.io/create](https://www.sanity.io/create). As of 2022 this is for demonstration purposes, as a major overhaul is being done with the support of the University of Bergen Library. 

<ButtonLink color="#25c2a0" href="https://create.sanity.io/?template=seidhr/sanity-template-muna">💥 Create your Muna Studio 💥</ButtonLink> <a href="https://github.com/seidhr/sanity-template-muna">Muna Template (WIP)</a>


<!-- ### [Deprecated] Install as a plugin in your existing Studio

Before Sanity introduced community templates, the **Muna** schema was available as a separate schema plugin (well, still is, but).

This way of installing **Muna** makes it harder for the user to make changes as this means forking the repo and so on. Thought **Muna** aim to be a standard makes it easier to exchange data, it is not complete or aim to solve every use case.

`sanity-plugin-muna` is therefore deprecated. It could resurface if it can be automatically exported from the `template/studio`

```bash
npm install -g @sanity/cli
sanity init
sanity install muna
sanity start
```

The Sanity studio will fire up on http://localhost:3333/, but without the desk structure you deserve!.

#### Desk structure

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
 -->