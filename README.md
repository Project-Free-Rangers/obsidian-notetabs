<img src="./docs/assets/notetabs-logo-lockup.svg" alt="Note Tabs logo" width="95%" style="height: auto;">
<br><br>

![Dynamic Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FProject-Free-Rangers%2Fobsidian-notetabs%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=%24.version&style=plastic&logo=github&label=version&color=3BA3FF
) ![Static Badge](https://img.shields.io/badge/plugin_developed_by-Project_Free_Rangers-973bff?style=plastic&logo=obsidian)

Elevate your Obsidian notes with tabbed sections. **Note Tabs** offers an intuitive way to organize your notes with a simple click. **Note Tabs** is highly responsive and compatible with most plugins and themes you choose to use with it.

<br>

<img src="./docs/assets/notetabs_feature-basic-layout@2x.jpg" width="100%" style="height: auto;">

<br>

> ## ![Getting Started](./docs/assets/book-open-text.svg) Getting Started
>
> - [How to Install](#-how-to-install)
>    - [From Obsidian](#from-obsidian)
>    - [Manual Installation](#manual-installation)
> - [How to Use](#-how-to-insert-a-note-tabs-section)
> - [Core Features](#-core-features)
> - [Support](#-support)
> - [Known Issues](#-known-issues)
>   - [Slow loading in Live Preivew](#slow-loading-in-live-preivew)
>

<br>
<br>

## ![Installation Guide](./docs/assets/download.svg) How to Install

### From Obsidian

1. Within the **Community plugins** setting, select **Browse**
2. Search for "**Note Tabs**" from the search bar of the plugin list
3. Select **Note Tabs** (by Project Free Rangers)
4. Install the plugin, then enable

### Manual Installation

1. Go to `.obsidian/plugins` within your desired vault's folder structure and create an `obsidian-notetabs` folder
1. Download the latest `main.js`, `style.css`, and `manifest.json` from [**Releases**](https://github.com/Project-Free-Rangers/obsidian-notetabs/releases) into the `obsidian-notetabs` folder
3. Open Obsidian and navigate to **Community plugins**
4. Enable **Note Tabs**

🎉🎉 _Happy organizing!_

<br>

## ![How to Use](./docs/assets/square-mouse-pointer.svg) How to Insert a Note Tabs Section

1. Right-click in the Obsidian editor while in Edit mode
2. Select "**Add new notetabs section**" to insert an entirely new tabbed section, or
3. Select "**Add new notetabs tab**" within an existing tabbed section to add a new tab

| Context Menu Options |
| ------------- |
| <img src="./docs/assets/notetabs__how-to-use@2x.jpg" width="25%" style="height: auto;"> |

**Example of markdown:**

```
~~~notetabs

---begintab
header: New Tab

Replace this with your tab content.
---closetab

~~~
```

<br>

## ![Features](./docs/assets/pencil-ruler.svg) Core Features

| Adaptive Tab Headers |
| ------------- |
| <img src="./docs/assets/notetabs__feature-adaptive-tab-headers@2x.jpg" width="100%" style="height: auto;"> |

<br>

| Vertical Tab Orientation |
| ------------- |
| <img src="./docs/assets/notetabs__feature-vertical-tabs@2x.jpg" width="100%" style="height: auto;"> |

<br>

| Compact Layout Available |
| ------------- |
| <img src="./docs/assets/notetabs__feature-compact-layout@2x.jpg" width="100%" style="height: auto;"> |

<br>

| Optional Rounded-edges |
| ------------- |
| <img src="./docs/assets/notetabs__feature-optional-rounded-edges@2x.jpg" width="100%" style="height: auto;"> |

<br>

| Minimalist Style Available |
| ------------- |
| <img src="./docs/assets/notetabs__feature-minimal-style@2x.jpg" width="100%" style="height: auto;"> |

<br>

## ![Support Project Free Rangers](./docs/assets/heart-handshake.svg) Support

**Project Free Rangers** is the free-spirited brainchild of me ([Jheanell Elliott](https://github.com/jaemega)). I'm an artist, mentor, and software architect by trade. When I'm not wrangling teams or large projects, I like to cobble together nifty side projects that I think are rad and provide them for free.

If you like any of the fun projects I develop and want to say an extra thank you:

<a href='https://ko-fi.com/N4N11RXRQW' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi5.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

<br>

## ![Known Issues](./docs/assets/search-code.svg) Known Issues

### Slow loading in Live Preivew
In some vaults, Live Preview may take a second or two to render **Note Tabs** properly. This is not a bug with **Note Tabs**, but rather, a quirk of Live Preview when dealing with certain markdown. [See forum discussions here.](https://forum.obsidian.md/search?q=live%20preview%20slow%20render)

This slow rendering doesn't happen often and will resolve itself once Obsidian triggers its own Live Preview rerender.

---
---
<br>

> **Credits:**
> - _**Note Tabs** tab logo ©️ 2026 Jheanell Elliott (Project Free Rangers)_
> - _Icons courtesy of [Lucide](https://lucide.dev/)_
