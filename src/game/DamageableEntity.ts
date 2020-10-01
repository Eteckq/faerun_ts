export default interface DamageableEntity {
    attack(target: DamageableEntity): void
    dealDamages(damage: number): void
    getHealth(): number
}