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

## Connect an AI API

1. Open “AI 设置” in the sidebar.
2. Enter the full endpoint, such as `https://your-provider.example/v1/chat/completions`.
3. Enter the model ID and API key from your provider.
4. Optionally select “测试连接”, then select “应用配置”. The connection test sends a short message and may incur charges.
5. Open an entry and select “AI 分析”. Paste the source text or notes, choose an analysis mode, and select “发送文字并分析”.
6. Review the output and select “保存分析”. The result is saved separately from your original notes.

The adapter sends `model`, `messages`, and `stream: false`. It reads `choices[0].message.content`. Providers and gateways that implement the Chat Completions format can use this adapter. [DeepSeek's API documentation](https://api-docs.deepseek.com/api/create-chat-completion/) provides an example of this format. Use the endpoint and model ID specified by your provider.

Endpoints must use HTTPS and end in `/chat/completions`. Keys use Bearer authentication. Leave the key empty for a gateway that does not require one. Native Anthropic Messages, Gemini, and Responses formats are not supported.

The key stays in page memory and is cleared on reload. The endpoint and model ID are stored locally. Backups include saved analyses but exclude API settings and keys. Text and keys go directly to the configured service, so check that you trust the endpoint.

GitHub Pages hosts static files. Direct browser requests require the provider to allow CORS. If it does not, use an HTTPS gateway that you manage. Keep shared, long-lived provider keys on your backend when they must remain private. Do not commit them to the source code.

Each request accepts up to 30,000 characters and times out after 90 seconds. You can cancel a request, although the provider may still charge for work already performed. Output is displayed as plain text. The app reports truncated responses.

This feature analyzes supplied text. It does not fetch article links, images, or comments. Notion is not required. Automatic collection and cross-device sync still need a backend and database.

## Checks

```sh
node --test ai.test.cjs
```

Tests cover the request format, endpoint validation, keyless gateways, errors, truncated output, and cancellation signals. They use simulated responses and do not call paid APIs.

## Files

- `docs/index.html`: page structure and forms.
- `docs/style.css`: layout, colors, and responsive styles.
- `docs/app.js`: entries, search, categories, graph, and backups.
- `docs/ai.js`: API requests, configuration, and saved analyses.
- `docs/.nojekyll`: direct static publication on GitHub Pages.

## Design references

[Quartz](https://github.com/jackyzha0/quartz) informed the knowledge network structure. [Kaiforge Lite](https://github.com/DevxiaLabs/kaiforge-lite) informed the dashboard layout. The interface and graphics were implemented independently.
