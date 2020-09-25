export default interface DamageableEntity {
    dealDamages(damage: number): void
    getHealth(): number
}