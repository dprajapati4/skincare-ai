export async function POST(req) {
  try {
    const body = await req.json();
    const prompt = [
      `Create a detailed skincare routine for someone with ${body.skinType} skin.`,
      `Concerns: ${body.concerns?.join(", ") || "none"}.`,
      `Preferences: ${body.preferences?.join(", ") || "none"}.`,
      `Budget: $${body.budget}.`,
      ``,
      `Respond ONLY with valid JSON formatted like this:`,
      "```json",
      `{
    "morning": ["Step 1...", "Step 2..."],
    "evening": ["Step 1...", "Step 2..."],
    "products": [
      {
        "name": "Product Name",
        "step": "When to use it",
        "reason": "Why it's recommended"
      }
    ],
    "tips": ["Short tip 1", "Short tip 2"]
  }`,
      "```",
    ].join("\n");

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are a helpful skincare consultant.",
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
