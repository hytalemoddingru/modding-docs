# Документация по моддингу Hytale

[[English version]](readme.md) | [Russian version]

Билингвальная (EN/RU) документация по моддингу Hytale с версионированием и плейсхолдерами для переводов.

## Лицензия

Документация распространяется по лицензии Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).
Полный юридический текст см. в `LICENSE`. Вклады (PR) подразумевают согласие с этой лицензией.

## Структура

```
docs/
  en/
    latest/
    v1.0/
  ru/
    latest/
    v1.0/
```

Каждая страница — `.mdx` файл с frontmatter.

## structure.json

`docs/structure.json` — единственный источник навигации и порядка страниц:

- `navigation` перечисляет slugs в порядке отображения.
- `path_template` описывает расположение файлов.
- `title_source` говорит фронтенду брать заголовки из frontmatter.
- `frontmatter_required` задает обязательные поля.
- `allow_orphan_files` определяет, разрешены ли файлы вне навигации.
- `navigation_style: \"grouped\"` позволяет группировать разделы через `title` + `items`.

При добавлении/удалении страниц или версий сначала обновляйте `structure.json`.

## Frontmatter

Обязательные поля:

- `title`
- `description`
- `lang`
- `version`
- `last_updated` (YYYY-MM-DD)

Пример:

```mdx
---
title: "Getting Started"
description: "Setup and first steps for modding."
lang: "en"
version: "latest"
last_updated: "2026-01-18"
---
```

## Версионирование

- `latest` — актуальная ветка документации.
- `vX.Y` — замороженные снимки.
- Правки вносим в `latest`, затем копируем в новый `vX.Y` при релизе.

## i18n

- Используйте один и тот же slug в разных языках (`docs/en/latest/intro.mdx` ↔ `docs/ru/latest/intro.mdx`).
- Каждая страница должна существовать на обоих языках для каждой версии.
- Если перевода нет, оставляйте понятные плейсхолдеры прямо в файле.
- Используйте глоссарий для единых терминов.

Если добавляете новый язык, обновите `structure.json`, создайте папки в `docs/<lang>/`, затем запустите `make validate`.

## Участие

См. `contributing.md` для правил перевода, стайлгайда и требований к PR.

## Локальная разработка

Нужно: Node.js 20+, `lychee`, `make` (или запускайте команды из `Makefile` вручную).
После установки Node.js выполните `npm install` (ставит `mdxlint`).

### NixOS

`direnv allow` активирует `flake.nix`, затем выполните `npm install` и `make check`.

### Windows

Установите Node.js (winget или Chocolatey), затем выполните `npm install`.
Для `lychee` используйте бинарник из GitHub Releases или `cargo install lychee`.
Если `make` отсутствует, запускайте команды из `Makefile` вручную.

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

Если `lychee` отсутствует, установите через `cargo install lychee` или скачайте бинарник.
Если версия Node.js в репозитории слишком старая, используйте nvm и поставьте 20+.

### Fedora

```
sudo dnf install nodejs make lychee
npm install
make check
```

## Команды

- `make lint` запускает `mdxlint`.
- `make links` проверяет ссылки через `lychee`.
- `make validate` валидирует структуру и frontmatter.
- `make check` запускает все проверки.
