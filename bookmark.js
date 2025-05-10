javascript:(async () => {
  try {
    const content = document.body.innerText.slice(0, 5000);

    const response = await fetch("https://hacklet.ayaangrover.hackclub.app/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content })
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
