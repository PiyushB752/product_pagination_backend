import { useEffect, useState } from "react";

const API = "http://localhost:5000/products";

const categories = [
  "",
  "Electronics",
  "Clothing",
  "Books",
  "Home",
  "Sports",
  "Beauty",
  "Toys",
  "Automotive",
];

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (reset = false, cursor = null) => {
    setLoading(true);

    const params = new URLSearchParams();
    params.append("limit", "20");

    if (category) {
      params.append("category", category);
    }

    // ✅ Use cursorCreatedAt instead of cursorUpdatedAt
    if (!reset && cursor) {
      params.append(
        "cursorCreatedAt",
        cursor.cursorCreatedAt
      );
      params.append("cursorId", cursor.cursorId);
    }

    const res = await fetch(`${API}?${params.toString()}`);
    const data = await res.json();

    if (reset) {
      setProducts(data.products);
    } else {
      setProducts((prev) => [...prev, ...data.products]);
    }

    setNextCursor(data.nextCursor);
    setLoading(false);
  };

  // Load first page or reload on category change
  useEffect(() => {
    setProducts([]);
    setNextCursor(null);
    fetchProducts(true, null);
  }, [category]);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Products</h1>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c || "All Categories"}
          </option>
        ))}
      </select>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₹ {p.price}</td>
              <td>{new Date(p.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {nextCursor && (
        <button
          onClick={() => fetchProducts(false, nextCursor)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default App;