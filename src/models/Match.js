/**
 * Класс предметной области: Матч.
 */
class Match {
    constructor({ date, competition, homeTeam, awayTeam, homeScore, awayScore, events }) {
        this.date = date;
        this.competition = competition;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.events = events || [];
    }

    /**
     * Результат матча для «Барселоны»: W — победа, D — ничья, L — поражение.
     */
    getResult() {
        const barcaIsHome = this.homeTeam === 'Барселона';
        const barcaScore = barcaIsHome ? this.homeScore : this.awayScore;
        const oppScore = barcaIsHome ? this.awayScore : this.homeScore;

        if (barcaScore > oppScore) return 'W';
        if (barcaScore === oppScore) return 'D';
        return 'L';
    }

    /**
     * Строка со счётом.
     */
    getScoreLine() {
        return `${this.homeTeam} ${this.homeScore} : ${this.awayScore} ${this.awayTeam}`;
    }
}