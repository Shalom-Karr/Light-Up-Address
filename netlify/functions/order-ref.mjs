import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  try {
    const store = getStore({ name: "order-refs", consistency: "strong" });
    const current = (await store.get("counter", { type: "json" })) || { count: 1000 };
    const next = current.count + 1;
    await store.setJSON("counter", { count: next });

    const suffix = Array.from({ length: 3 }, () =>
      "ABCDEFGHJKMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 31)]
    ).join("");
    const ref = `LUM-${String(next).padStart(5, "0")}-${suffix}`;

    return new Response(JSON.stringify({ ref, number: next }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "ref_generation_failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/order-ref",
};
