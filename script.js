const AIRTABLE_API_KEY = "patjChPlJ6HvP952h.6da6f908cf1081adb1518c55ba02bc1b902690dcdeca2153c5294d9fc9a52b2a"; // Ваш токен
const BASE_ID = "appAyEpzQw75tRFbb"; // Замените на ID вашей базы
const TABLE_NAME = "PspList"; // Замените на имя вашей таблицы

let data = [];

fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
  headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
})
  .then(response => {
    if (!response.ok) throw new Error('Ошибка сети: ' + response.status);
    return response.json();
  })
  .then(result => {
    data = result.records.map(record => record.fields);
    loadTable();
  })
  .catch(error => {
    console.error('Ошибка загрузки данных:', error);
    document.getElementById("tableBody").innerHTML = "<tr><td colspan='5'>Ошибка загрузки данных. Проверьте токен и Base ID.</td></tr>";
  });

function loadTable(filteredData = data) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  filteredData.forEach(row => {
    tbody.innerHTML += `<tr>
      <td>${row['ID'] || 'N/A'}</td>
      <td>${row['Услуга'] || 'N/A'}</td>
      <td>${row['Комиссия (%)'] || 'N/A'}</td>
      <td>${row['Min transaction ($)'] || 'N/A'}</td>
      <td>${row['Гео'] || 'N/A'}</td>
    </tr>`;
  });
}

function sortTable(col) {
  data.sort((a, b) => (a[Object.keys(a)[col]] || '').localeCompare(b[Object.keys(b)[col]] || ''));
  loadTable();
}

function filterTable() {
  const geo = document.getElementById("geoFilter").value.toLowerCase();
  const filtered = data.filter(row => (row['Гео'] || '').toLowerCase().includes(geo));
  loadTable(filtered);
}
