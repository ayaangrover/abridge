javascript:(async () => {
  try {
    const content = document.body.innerText.slice(0, 5000);
    const detail = prompt("Summary detail? (short, medium, long)", "medium");

    const instructions = {
      short: "Summarize this in 3 very short bullet points:",
      medium: "Summarize this in 5 clear bullet points:",
      long: "Summarize this in 8 detailed bullet points:"
    };

    const finalContent = `${instructions[detail] || instructions.medium}\n\n${content}`;

    const response = await fetch("https://hacklet.ayaangrover.hackclub.app/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: finalContent })
    });

    const data = await response.json();

    if (data.summary) {
      alert(data.summary);
    } else {
      alert("No summary returned.");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
})();
