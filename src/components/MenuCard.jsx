export default function MenuCard({ item }) {
  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.price} kr</p>
      <button>Add</button>
    </div>
  );
}
