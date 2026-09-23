import { useState } from "react";
// v2

type Rarity = "common" | "uncommon" | "rare" | "legendary";

type Attribute = "STR" | "DEX" | "INT" | "WIS" | "CHA" | "CON";
type CheckType = "Unopposed" | "Opposed" | "None";

interface Skill {
  id: number,
  name: string,
  rank: number,
  attribute: Attribute,
  mod: number,
  checkType: CheckType,
  used: boolean,
}

const ATTR_COLORS: Record<Attribute, string> = {
  STR: "#e05252",
  DEX: "#5aaa6e",
  INT: "#9b72d4",
  WIS: "#4a7fd4",
  CHA: "#e8b84b",
  CON: "#c8922a",
}

const CHECK_COLORS: Record<CheckType, string> = {
  Unopposed: "#c8922a",
  Opposed: "#6b7a99",
  None: "#9b72d4",
}

const INITIAL_SKILLS: Skill[] = [
  {
    id: 1,
    name: "Dumpster Diving",
    rank: 1,
    attribute: "INT",
    mod: +3,
    checkType: "Unopposed",
    used: false,
  },
  {
    id: 2,
    name: "Survival",
    rank: 1,
    attribute: "CON",
    mod: +1,
    checkType: "Unopposed",
    used: false,
  },
]

interface Item {
  id: number
  name: string
  emoji: string
  qty: number
  rarity: Rarity
  description: string
}

const RARITY_COLORS: Record<Rarity, string> = {
  common: "#e8e6e0",
  uncommon: "#5aaa6e",
  rare: "#9b72d4",
  legendary: "#c8922a",
}

const ALL_ITEMS: Item[] = [
  {
    id: 1,
    name: "Iron Sword",
    emoji: "⚔️",
    qty: 1,
    rarity: "common",
    description: "A sturdy iron blade.",
  },
  {
    id: 2,
    name: "Health Potion",
    emoji: "🧪",
    qty: 8,
    rarity: "common",
    description: "Restores 50 HP.",
  },
  {
    id: 3,
    name: "Shadow Bow",
    emoji: "🏹",
    qty: 1,
    rarity: "rare",
    description: "+15 ranged, silences on hit.",
  },
  {
    id: 4,
    name: "Iron Shield",
    emoji: "🛡️",
    qty: 1,
    rarity: "uncommon",
    description: "+12 armor, block chance 20%.",
  },
  {
    id: 5,
    name: "Torch",
    emoji: "🕯️",
    qty: 3,
    rarity: "common",
    description: "Illuminates dark areas for 5min.",
  },
  {
    id: 6,
    name: "Rope",
    emoji: "🪢",
    qty: 2,
    rarity: "common",
    description: "Useful for climbing.",
  },
  {
    id: 7,
    name: "Mana Crystal",
    emoji: "💎",
    qty: 4,
    rarity: "rare",
    description: "Restores 80 MP instantly.",
  },
  {
    id: 8,
    name: "Smoke Bomb",
    emoji: "💨",
    qty: 2,
    rarity: "uncommon",
    description: "Blinds enemies for 3s.",
  },
  {
    id: 9,
    name: "Dragon Scale",
    emoji: "🐉",
    qty: 1,
    rarity: "legendary",
    description: "Crafting material — fire resist +40%.",
  },
  {
    id: 10,
    name: "Crossbow Bolt",
    emoji: "🎯",
    qty: 24,
    rarity: "common",
    description: "Ammunition for crossbows.",
  },
  {
    id: 11,
    name: "Lock Pick",
    emoji: "🔑",
    qty: 5,
    rarity: "uncommon",
    description: "Opens locked chests and doors.",
  },
  {
    id: 12,
    name: "Elixir of Speed",
    emoji: "⚗️",
    qty: 1,
    rarity: "rare",
    description: "+30% move speed for 60s.",
  },
  {
    id: 13,
    name: "Ancient Coin",
    emoji: "🪙",
    qty: 47,
    rarity: "common",
    description: "Currency of the old world.",
  },
  {
    id: 14,
    name: "Void Dagger",
    emoji: "🗡️",
    qty: 1,
    rarity: "legendary",
    description: "Phases through armor. -20% to luck.",
  },
  {
    id: 15,
    name: "Bread Loaf",
    emoji: "🍞",
    qty: 3,
    rarity: "common",
    description: "Restores 10 HP over time.",
  },
  {
    id: 16,
    name: "Magic Map",
    emoji: "🗺️",
    qty: 1,
    rarity: "uncommon",
    description: "Reveals hidden dungeon passages.",
  },
  {
    id: 17,
    name: "Crystal Ball",
    emoji: "🔮",
    qty: 1,
    rarity: "rare",
    description: "Predicts enemy movements.",
  },
  {
    id: 18,
    name: "Iron Axe",
    emoji: "🪓",
    qty: 1,
    rarity: "common",
    description: "+8 damage, chops wood.",
  },
]

