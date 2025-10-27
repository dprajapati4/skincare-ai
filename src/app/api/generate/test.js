export async function POST(req) {
  try {
    const body = await req.json();
    const prompt = [
      `You are a skincare consultant. Based on the following information, generate a detailed skincare routine in strict JSON format.`,
      ``,
      `Skin Type: ${body.skinType}`,
      `Concerns: ${body.concerns?.join(", ") || "none"}`,
      `Preferences: ${body.preferences?.join(", ") || "none"}`,
      `Total Budget for the entire routine: $${body.budget}`,
      ``,
      `Requirements:`,
      `- Include a "morning" and "evening" routine as arrays of steps.`,
      `- Include a "products" array with details for each recommended product.`,
      `- Each product must include: "name", "step" (when to use it), "reason", and "price" (in USD).`,
      `- Ensure the sum of all product prices stays under the total budget. Don't include samples. If nothing in budget is found return nothing.`,
      `- Include a short "tips" array with general skincare tips.`,
      ``,
      `Respond ONLY with raw, valid JSON. Do NOT include any explanation, markdown, or code block formatting.`,
      ``,
      `Example format:`,
      `{
    "morning": ["Step 1...", "Step 2..."],
    "evening": ["Step 1...", "Step 2..."],
    "products": [
      {
        "name": "Product Name",
        "step": "When to use it",
        "reason": "Why it's recommended",
        "price": 9.99
      }
    ],
    "tips": ["Short tip 1", "Short tip 2"]
  }`,
    ].join("\n");

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful skincare consultant. Respond ONLY with valid JSON. Do not include any explanation, markdown, or code block formatting.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    console.log("the data", data);

    if (!res.ok) {
      throw new Error(`Groq API Error (${res.status}): ${data.error?.message}`);
    }

    // Try to parse the response content as JSON
    let routine;
    try {
      let rawContent = data.choices?.[0]?.message?.content ?? "{}";

      // Remove code block markers if they exist
      rawContent = rawContent.replace(/```json|```/g, "").trim();
      console.log("Model raw content:", data.choices?.[0]?.message?.content);

      if (!rawContent || rawContent.trim() === "") {
        return new Response(
          JSON.stringify({ error: "No routine generated." }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      routine = JSON.parse(rawContent);
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      routine = { error: "Invalid JSON format from model." };
    }

    return Response.json({ routine });
  } catch (err) {
    console.error("Groq Error:", err);
    return new Response("Error generating routine", { status: 500 });
  }
}
