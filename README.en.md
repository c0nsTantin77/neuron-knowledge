# NEURON

English · [简体中文](README.md)

A personal library for links and notes. It uses a light layout with colored categories and card views. The library starts empty, so you can add your own collection.

## Features

- Save links to articles, posts, and projects with your own notes.
- Create categories, choose their colors, and add tags for other dimensions.
- Search titles, tags, and notes. Switch between cards and a list.
- Browse category connections in a knowledge graph.
- Bookmark entries and import or export JSON backups.

Built-in categories include algorithms, motion control, VLA, world models, hardware, and systems. These are category options, with no personal content attached. The application interface is currently in Chinese.

## Run locally

With Python 3 installed, run this command from the repository directory:

```sh
python3 -m http.server 4317 --bind 127.0.0.1 --directory docs
```

Open <http://127.0.0.1:4317>. The app uses HTML, CSS, and JavaScript. It needs no frontend dependencies or build step.

## Deploy to GitHub Pages

1. Upload the files to your repository.
2. Open **Settings → Pages**.
3. Set Source to **Deploy from a branch**.
4. Select the `main` branch and the `/docs` folder, then save.
5. Wait for GitHub to display the site URL.

Changes to `docs/` trigger a new publication. Relative asset paths support deployment under a repository subpath.

## Use the library

Choose “收藏内容” to add a link, title, category, and note. Choose “新建领域” in the sidebar to create a category and select its color. You can add up to 60 custom categories, with names up to 24 characters long.

Use a category for the main topic and tags for overlapping dimensions. For example, a note can belong to robot perception and carry both paper and to-read tags.

Press `Ctrl/Cmd + K` or `/` to focus the search field.

## Storage and backups

Entries, bookmarks, and custom categories stay in the current browser's `localStorage`. They are not uploaded to GitHub or synchronized across devices. Clearing browser data removes these local records.

Use “导出 JSON” at the bottom of the page to download a backup. Use “导入备份” to restore it in another browser. Imports accept up to 500 entries in a file no larger than 5 MB. Keep personal backups out of public repositories.

This repository contains no personal Notion links, account credentials, or saved entries. Source icons identify platforms and do not imply an affiliation.

## Reading links and syncing data

This version stores links and notes entered by the user. “复制整理指令” copies a prompt for an assistant. The app has no backend for fetching articles or calling a model.

Notion is not required. Reading links, generating summaries, and syncing data within the site would require a backend, a database, and authentication. Model API keys belong on the server. GitHub Pages hosts static files and cannot run those server tasks itself.

## Files

- `docs/index.html`: page structure and forms.
- `docs/style.css`: layout, colors, and responsive styles.
- `docs/app.js`: entries, search, categories, graph, and backups.
- `docs/.nojekyll`: direct static publication on GitHub Pages.

## Design references

[Quartz](https://github.com/jackyzha0/quartz) informed the knowledge network structure. [Kaiforge Lite](https://github.com/DevxiaLabs/kaiforge-lite) informed the dashboard layout. The interface and graphics were implemented independently.
