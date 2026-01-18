import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const structurePath = path.join(root, 'docs', 'structure.json');

const raw = fs.readFileSync(structurePath, 'utf8');
const structure = JSON.parse(raw);

const required = structure.frontmatter_required ?? [
  'title',
  'description',
  'lang',
  'version',
  'last_updated',
];

const errors = [];

const languages = structure.languages?.map((lang) => lang.id) ?? [];
const versions = structure.versions?.map((ver) => ver.id) ?? [];
const navigation = structure.navigation ?? {};

function addError(message) {
  errors.push(message);
}

function readFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.startsWith('---\n')) {
    addError(`${filePath}: missing frontmatter start (---)`);
    return null;
  }

  const endIndex = content.indexOf('\n---\n', 4);
  if (endIndex === -1) {
    addError(`${filePath}: missing frontmatter end (---)`);
    return null;
  }

  const frontmatterText = content.slice(4, endIndex);
  const data = {};

  for (const line of frontmatterText.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }
    const match = trimmed.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) {
      continue;
    }
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith('\'') && value.endsWith('\''))) {
      value = value.slice(1, -1);
    }
    data[match[1]] = value;
  }

  return data;
}

for (const version of versions) {
  if (!navigation[version]) {
    addError(`structure.json: missing navigation for version "${version}"`);
  }
}

for (const lang of languages) {
  for (const version of versions) {
    const nav = navigation[version] ?? [];
    const seen = new Set();

    for (const slug of nav) {
      if (seen.has(slug)) {
        addError(`structure.json: duplicate slug "${slug}" in navigation for ${version}`);
      }
      seen.add(slug);

      const filePath = path.join(root, 'docs', lang, version, `${slug}.mdx`);
      if (!fs.existsSync(filePath)) {
        addError(`${filePath}: missing file`);
        continue;
      }

      const frontmatter = readFrontmatter(filePath);
      if (!frontmatter) {
        continue;
      }

      for (const key of required) {
        if (!frontmatter[key]) {
          addError(`${filePath}: missing frontmatter key "${key}"`);
        }
      }

      if (frontmatter.lang && frontmatter.lang !== lang) {
        addError(`${filePath}: frontmatter lang mismatch (${frontmatter.lang} != ${lang})`);
      }
      if (frontmatter.version && frontmatter.version !== version) {
        addError(`${filePath}: frontmatter version mismatch (${frontmatter.version} != ${version})`);
      }
    }

    if (!structure.allow_orphan_files) {
      const dirPath = path.join(root, 'docs', lang, version);
      if (fs.existsSync(dirPath)) {
        for (const entry of fs.readdirSync(dirPath)) {
          if (!entry.endsWith('.mdx')) {
            continue;
          }
          const slug = entry.slice(0, -4);
          if (!seen.has(slug)) {
            addError(`${dirPath}: orphan file "${entry}" not listed in navigation`);
          }
        }
      }
    }
  }
}

if (errors.length) {
  console.error('Structure validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Structure validation passed.');
