/**
 * Класс предметной области: Игрок.
 * Хранит данные игрока и выполняет связанные действия.
 */
class Player {
    constructor({ number, name, nameRu, age, nationality, position, height, weight, foot, photo, bio, stats }) {
        this.number = number;
        this.name = name;
        this.nameRu = nameRu;
        this.age = age;
        this.nationality = nationality;
        this.position = position;
        this.height = height;
        this.weight = weight;
        this.foot = foot;
        this.photo = photo || 'images/emblem.png';
        this.bio = bio;
        this.stats = stats || {};
    }

    /**
     * Краткая информация для карточки.
     */
    getShortInfo() {
        return `${this.number}. ${this.nameRu} — ${this.position} (${this.age} лет)`;
    }

    /**
     * Полная информация для модального окна.
     */
    getFullInfo() {
        return {
            name: this.nameRu,
            position: this.position,
            age: this.age,
            nationality: this.nationality,
            height: this.height,
            weight: this.weight,
            foot: this.foot,
            bio: this.bio,
            stats: this.stats
        };
    }
}

// Экспорт для использования в других файлах (если работаете через модули)
// Если через обычные <script>, класс будет виден глобально.