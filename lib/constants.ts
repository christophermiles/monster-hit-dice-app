export const HIT_DICE_REGEX = /^(\d+)d(\d+)([+-]\d+)?$/

export const HIT_DICE_BY_MONSTER_EXAMPLES: Record<string, string> = {
    'Goblin': '2d6',
    'Skeleton': '2d8-2',
    'Orc': '2d8+6',
    'Gelatinous Cube': '8d10+40',
    'Tarrasque': '33d20+330',
}