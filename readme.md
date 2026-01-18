# Hytale Modding Docs

[English version] | [[Russian version]](readme_ru.md)

Bilingual (EN/RU) documentation for Hytale modding with versioned snapshots and translation placeholders.

## License

This documentation is licensed under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).
See `LICENSE` for the full legal text. Contributions imply agreement with this license.

## Structure

```
docs/
  en/
    latest/
    v1.0/
  ru/
    latest/
    v1.0/
```

Each page is a `.mdx` file with frontmatter.

## structure.json

`docs/structure.json` is the single source of navigation and ordering:

- `navigation` lists slugs in the order the frontend should show them.
- `path_template` describes where the files live.
- `title_source` tells the frontend to use frontmatter for titles.
- `frontmatter_required` defines required keys.
- `allow_orphan_files` controls whether extra files outside navigation are allowed.

When you add/remove pages or versions, update `structure.json` first.

## Frontmatter

Required keys:

- `title`
- `description`
- `lang`
- `version`
- `last_updated` (YYYY-MM-DD)

Example:

```mdx
---
title: "Getting Started"
description: "Setup and first steps for modding."
lang: "en"
version: "latest"
last_updated: "2026-01-18"
---
```

## Versioning

- `latest` is the active documentation line.
- `vX.Y` are frozen snapshots.
- Make changes in `latest`, then copy into a new `vX.Y` on release.

## i18n

- Keep the same slug across languages (`docs/en/latest/intro.mdx` ↔ `docs/ru/latest/intro.mdx`).
- Every page should exist in both languages for each version.
- If a translation is missing, leave clear placeholders inside the file.
- Use the glossary to keep terms consistent across languages.

If you add a new language, update `structure.json`, create folders under `docs/<lang>/`, then run `make validate`.

## Contributing

See `contributing.md` for translation rules, style guide, and PR requirements.

## Local development

Requirements: Node.js 20+, `lychee`, and `make` (or run the commands from `Makefile` manually).
After installing Node.js, run `npm install` (installs `mdxlint`).

### NixOS

`direnv allow` activates `flake.nix`, then run `npm install` and `make check`.

### Windows

Install Node.js (winget or Chocolatey), then run `npm install`.
For `lychee`, use a GitHub Releases binary or `cargo install lychee`.
If `make` is missing, run the commands from `Makefile` manually.

### macOS

```
brew install node lychee
npm install
make check
```

### Arch Linux

```
sudo pacman -S nodejs npm lychee make
npm install
make check
```

### Debian/Ubuntu

```
sudo apt install nodejs npm make
npm install
make check
```

If `lychee` is missing, install it via `cargo install lychee` or download a binary.
If the repo version of Node.js is too old, use nvm and install 20+.

### Fedora

```
sudo dnf install nodejs make lychee
npm install
make check
```

## Commands

- `make lint` runs `mdxlint`.
- `make links` checks links via `lychee`.
- `make validate` validates structure and frontmatter.
- `make check` runs all checks.
