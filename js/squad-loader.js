// Загрузка состава через классы предметной области
function loadSquad() {
    const container = document.querySelector('.squad-container');
    if (!container) return;

    if (typeof squadData === 'undefined') {
        container.innerHTML = '<p style="text-align:center;color:#A50044;padding:2rem;">Не удалось загрузить данные.</p>';
        return;
    }

    // Создаём сервис через классы
    const service = new SquadService(squadData);

    const categories = [
        { key: 'goalkeepers', title: 'Вратари', icon: 'fas fa-gloves' },
        { key: 'defenders', title: 'Защитники', icon: 'fas fa-shield-alt' },
        { key: 'midfielders', title: 'Полузащитники', icon: 'fas fa-futbol' },
        { key: 'forwards', title: 'Нападающие', icon: 'fas fa-bolt' },
        { key: 'substitutes', title: 'Запасные', icon: 'fas fa-exchange-alt' }
    ];

    let html = '';
    categories.forEach(cat => {
        const players = service.getPlayersByCategory(cat.key);
        if (players.length === 0) return;

        html += `<div class="squad-section"><h2><i class="${cat.icon}"></i> ${cat.title}</h2><div class="squad-grid">`;
        players.forEach(p => {
            html += `
                <div class="squad-card" onclick='openPlayerModal(${JSON.stringify(p).replace(/'/g, "&apos;")})'>
                    <div class="squad-number">${p.number}</div>
                    <div class="squad-info">
                        <h3>${p.nameRu}</h3>
                        <div class="player-name">${p.name}</div>
                        <div class="squad-details">
                            <span><i class="fas fa-calendar"></i> ${p.age} лет</span>
                            <span><i class="fas fa-flag"></i> ${p.nationality}</span>
                        </div>
                    </div>
                </div>`;
        });
        html += '</div></div>';
    });

    container.innerHTML = html;

    const dateEl = document.querySelector('.last-updated');
    const meta = service.getMeta();
    if (dateEl && meta.lastUpdated) {
        dateEl.innerHTML = '<i class="fas fa-sync-alt"></i> Последнее обновление: ' + meta.lastUpdated;
    }
}

// Модальное окно (оставьте как было)
function openPlayerModal(player) {
    const oldModal = document.getElementById('player-modal');
    if (oldModal) oldModal.remove();

    const photo = player.photo || 'images/emblem.png';

    const modalHtml = `
        <div id="player-modal" class="player-modal-overlay" onclick="closePlayerModal(event)">
            <div class="player-modal-content" onclick="event.stopPropagation()">
                <button class="player-modal-close" onclick="closePlayerModal(event)">&times;</button>
                <div class="player-modal-header">
                    <div class="player-modal-photo">
                        <img src="${photo}" alt="${player.nameRu}" onerror="this.src='images/emblem.png'">
                        <div class="player-modal-number">${player.number}</div>
                    </div>
                    <div class="player-modal-title">
                        <h2>${player.nameRu}</h2>
                        <p class="player-modal-realname">${player.name}</p>
                        <div class="player-modal-position">
                            <i class="fas fa-futbol"></i> ${player.position}
                        </div>
                        <div class="player-modal-meta">
                            <span><i class="fas fa-calendar"></i> ${player.age} лет</span>
                            <span><i class="fas fa-flag"></i> ${player.nationality}</span>
                            <span><i class="fas fa-ruler-vertical"></i> ${player.height} см</span>
                            <span><i class="fas fa-weight"></i> ${player.weight} кг</span>
                            <span><i class="fas fa-shoe-prints"></i> ${player.foot} нога</span>
                        </div>
                    </div>
                </div>
                <div class="player-modal-section">
                    <h3><i class="fas fa-user-circle"></i> Биография</h3>
                    <p>${player.bio}</p>
                </div>
                <div class="player-modal-section">
                    <h3><i class="fas fa-chart-bar"></i> Статистика</h3>
                    <div class="player-modal-stats">
                        ${player.stats.matches !== undefined ? `<div class="stat-box"><div class="stat-value">${player.stats.matches}</div><div class="stat-label">Матчей</div></div>` : ''}
                        ${player.stats.goals !== undefined ? `<div class="stat-box"><div class="stat-value">${player.stats.goals}</div><div class="stat-label">Голов</div></div>` : ''}
                        ${player.stats.assists !== undefined ? `<div class="stat-box"><div class="stat-value">${player.stats.assists}</div><div class="stat-label">Передач</div></div>` : ''}
                        ${player.stats.saves !== undefined ? `<div class="stat-box"><div class="stat-value">${player.stats.saves}</div><div class="stat-label">Сейвов</div></div>` : ''}
                        ${player.stats.cleanSheets !== undefined ? `<div class="stat-box"><div class="stat-value">${player.stats.cleanSheets}</div><div class="stat-label">Сухих</div></div>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.style.overflow = 'hidden';
}

function closePlayerModal(event) {
    if (event) event.stopPropagation();
    const modal = document.getElementById('player-modal');
    if (modal) modal.remove();
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePlayerModal();
});

document.addEventListener('DOMContentLoaded', loadSquad);