async function fetchRecommendations() {
    const response = await fetch('travel_recommendation_api.json');
    return await response.json();
  }
   
  async function searchRecommendations() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const data = await fetchRecommendations();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
   
    let matches = [];

    const keyword= input.toLowerCase().trim();

   
    data.countries.forEach(country => {
      country.cities.forEach(city => {
        if (city.name.toLowerCase().includes(keyword)) {
            matches.push({imageUrl: city.imageUrl,
                name: city.name,
             description:city.description
                      });
        }
      });
    });

    data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(keyword)){
            matches.push({imageUrl: temple.imageUrl,
                name: temple.name,
             description:temple.description
                      });
        }
      });

      data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(keyword) ) {
            matches.push({imageUrl: beach.imageUrl,
                name: beach.name,
             description:beach.description
                      });
        }
      });
   
    if (matches.length > 0) {
      matches.forEach(items => {
        const card = `
          <div class="card">
            <img src="${items.imageUrl}">
            <h3 class="item_name">${items.name}</h3>
            <p class="item_description">${items.description}</p>
          </div>`;
        resultsDiv.innerHTML += card;
      });
    } else {
      resultsDiv.innerHTML = "<p>No results found.</p>";
    }
  }
   
  function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
  }