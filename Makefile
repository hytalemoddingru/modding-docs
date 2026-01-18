SHELL := /usr/bin/env bash

MDX_GLOB := docs/**/*.mdx

.PHONY: help lint links validate check

help:
	@printf '%s\n' \
	  'Targets:' \
	  '  make lint   - run mdxlint on docs' \
	  '  make links  - check links in docs' \
	  '  make validate - verify structure and frontmatter' \
	  '  make check  - run lint + links + validate'

lint:
	npx --no-install mdxlint "$(MDX_GLOB)"

links:
	lychee --verbose --no-progress "$(MDX_GLOB)"

validate:
	node scripts/validate-structure.mjs

check: lint links validate
