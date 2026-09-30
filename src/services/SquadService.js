/**
 * Класс-сервис: связывает хранилище и модель, выполняет прикладные правила.
 */
class SquadService {
    constructor(sourceData) {
        this.storage = new SquadStorage(sourceData);
        this.squad = new Squad();
        this.loadFromStorage();
    }

    /**
     * Загрузить игроков из хранилища в модель Squad.
     */
    loadFromStorage() {
        ['goalkeepers', 'defenders', 'midfielders', 'forwards', 'substitutes'].forEach(category => {
            const players = this.storage.getByCategory(category);
            players.forEach(player => this.squad.addPlayer(category, player));
        });
    }

    /**
     * Получить игроков по категории.
     */
    getPlayersByCategory(category) {
        return this.squad.categories[category] || [];
    }

    /**
     * Получить игрока по номеру.
     */
    getPlayerByNumber(number) {
        return this.squad.findByNumber(number);
    }

    /**
     * Получить метаданные.
     */
    getMeta() {
        return this.storage.getMeta();
    }
}