export interface StatDefinition {
    id: string;
    name: string;
    category: 'core' | 'skills' | 'resistances';
    iconColor: string;
    description: string;
    tip: string;
}

export const STATS: StatDefinition[] = [
    // ── CORE ──────────────────────────────────────────────────────
    {
        id: 'strength',
        name: 'Сила',
        category: 'core',
        iconColor: '#ef4444',
        description:
            'Насколько крепко ты можешь пожать руку на переговорах. Или открыть банку с огурцами — что, как известно, сложнее.',
        tip: '💡 Качай железо. Или хотя бы открывай дверь ногой — это тоже считается.',
    },
    {
        id: 'dexterity',
        name: 'Ловкость',
        category: 'core',
        iconColor: '#f59e0b',
        description:
            'Твоя способность не разбить телефон, выронив его на асфальт. Статистика говорит: не работает.',
        tip: '💡 Поймай ключи с первого броска. Если поймал — повтори пять раз.',
    },
    {
        id: 'constitution',
        name: 'Телосложение',
        category: 'core',
        iconColor: '#10b981',
        description:
            'Сколько чашек кофе ты можешь выпить, прежде чем сердце начнёт выбивать азбуку Морзе.',
        tip: '💡 Попробуй спать больше 4 часов. Организм оценит. Ты — навряд ли.',
    },
    {
        id: 'intelligence',
        name: 'Интеллект',
        category: 'core',
        iconColor: '#6366f1',
        description:
            'Количество нейронов, выживших после бесконечного скролла и трёх лет зум-совещаний.',
        tip: '💡 Читай книги. Нет, список покупок не считается. Нет, твиты тоже.',
    },
    {
        id: 'wisdom',
        name: 'Мудрость',
        category: 'core',
        iconColor: '#a855f7',
        description:
            'Умение понять, что распродажа «минус 90%» — это просто завышенная цена, поделённая на совесть.',
        tip: '💡 Поспи перед важным решением. Нейроны ночью всё рассортируют сами.',
    },
    {
        id: 'charisma',
        name: 'Харизма',
        category: 'core',
        iconColor: '#ec4899',
        description:
            'Способность убедить кота, что ты — хороший хозяин, несмотря на весь накопленный ими опыт.',
        tip: '💡 Улыбайся незнакомцам. Без маньячного прищура, пожалуйста.',
    },

    // ── SKILLS ────────────────────────────────────────────────────
    {
        id: 'luck',
        name: 'Удача',
        category: 'skills',
        iconColor: '#f59e0b',
        description:
            'Вероятность того, что именно твоя очередь в магазине окажется за бабушкой с тремя корзинами и спорным купоном.',
        tip: '💡 Подними монетку с земли. Желательно орлом кверху — это важно.',
    },
    {
        id: 'perception',
        name: 'Восприятие',
        category: 'skills',
        iconColor: '#06b6d4',
        description:
            'Шанс заметить, что сосед переехал — когда он уже сдаёт новую квартиру.',
        tip: '💡 Оторви взгляд от телефона и оглядись. Мир всё ещё существует.',
    },
    {
        id: 'persuasion',
        name: 'Убеждение',
        category: 'skills',
        iconColor: '#10b981',
        description:
            'Искусство объяснить партнёру, почему пятый монитор — это инвестиция в здоровье и продуктивность.',
        tip: '💡 Начни с малого: убеди себя встать с дивана. Это уже победа.',
    },
    {
        id: 'deception',
        name: 'Обман',
        category: 'skills',
        iconColor: '#8b5cf6',
        description:
            'Способность произносить «я уже выхожу» из ванной с нулевой задержкой совести.',
        tip: '💡 Смотри людям в глаза. Невинно. Очень невинно. Не моргай.',
    },
    {
        id: 'willpower',
        name: 'Сила воли',
        category: 'skills',
        iconColor: '#f97316',
        description:
            'Способность закрыть YouTube в 2 часа ночи. Исследования показывают: у большинства этот навык на уровне 2.',
        tip: '💡 Убери телефон в другую комнату. Не беги за ним. Это тест.',
    },
    {
        id: 'initiative',
        name: 'Инициатива',
        category: 'skills',
        iconColor: '#eab308',
        description:
            'Насколько быстро ты первым пишешь «надо бы встретиться» — и никогда не организуешь встречу.',
        tip: '💡 Сделай что-нибудь прямо сейчас. Не «потом». Сейчас. Серьёзно.',
    },
    {
        id: 'stealth',
        name: 'Скрытность',
        category: 'skills',
        iconColor: '#64748b',
        description:
            'Умение прокрасться ночью на кухню, не разбудив кота, который всё равно не спал.',
        tip: '💡 Носи носки. Деревянный пол — твой главный враг и предатель.',
    },
    {
        id: 'bartering',
        name: 'Торговля',
        category: 'skills',
        iconColor: '#fbbf24',
        description:
            'Искусство торговаться на рынке, чтобы в итоге купить три лишних помидора «в подарок».',
        tip: '💡 Делай несчастное лицо. Работает лучше любого MBA уже 10 000 лет.',
    },

    // ── RESISTANCES ───────────────────────────────────────────────
    {
        id: 'fire',
        name: 'Сопротивление огню',
        category: 'resistances',
        iconColor: '#f97316',
        description:
            'Устойчивость к острому перцу, горящим дедлайнам и рабочим чатам в выходные.',
        tip: '💡 Ешь чили каждый день. Желудок пострадает — характер закалится.',
    },
    {
        id: 'cold',
        name: 'Сопротивление холоду',
        category: 'resistances',
        iconColor: '#38bdf8',
        description:
            'Способность выйти в -20°C без шапки и убедить себя, что «ну нормально же».',
        tip: '💡 Контрастный душ по утрам. Кричать разрешено и даже рекомендуется.',
    },
    {
        id: 'lightning',
        name: 'Сопротивление молнии',
        category: 'resistances',
        iconColor: '#facc15',
        description:
            'Иммунитет к внезапным звонкам от мамы, срочным задачам в пятницу в 17:59 и пуш-уведомлениям.',
        tip: '💡 Купи резиновые тапочки. Звучит странно, но метафора точная.',
    },
    {
        id: 'poison',
        name: 'Сопротивление яду',
        category: 'resistances',
        iconColor: '#4ade80',
        description:
            'Стойкость к токсичным коллегам, нытью и фразе «а вот раньше всё было лучше».',
        tip: '💡 Пей больше воды. Токсины вымываются. Некоторые люди — нет.',
    },
    {
        id: 'darkness',
        name: 'Сопротивление тьме',
        category: 'resistances',
        iconColor: '#818cf8',
        description:
            'Стойкость к экзистенциальным кризисам в 3 часа ночи, когда вся Вселенная кажется бессмысленной.',
        tip: '💡 Смотри комедии. Желательно не в 3 ночи. Хотя... когда ещё?',
    },
    {
        id: 'magic',
        name: 'Магическая защита',
        category: 'resistances',
        iconColor: '#c084fc',
        description:
            'Иммунитет к инфоцыганам, рекламе и обещаниям «этот курс изменит жизнь за 3 дня».',
        tip: '💡 Читай мелкий шрифт. Вся магия там — и весь обман тоже.',
    },
];

export const STAT_CATEGORIES: { id: StatDefinition['category']; label: string }[] = [
    { id: 'core', label: 'Основные характеристики' },
    { id: 'skills', label: 'Навыки' },
    { id: 'resistances', label: 'Сопротивления' },
];

/** Детерминированное значение 1–20 на основе UUID и id стата */
export function getStatValue(uuid: string, statId: string): number {
    let hash = 5381;
    const str = uuid + statId;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
        hash = hash >>> 0;
    }
    return (hash % 20) + 1;
}

export function getBarColor(value: number): string {
    if (value <= 6) return '#ef4444';
    if (value <= 12) return '#f59e0b';
    if (value <= 17) return '#10b981';
    return 'linear-gradient(90deg, #6366f1, #a855f7)';
}

export function getValueColor(value: number): string {
    if (value <= 6) return '#ef4444';
    if (value <= 12) return '#f59e0b';
    if (value <= 17) return '#10b981';
    return '#a855f7';
}
