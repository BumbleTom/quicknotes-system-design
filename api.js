const API_URL =
  "https://jsonplaceholder.typicode.com/posts";

const loadBtn =
  document.querySelector("#load-btn");

const status =
  document.querySelector("#status");

const notesList =
  document.querySelector("#notes-list");

let notes = [];

async function request(
  url,
  options = {}
) {

  const response =
    await fetch(url, options);

  if (!response.ok) {

    throw new Error(
      `HTTP Error ${response.status}`
    );

  }

  return response;
}

function renderNotes(list) {

  notesList.textContent = "";

  if (list.length === 0) {

    const li =
      document.createElement("li");

    li.textContent =
      "No notes available.";

    notesList.appendChild(li);

    return;
  }

  list.forEach(note => {

    const li =
      document.createElement("li");

    const title =
      document.createElement("h3");

    const body =
      document.createElement("p");

    title.textContent =
      note.title;

    body.textContent =
      note.body;

    li.appendChild(title);
    li.appendChild(body);

    notesList.appendChild(li);

  });

}

async function loadNotes() {

  status.className = "";

  status.textContent =
    "Loading notes...";

  loadBtn.disabled = true;

  try {

    const response =
      await request(
        `${API_URL}?_limit=10`
      );

    notes =
      await response.json();

    renderNotes(notes);

    status.className =
      "success";

    status.textContent =
      "Loaded 10 notes from the server.";

  }

  catch {

    status.className =
      "error";

    status.textContent =
      "Unable to load notes. Please try again.";

  }

  finally {

    loadBtn.disabled = false;

  }

}

loadBtn.addEventListener(
  "click",
  loadNotes
);