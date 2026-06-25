const slug = location.hash.replace("#", "");

fetch("data/data.json")
  .then(res => res.json())
  .then(items => {

    const article =
      items.find(item => item.slug === slug);

    if (!article) {

      document.title =
        "Article Not Found - EIgameLOL";

      document.getElementById("news-title")
        .innerText = "Article not found";

      return;
    }

    document.title =
      `${article.title} - EIgameLOL`;

    document.getElementById("news-title")
      .innerText = article.title || "";

    document.getElementById("news-desc")
      .innerHTML = article.desc || "";

    document.getElementById("news-content")
      .innerHTML =
        article.content?.data || "";

    const img =
      document.getElementById("news-img");

    if (article.img) {

      img.src = article.img;
      img.style.display = "block";

    } else {

      img.style.display = "none";
    }

    if (article.date) {

      const d =
        new Date(article.date);

      const months = [
        "January","February","March",
        "April","May","June",
        "July","August","September",
        "October","November","December"
      ];

      document.getElementById("news-date")
        .innerText =
          `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

  })
  .catch(error => {

    console.error(error);

    document.getElementById("news-title")
      .innerText =
        "Failed to load article";

  });