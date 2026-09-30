/**
 * Класс предметной области: Состав команды.
 * Хранит коллекцию игроков по категориям.
 */
class Squad {
    constructor() {
        this.categories = {
            goalkeepers: [],
            defenders: [],
            midfielders: [],
            forwards: [],
            substitutes: []
        };
    }

    /**
     * Добавить игрока в категорию.
     */
    addPlayer(category, player) {
        if (!this.categories[category]) {
            this.categories[category] = [];
        }
        this.categories[category].push(player);
    }

    /**
     * Получить всех игроков.
     */
    getAllPlayers() {
        return Object.values(this.categories).flat();
    }

    /**
     * Найти игрока по номеру.
     */
    findByNumber(number) {
        return this.getAllPlayers().find(p => p.number === number) || null;
    }
}