const HOTBAR_SIZE = 10

function RarityBadge({ rarity }: { rarity: Rarity }) {
  const label = rarity.charAt(0).toUpperCase() + rarity.slice(1)
  return (
    <span
      className="font-mono text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded"
      style={{
        color: RARITY_COLORS[rarity],
        border: `1px solid ${RARITY_COLORS[rarity]}44`,
        background: `${RARITY_COLORS[rarity]}18`,
      }}
    >
      {label}
    </span>
  )
}

interface SlotProps {
  item: Item | null
  index: number
  isSelected: boolean
  onClick: () => void
  onDragStart: () => void
  onDrop: () => void
}

function HotbarSlot({
  item,
  index,
  isSelected,
  onClick,
  onDragStart,
  onDrop,
}: SlotProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="relative flex flex-col items-center gap-1">
      <div
        draggable={!!item}
        onDragStart={onDragStart}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative w-14 h-14 flex items-center justify-center rounded cursor-pointer transition-all duration-150 select-none ${
          isSelected ? "slot-selected" : ""
        }`}
        style={{
          background: isSelected
            ? "linear-gradient(135deg, #1a2030 0%, #0e1219 100%)"
            : hovered
              ? "#141924"
              : "#0e1219",
          border: isSelected
            ? "1.5px solid #c8922a"
            : hovered
              ? "1.5px solid #3a4560"
              : "1.5px solid #1e2535",
        }}
      >
        {item ? (
          <>
            <span className="text-2xl leading-none">{item.emoji}</span>
            {item.qty > 1 && (
              <span
                className="font-mono absolute bottom-0.5 right-1 text-[10px] font-bold leading-none"
                style={{ color: RARITY_COLORS[item.rarity] }}
              >
                {item.qty}
              </span>
            )}
            {isSelected && (
              <div
                className="absolute inset-0 rounded pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, #c8922a08 0%, transparent 60%)",
                }}
              />
            )}
          </>
        ) : (
          <div
            className="w-6 h-6 rounded-sm"
            style={{ border: "1px dashed #252d40" }}
          />
        )}

        {/* Tooltip */}
        {hovered && item && (
          <div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 p-2.5 rounded w-44 pointer-events-none"
            style={{
              background: "#111520",
              border: "1px solid #252d40",
              boxShadow: "0 8px 32px #00000088",
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span
                className="font-semibold text-xs"
                style={{ color: RARITY_COLORS[item.rarity] }}
              >
                {item.name}
              </span>
              <RarityBadge rarity={item.rarity} />
            </div>
            <p
              className="text-[11px] leading-snug"
              style={{ color: "#6b7a99" }}
            >
              {item.description}
            </p>
            {item.qty > 1 && (
              <p
                className="font-mono text-[10px] mt-1.5"
                style={{ color: "#3a4560" }}
              >
                Qty: {item.qty}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Slot number */}
      <span className="font-mono text-[10px]" style={{ color: "#3a4560" }}>
        {index === 9 ? "0" : index + 1}
      </span>
    </div>
  )
}

interface InventorySlotProps {
  item: Item | null
  onDragStart: () => void
  onDrop: () => void
  onRightClick: (item: Item) => void
}

function InventorySlot({
  item,
  onDragStart,
  onDrop,
  onRightClick,
}: InventorySlotProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      draggable={!!item}
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onContextMenu={(e) => {
        e.preventDefault()
        if (item) onRightClick(item)
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full aspect-square flex items-center justify-center rounded cursor-pointer transition-all duration-100 select-none"
      style={{
        background: hovered && item ? "#141924" : "#0e1219",
        border:
          hovered && item
            ? `1.5px solid ${RARITY_COLORS[item?.rarity ?? "common"]}66`
            : "1.5px solid #1e2535",
      }}
    >
      {item ? (
        <>
          <span className="text-xl leading-none">{item.emoji}</span>
          {item.qty > 1 && (
            <span
              className="font-mono absolute bottom-0.5 right-1 text-[9px] font-bold leading-none"
              style={{ color: RARITY_COLORS[item.rarity] }}
            >
              {item.qty}
            </span>
          )}
          {/* Rarity corner pip */}
          <div
            className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full"
            style={{ background: RARITY_COLORS[item.rarity], opacity: 0.7 }}
          />
          {/* Hover tooltip */}
          {hovered && (
            <div
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 p-2.5 rounded w-44 pointer-events-none"
              style={{
                background: "#111520",
                border: "1px solid #252d40",
                boxShadow: "0 8px 32px #00000088",
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className="font-semibold text-xs"
                  style={{ color: RARITY_COLORS[item.rarity] }}
                >
                  {item.name}
                </span>
                <RarityBadge rarity={item.rarity} />
              </div>
              <p
                className="text-[11px] leading-snug"
                style={{ color: "#6b7a99" }}
              >
                {item.description}
              </p>
              {item.qty > 1 && (
                <p
                  className="font-mono text-[10px] mt-1.5"
                  style={{ color: "#3a4560" }}
                >
                  Qty: {item.qty}
                </p>
              )}
              <p className="text-[10px] mt-1.5" style={{ color: "#3a4560" }}>
                Right-click for options
              </p>
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}

type SortKey = "name" | "rarity" | "qty"
type FilterRarity = "all" | Rarity

const RARITY_ORDER: Record<Rarity, number> = {
  legendary: 0,
  rare: 1,
  uncommon: 2,
  common: 3,
}

export default function App() {
  const [hotbar, setHotbar] = useState<(Item | null)[]>(() => {
    const slots: (Item | null)[] = Array(HOTBAR_SIZE).fill(null)
    slots[0] = ALL_ITEMS[0]
    slots[1] = ALL_ITEMS[1]
    slots[2] = ALL_ITEMS[3]
    slots[3] = ALL_ITEMS[9]
    slots[4] = ALL_ITEMS[4]
    return slots
  })
  const [inventory, setInventory] = useState<(Item | null)[]>(() => {
    const slots: (Item | null)[] = Array(30).fill(null)
    ALL_ITEMS.forEach((item, i) => {
      slots[i] = item
    })
    return slots
  })

  const [selectedSlot, setSelectedSlot] = useState(0)
  const [inventoryOpen, setInventoryOpen] = useState(false)
  const [dragging, setDragging] = useState<{
    source: "hotbar" | "inventory"
    index: number
  } | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("rarity")
  const [filterRarity, setFilterRarity] = useState<FilterRarity>("all")
  const [search, setSearch] = useState("")
  const [contextItem, setContextItem] = useState<Item | null>(null)

  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS)
  const [skillsOpen, setSkillsOpen] = useState(true)

  function toggleSkillUsed(id: number) {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, used: !s.used } : s)),
    )
  }

  const HP_SECTIONS = 10
  const [hpChecked, setHpChecked] = useState<boolean[]>(
    Array(HP_SECTIONS).fill(false),
  )
  const [hpValues, setHpValues] = useState<string[]>(
    Array.from({ length: HP_SECTIONS }, (_, i) => String((i + 1) * 10)),
  )
  const [heroName, setHeroName] = useState("Aldric")
  const [editingName, setEditingName] = useState(false)

  function toggleHpSection(i: number) {
    setHpChecked((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  function updateHpValue(i: number, raw: string) {
    setHpValues((prev) => {
      const next = [...prev]
      next[i] = raw
      return next
    })
  }

  const hp = hpChecked.reduce(
    (sum, checked, i) => sum + (checked ? parseInt(hpValues[i]) || 0 : 0),
    0,
  )
  const maxHp = hpValues.reduce((sum, v) => sum + (parseInt(v) || 0), 0)
  const [mpSections, setMpSections] = useState(8)
  const [mpSectionsInput, setMpSectionsInput] = useState("8")
  const [mpChecked, setMpChecked] = useState<boolean[]>(Array(8).fill(false))

  function setMpCount(raw: string) {
    setMpSectionsInput(raw)
    const n = Math.max(1, Math.min(20, parseInt(raw) || 1))
    setMpSections(n)
    setMpChecked((prev) => {
      if (n > prev.length)
        return [...prev, ...Array(n - prev.length).fill(false)]
      return prev.slice(0, n)
    })
  }

  function toggleMpSection(i: number) {
    setMpChecked((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  const mp = mpChecked.filter(Boolean).length
  const maxMp = mpSections
  function handleDrop(target: "hotbar" | "inventory", targetIndex: number) {
    if (!dragging) return
    const { source, index: sourceIndex } = dragging

    const newHotbar = [...hotbar]
    const newInventory = [...inventory]

    const getItem = (s: "hotbar" | "inventory", i: number) =>
      s === "hotbar" ? newHotbar[i] : newInventory[i]
    const setItem = (
      s: "hotbar" | "inventory",
      i: number,
      item: Item | null,
    ) => {
      if (s === "hotbar") newHotbar[i] = item
      else newInventory[i] = item
    }

    const srcItem = getItem(source, sourceIndex)
    const dstItem = getItem(target, targetIndex)

    setItem(source, sourceIndex, dstItem)
    setItem(target, targetIndex, srcItem)

    setHotbar(newHotbar)
    setInventory(newInventory)
    setDragging(null)
  }

  const sortedInventoryItems = inventory
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => {
      if (!item) return false
      if (filterRarity !== "all" && item.rarity !== filterRarity) return false
      if (search && !item.name.toLowerCase().includes(search.toLowerCase()))
        return false
      return true
    })
    .sort((a, b) => {
      if (!a.item || !b.item) return 0
      if (sortKey === "name") return a.item.name.localeCompare(b.item.name)
      if (sortKey === "rarity")
        return RARITY_ORDER[a.item.rarity] - RARITY_ORDER[b.item.rarity]
      if (sortKey === "qty") return b.item.qty - a.item.qty
      return 0
    })

  const totalItems = inventory.filter(Boolean).length

  return (
    <div
      className="size-full flex flex-col items-center justify-end relative overflow-hidden"
      style={{ background: "#0a0c10" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#1e253508 1px, transparent 1px), linear-gradient(90deg, #1e253508 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Character info — top left */}
      <div
        className="absolute top-6 left-6 flex flex-col overflow-y-auto"
        style={{ width: "60%", maxHeight: "calc(100% - 48px)", gap: "15px" }}
      >
        <div className="flex items-center mb-1.5" style={{ gap: "15px" }}>
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 60,
              height: 60,
              fontSize: 30,
              background: "#111520",
              border: "1.5px solid #252d40",
            }}
          >
            🧙
          </div>
          <div>
            {editingName ? (
              <input
                autoFocus
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                onBlur={() => setEditingName(false)}
                onKeyDown={(e) => e.key === "Enter" && setEditingName(false)}
                className="font-semibold bg-transparent outline-none border-b"
                style={{
                  fontSize: 21,
                  color: "#e8e6e0",
                  borderColor: "#c8922a",
                  width: "100%",
                }}
              />
            ) : (
              <div
                className="font-semibold cursor-text group flex items-center gap-1.5"
                style={{ fontSize: 21, color: "#e8e6e0" }}
                onClick={() => setEditingName(true)}
                title="Click to edit name"
              >
                {heroName || "Unnamed"}
                <span
                  style={{ fontSize: 11, color: "#3a4560", opacity: 0 }}
                  className="group-hover:opacity-100 transition-opacity"
                >
                  ✎
                </span>
              </div>
            )}
            <div
              className="font-mono"
              style={{ fontSize: 16, color: "#6b7a99" }}
            >
              Level 14 Mage
            </div>
          </div>
        </div>

        {/* HP */}
        <div className="flex flex-col" style={{ gap: "9px" }}>
          <div className="flex justify-between items-center">
            <span
              className="font-mono uppercase tracking-widest"
              style={{ fontSize: 15, color: "#e05252" }}
            >
              HP
            </span>
            <span
              className="font-mono"
              style={{ fontSize: 16, color: "#6b7a99" }}
            >
              {hp}/{maxHp}
            </span>
          </div>
          <div className="flex" style={{ gap: "6px" }}>
            {Array.from({ length: HP_SECTIONS }).map((_, i) => {
              const checked = hpChecked[i]
              return (
                <button
                  key={i}
                  onClick={() => toggleHpSection(i)}
                  title={`${hpValues[i]} HP`}
                  className="flex flex-col items-center cursor-pointer group"
                  style={{ flex: 1, gap: "3px" }}
                >
                  <input
                    type="text"
                    value={hpValues[i]}
                    onChange={(e) => updateHpValue(i, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono leading-none text-center bg-transparent outline-none w-full"
                    style={{
                      fontSize: 12,
                      color: checked ? "#e05252" : "#3a4560",
                    }}
                  />
                  <div
                    className="w-full rounded-sm flex items-center justify-center transition-all duration-100"
                    style={{
                      height: 24,
                      background: checked ? "#e0525222" : "#0e1219",
                      border: checked
                        ? "1.5px solid #e05252"
                        : "1.5px solid #252d40",
                    }}
                  >
                    {checked && (
                      <svg width="11" height="11" viewBox="0 0 8 8" fill="none">
                        <path
                          d="M1.5 4L3 5.5L6.5 2"
                          stroke="#e05252"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* MP */}
        <div className="flex flex-col" style={{ gap: "9px" }}>
          <div className="flex justify-between items-center">
            <span
              className="font-mono uppercase tracking-widest"
              style={{ fontSize: 15, color: "#4a7fd4" }}
            >
              MP
            </span>
            <div className="flex items-center gap-2">
              <span
                className="font-mono"
                style={{ fontSize: 16, color: "#6b7a99" }}
              >
                {mp}/{maxMp}
              </span>
              <button
                onClick={() => setMpChecked(Array(mpSections).fill(true))}
                className="font-mono uppercase tracking-wider rounded cursor-pointer transition-colors"
                style={{
                  fontSize: 10,
                  padding: "2px 6px",
                  color: "#4a7fd4",
                  border: "1px solid #4a7fd433",
                  background: "#4a7fd410",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background =
                    "#4a7fd422"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background =
                    "#4a7fd410"
                }}
              >
                Fill
              </button>
              <input
                type="text"
                value={mpSectionsInput}
                onChange={(e) => setMpCount(e.target.value)}
                className="font-mono text-center bg-transparent outline-none rounded"
                style={{
                  fontSize: 12,
                  color: "#3a4560",
                  border: "1px solid #252d40",
                  width: 32,
                  padding: "1px 4px",
                }}
                title="Number of MP sections"
              />
            </div>
          </div>
          <div className="flex flex-wrap" style={{ gap: "6px" }}>
            {Array.from({ length: mpSections }).map((_, i) => {
              const checked = mpChecked[i]
              return (
                <button
                  key={i}
                  onClick={() => toggleMpSection(i)}
                  className="rounded-sm flex items-center justify-center cursor-pointer transition-all duration-100"
                  style={{
                    width: 24,
                    height: 24,
                    background: checked ? "#4a7fd422" : "#0e1219",
                    border: checked
                      ? "1.5px solid #4a7fd4"
                      : "1.5px solid #252d40",
                  }}
                >
                  {checked && (
                    <svg width="11" height="11" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3 5.5L6.5 2"
                        stroke="#4a7fd4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Skills section */}
        <div
          style={{
            borderTop: "1px solid #1e2535",
            paddingTop: 15,
            marginTop: 6,
          }}
        >
          {/* Section header */}
          <button
            onClick={() => setSkillsOpen(!skillsOpen)}
            className="w-full flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center" style={{ gap: "9px" }}>
              <span
                className="font-mono uppercase tracking-widest font-semibold"
                style={{ fontSize: 15, color: "#c8922a" }}
              >
                Skills
              </span>
              <span
                className="font-mono rounded"
                style={{
                  fontSize: 13,
                  padding: "2px 6px",
                  background: "#1a2030",
                  color: "#6b7a99",
                }}
              >
                {skills.filter((s) => s.used).length}/{skills.length}
              </span>
            </div>
            <span
              className="font-mono transition-transform duration-200"
              style={{
                fontSize: 15,
                color: "#3a4560",
                display: "inline-block",
                transform: skillsOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ▾
            </span>
          </button>

          {skillsOpen && (
            <div
              className="flex flex-col"
              style={{ marginTop: 12, gap: "2px" }}
            >
              {/* Column headers */}
              <div
                className="grid items-center"
                style={{
                  gridTemplateColumns: "1fr 52px 52px 84px 24px 20px",
                  gap: "6px",
                  borderBottom: "1px solid #1e2535",
                  paddingBottom: 6,
                  marginBottom: 3,
                  paddingLeft: 6,
                  paddingRight: 6,
                }}
              >
                <span
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 12, color: "#3a4560" }}
                >
                  Skill / Mod
                </span>
                <span
                  className="font-mono uppercase tracking-widest text-center"
                  style={{ fontSize: 12, color: "#3a4560" }}
                >
                  Rnk
                </span>
                <span
                  className="font-mono uppercase tracking-widest text-center"
                  style={{ fontSize: 12, color: "#3a4560" }}
                >
                  Atr
                </span>
                <span
                  className="font-mono uppercase tracking-widest text-center"
                  style={{ fontSize: 12, color: "#3a4560" }}
                >
                  Check
                </span>
                <span
                  className="font-mono uppercase tracking-widest text-center"
                  style={{ fontSize: 12, color: "#3a4560" }}
                >
                  ✓
                </span>
                <span />
              </div>

              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="grid items-center rounded"
                  style={{
                    gridTemplateColumns: "1fr 52px 52px 84px 24px 20px",
                    gap: "6px",
                    padding: "4px 6px",
                    background: skill.used ? "#1a203044" : "transparent",
                    opacity: skill.used ? 0.7 : 1,
                  }}
                >
                  {/* Name + mod */}
                  <div
                    className="flex items-center min-w-0"
                    style={{ gap: "4px" }}
                  >
                    <input
                      value={skill.name}
                      onChange={(e) =>
                        setSkills((prev) =>
                          prev.map((s) =>
                            s.id === skill.id
                              ? { ...s, name: e.target.value }
                              : s,
                          ),
                        )
                      }
                      className="bg-transparent outline-none min-w-0 truncate"
                      style={{
                        fontSize: 15,
                        color: skill.used ? "#6b7a99" : "#e8e6e0",
                        width: "100%",
                      }}
                    />
                    <input
                      value={
                        skill.mod >= 0 ? `+${skill.mod}` : String(skill.mod)
                      }
                      onChange={(e) => {
                        const n = parseInt(e.target.value.replace(/^\+/, ""))
                        if (!isNaN(n))
                          setSkills((prev) =>
                            prev.map((s) =>
                              s.id === skill.id ? { ...s, mod: n } : s,
                            ),
                          )
                      }}
                      className="font-mono font-bold bg-transparent outline-none text-center shrink-0"
                      style={{
                        fontSize: 13,
                        width: 32,
                        color: skill.mod >= 0 ? "#5aaa6e" : "#e05252",
                      }}
                    />
                  </div>

                  {/* Rank — click pips to set */}
                  <div
                    className="flex items-center justify-center"
                    style={{ gap: "3px" }}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setSkills((prev) =>
                            prev.map((s) =>
                              s.id === skill.id
                                ? { ...s, rank: i + 1 === s.rank ? 0 : i + 1 }
                                : s,
                            ),
                          )
                        }
                        className="cursor-pointer transition-colors"
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: i < skill.rank ? "#c8922a" : "#252d40",
                          border: "none",
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>

                  {/* Attribute */}
                  <div className="flex justify-center">
                    <select
                      value={skill.attribute}
                      onChange={(e) =>
                        setSkills((prev) =>
                          prev.map((s) =>
                            s.id === skill.id
                              ? { ...s, attribute: e.target.value as Attribute }
                              : s,
                          ),
                        )
                      }
                      className="font-mono font-bold rounded cursor-pointer outline-none text-center"
                      style={{
                        fontSize: 12,
                        padding: "2px 4px",
                        color: ATTR_COLORS[skill.attribute],
                        background: `${ATTR_COLORS[skill.attribute]}18`,
                        border: `1px solid ${ATTR_COLORS[skill.attribute]}33`,
                        width: "100%",
                      }}
                    >
                      {([
                        "STR",
                        "DEX",
                        "INT",
                        "WIS",
                        "CHA",
                        "CON",
                      ] as Attribute[]).map((a) => (
                        <option
                          key={a}
                          value={a}
                          style={{
                            background: "#111520",
                            color: ATTR_COLORS[a],
                          }}
                        >
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Check type */}
                  <div className="flex justify-center">
                    <select
                      value={skill.checkType}
                      onChange={(e) =>
                        setSkills((prev) =>
                          prev.map((s) =>
                            s.id === skill.id
                              ? { ...s, checkType: e.target.value as CheckType }
                              : s,
                          ),
                        )
                      }
                      className="font-mono rounded uppercase cursor-pointer outline-none text-center"
                      style={{
                        fontSize: 11,
                        padding: "2px 4px",
                        color: CHECK_COLORS[skill.checkType],
                        background: `${CHECK_COLORS[skill.checkType]}15`,
                        border: `1px solid ${CHECK_COLORS[skill.checkType]}33`,
                        width: "100%",
                      }}
                    >
                      {([
                        "Opposed",
                        "Unopposed",
                        "None",
                      ] as CheckType[]).map((c) => (
                        <option
                          key={c}
                          value={c}
                          style={{
                            background: "#111520",
                            color: CHECK_COLORS[c],
                          }}
                        >
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Used checkbox */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleSkillUsed(skill.id)}
                      className="rounded-sm flex items-center justify-center cursor-pointer transition-all"
                      style={{
                        width: 21,
                        height: 21,
                        background: skill.used ? "#c8922a22" : "transparent",
                        border: skill.used
                          ? "1.5px solid #c8922a"
                          : "1.5px solid #3a4560",
                      }}
                    >
                      {skill.used && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 8 8"
                          fill="none"
                        >
                          <path
                            d="M1.5 4L3 5.5L6.5 2"
                            stroke="#c8922a"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Remove */}
                  <div className="flex justify-center">
                    <button
                      onClick={() =>
                        setSkills((prev) =>
                          prev.filter((s) => s.id !== skill.id),
                        )
                      }
                      className="flex items-center justify-center cursor-pointer rounded transition-colors"
                      style={{
                        width: 18,
                        height: 18,
                        color: "#3a4560",
                        background: "transparent",
                        border: "none",
                        fontSize: 13,
                        lineHeight: 1,
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.color =
                          "#e05252"
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.color =
                          "#3a4560"
                      }}
                      title="Remove skill"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}

              {/* Add skill + Reset */}
              <div className="flex gap-2" style={{ marginTop: 8 }}>
                <button
                  onClick={() =>
                    setSkills((prev) => [
                      ...prev,
                      {
                        id: Date.now(),
                        name: "New Skill",
                        rank: 1,
                        attribute: "INT",
                        mod: 0,
                        checkType: "Active",
                        used: false,
                      },
                    ])
                  }
                  className="flex-1 font-mono uppercase tracking-widest rounded cursor-pointer transition-colors"
                  style={{
                    fontSize: 12,
                    padding: "5px 0",
                    color: "#c8922a",
                    border: "1px solid #c8922a44",
                    background: "#c8922a0e",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background =
                      "#c8922a1a"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background =
                      "#c8922a0e"
                  }}
                >
                  + Add Skill
                </button>
                {skills.some((s) => s.used) && (
                  <button
                    onClick={() =>
                      setSkills((prev) =>
                        prev.map((s) => ({ ...s, used: false })),
                      )
                    }
                    className="font-mono uppercase tracking-widest rounded cursor-pointer transition-colors"
                    style={{
                      fontSize: 12,
                      padding: "5px 10px",
                      color: "#6b7a99",
                      border: "1px solid #252d40",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.color = "#e8e6e0"
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.color = "#6b7a99"
                    }}
                  >
                    Reset used
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Minimap placeholder — top right */}
      <div
        className="absolute top-6 right-6 w-36 h-36 rounded flex items-center justify-center"
        style={{ background: "#0e1219", border: "1.5px solid #1e2535" }}
      >
        <div className="relative w-full h-full overflow-hidden rounded">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 40% 55%, #1a2030 0%, #0e1219 70%)",
            }}
          />
          <div
            className="absolute inset-3 rounded"
            style={{ border: "1px solid #252d40", opacity: 0.4 }}
          />
          {/* Map dots */}
          <div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: "#c8922a",
              top: "55%",
              left: "40%",
              boxShadow: "0 0 6px #c8922a",
            }}
          />
          <div
            className="absolute w-1 h-1 rounded-full"
            style={{ background: "#e05252", top: "30%", left: "65%" }}
          />
          <div
            className="absolute w-1 h-1 rounded-full"
            style={{ background: "#e05252", top: "70%", left: "70%" }}
          />
          <div
            className="absolute w-1 h-1 rounded-full"
            style={{ background: "#5aaa6e", top: "40%", left: "25%" }}
          />
          <p
            className="absolute bottom-1.5 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-widest"
            style={{ color: "#3a4560" }}
          >
            Dungeon B2
          </p>
        </div>
      </div>

      {/* Inventory panel */}
      {inventoryOpen && (
        <div
          className="inventory-panel absolute bottom-28 left-1/2 -translate-x-1/2 rounded-lg overflow-hidden"
          style={{
            background: "#111520",
            border: "1.5px solid #1e2535",
            boxShadow: "0 16px 64px #000000cc",
            width: 520,
            maxHeight: 460,
          }}
        >
          {/* Panel header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid #1e2535" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🎒</span>
              <span className="font-semibold text-sm">Inventory</span>
              <span
                className="font-mono text-[11px] px-1.5 py-0.5 rounded"
                style={{ background: "#1a2030", color: "#6b7a99" }}
              >
                {totalItems}/30
              </span>
            </div>
            <button
              onClick={() => setInventoryOpen(false)}
              className="w-6 h-6 rounded flex items-center justify-center text-xs transition-colors cursor-pointer"
              style={{ background: "#1a2030", color: "#6b7a99" }}
            >
              ✕
            </button>
          </div>

          {/* Controls */}
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ borderBottom: "1px solid #1e2535" }}
          >
            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items..."
              className="flex-1 px-2.5 py-1.5 rounded text-xs outline-none font-mono"
              style={{
                background: "#0e1219",
                border: "1px solid #252d40",
                color: "#e8e6e0",
                caretColor: "#c8922a",
              }}
            />

            {/* Filter by rarity */}
            <div className="flex gap-1">
              {([
                "all",
                "legendary",
                "rare",
                "uncommon",
                "common",
              ] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setFilterRarity(r)}
                  className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-1 rounded cursor-pointer transition-all"
                  style={{
                    background:
                      filterRarity === r
                        ? r === "all"
                          ? "#1e2535"
                          : `${RARITY_COLORS[(r as Rarity)]}22`
                        : "transparent",
                    color:
                      filterRarity === r
                        ? r === "all"
                          ? "#e8e6e0"
                          : RARITY_COLORS[(r as Rarity)]
                        : "#3a4560",
                    border:
                      filterRarity === r
                        ? `1px solid ${
                            r === "all"
                              ? "#252d40"
                              : RARITY_COLORS[(r as Rarity)] + "66"
                          }`
                        : "1px solid transparent",
                  }}
                >
                  {r === "all" ? "All" : r.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="font-mono text-[10px] px-2 py-1.5 rounded cursor-pointer outline-none"
              style={{
                background: "#0e1219",
                border: "1px solid #252d40",
                color: "#6b7a99",
              }}
            >
              <option value="rarity">By Rarity</option>
              <option value="name">By Name</option>
              <option value="qty">By Qty</option>
            </select>
          </div>

          {/* Grid */}
          <div className="p-3 overflow-y-auto" style={{ maxHeight: 320 }}>
            {sortedInventoryItems.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <p className="font-mono text-sm" style={{ color: "#3a4560" }}>
                  No items found
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-8 gap-1.5">
                {sortedInventoryItems.map(({ item, i }) => (
                  <InventorySlot
                    key={i}
                    item={item}
                    onDragStart={() =>
                      setDragging({ source: "inventory", index: i })
                    }
                    onDrop={() => handleDrop("inventory", i)}
                    onRightClick={setContextItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Legend */}
          <div
            className="flex items-center gap-4 px-4 py-2"
            style={{ borderTop: "1px solid #1e2535" }}
          >
            {(["legendary", "rare", "uncommon", "common"] as Rarity[]).map(
              (r) => (
                <div key={r} className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: RARITY_COLORS[r] }}
                  />
                  <span
                    className="font-mono text-[9px] capitalize"
                    style={{ color: "#3a4560" }}
                  >
                    {r}
                  </span>
                </div>
              ),
            )}
            <span
              className="font-mono text-[9px] ml-auto"
              style={{ color: "#3a4560" }}
            >
              Drag to hotbar • Right-click for options
            </span>
          </div>
        </div>
      )}

      {/* Context menu */}
      {contextItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "#00000066" }}
          onClick={() => setContextItem(null)}
        >
          <div
            className="rounded-lg overflow-hidden"
            style={{
              background: "#111520",
              border: "1.5px solid #252d40",
              boxShadow: "0 16px 48px #000000cc",
              minWidth: 180,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-4 py-3"
              style={{ borderBottom: "1px solid #1e2535" }}
            >
              <div className="flex items-center gap-2">
                <span>{contextItem.emoji}</span>
                <span
                  className="font-semibold text-sm"
                  style={{ color: RARITY_COLORS[contextItem.rarity] }}
                >
                  {contextItem.name}
                </span>
              </div>
            </div>
            {[
              { label: "Equip", icon: "⚡" },
              { label: "Use", icon: "✨" },
              { label: "Drop", icon: "🗑️" },
              { label: "Inspect", icon: "🔍" },
            ].map(({ label, icon }) => (
              <button
                key={label}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors cursor-pointer"
                style={{ color: "#e8e6e0" }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = "#1a2030"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background =
                    "transparent"
                }}
                onClick={() => setContextItem(null)}
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hotbar */}
      <div className="relative z-10 flex flex-col items-center gap-2 pb-6">
        <div
          className="flex items-end gap-1.5 px-4 py-3 rounded-xl"
          style={{
            background: "#111520cc",
            border: "1.5px solid #1e2535",
            backdropFilter: "blur(12px)",
            boxShadow: "0 -4px 32px #00000088",
          }}
        >
          {hotbar.map((item, i) => (
            <HotbarSlot
              key={i}
              item={item}
              index={i}
              isSelected={selectedSlot === i}
              onClick={() => setSelectedSlot(i)}
              onDragStart={() => setDragging({ source: "hotbar", index: i })}
              onDrop={() => handleDrop("hotbar", i)}
            />
          ))}

          {/* Divider */}
          <div
            className="w-px h-10 mx-1 self-center"
            style={{ background: "#1e2535" }}
          />

          {/* Inventory toggle button */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => setInventoryOpen(!inventoryOpen)}
              className="w-14 h-14 flex flex-col items-center justify-center gap-1 rounded cursor-pointer transition-all duration-150"
              style={{
                background: inventoryOpen ? "#1a2030" : "#0e1219",
                border: inventoryOpen
                  ? "1.5px solid #c8922a"
                  : "1.5px solid #252d40",
              }}
            >
              <span className="text-xl">🎒</span>
              <div
                className="font-mono text-[9px] uppercase tracking-widest px-1 py-0.5 rounded"
                style={{
                  background: "#0e1219",
                  color: inventoryOpen ? "#c8922a" : "#3a4560",
                  border: "1px solid #252d40",
                }}
              >
                {totalItems}
              </div>
            </button>
            <span
              className="font-mono text-[10px]"
              style={{ color: "#3a4560" }}
            >
              I
            </span>
          </div>
        </div>

        {/* Selected item label */}
        {hotbar[selectedSlot] && (
          <div
            className="font-mono text-xs px-3 py-1 rounded"
            style={{
              background: "#111520aa",
              color: RARITY_COLORS[hotbar[selectedSlot]!.rarity],
              border: "1px solid #1e2535",
            }}
          >
            {hotbar[selectedSlot]!.name}
          </div>
        )}
      </div>
    </div>
  )
}
