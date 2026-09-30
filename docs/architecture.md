# Архитектура проекта

## Слои
1. **Модель** (`src/models/`) — предметная область: Player, Match, Squad.
2. **Хранилище** (`src/storage/`) — SquadStorage, работает с данными.
3. **Сервис** (`src/services/`) — SquadService, прикладная логика.
4. **Интерфейс** (HTML + `js/squad-loader.js`) — отображение.

## Поток данных
`data/squad.js` → `SquadStorage` → `SquadService` → `Squad` (модель) → `Player` (модель) → рендеринг в HTML.